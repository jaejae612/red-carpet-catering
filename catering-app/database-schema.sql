-- =============================================
-- RED CARPET CATERING - SUPABASE DATABASE SCHEMA
-- =============================================
-- Run this SQL in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- 1. PROFILES TABLE (extends Supabase auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    'customer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 2. BOOKINGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Booking Type
  booking_type TEXT,                     -- 'cocktail', 'packed_meal', etc. (NULL = buffet)
  order_type TEXT,                       -- 'packed_meal', 'packed_snack'

  -- Customer Info
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,

  -- Event Details
  venue TEXT NOT NULL,
  venue_address TEXT,                    -- Structured address string
  gas_charge DECIMAL(10,2) DEFAULT 0,   -- Transport/gas charge for distant areas
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,

  -- Menu Selection
  menu_package TEXT NOT NULL,
  menu_option TEXT,
  menu_items JSONB,                      -- Cocktail menu item list
  number_of_pax INTEGER NOT NULL DEFAULT 60,
  add_ons JSONB DEFAULT '[]',
  custom_dishes JSONB,                   -- User-selected dishes for custom menus (470, 510)
  swapped_dishes JSONB,                  -- Menu 560 Asian Fusion swap selections

  -- Occasion & Theme
  occasion TEXT,                         -- birthday, wedding, debut, corporate, etc.
  occasion_other TEXT,                   -- Custom occasion text
  birthday_celebrant TEXT,               -- 'boy' or 'girl'
  birthday_age TEXT,                     -- Celebrant age
  motif TEXT,                            -- Display string for motif
  motif_type TEXT,                       -- 'preset' or 'custom'
  motif_preset TEXT,                     -- Preset motif ID
  motif_colors JSONB,                    -- Custom color array

  -- Drinks
  free_drink TEXT,                       -- Selected free drink option
  drink_add_ons JSONB,                   -- Additional drink orders

  -- Other
  special_requests TEXT,

  -- Financials
  price_per_head DECIMAL(10,2),          -- Per-head price (cocktail)
  total_amount DECIMAL(10,2) NOT NULL,
  amount_paid DECIMAL(10,2) DEFAULT 0,   -- Running total of payments

  -- Payment
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'deposit_paid', 'fully_paid', 'refund_pending', 'refunded')),
  deposit_amount DECIMAL(10,2),
  deposit_paid_at TIMESTAMPTZ,
  balance_paid_at TIMESTAMPTZ,
  payment_notes TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),

  -- Admin Assignments (only admin can modify)
  assigned_staff JSONB DEFAULT '[]',
  assigned_equipment JSONB DEFAULT '{}',
  admin_notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Customers can view their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

-- Customers can create bookings
CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view all bookings
CREATE POLICY "Admins can view all bookings" ON bookings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can update all bookings (for assignments)
CREATE POLICY "Admins can update all bookings" ON bookings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can delete bookings
CREATE POLICY "Admins can delete bookings" ON bookings
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- 3. STAFF TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('head_waiter', 'service', 'extra', 'student')),
  note TEXT,
  available BOOLEAN DEFAULT true,
  type TEXT DEFAULT 'regular',           -- 'regular' or 'on_call'
  daily_rate DECIMAL(10,2),              -- Pay rate for on-call staff
  phone TEXT,                            -- Contact number
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

-- Everyone can view staff (for booking display)
CREATE POLICY "Anyone can view staff" ON staff
  FOR SELECT USING (true);

-- Only admins can manage staff
CREATE POLICY "Admins can insert staff" ON staff
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update staff" ON staff
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete staff" ON staff
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- 4. EQUIPMENT TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS equipment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  type TEXT DEFAULT 'owned',             -- 'owned' or 'rental'
  supplier TEXT,                         -- Rental supplier name
  rental_cost DECIMAL(10,2),             -- Cost per unit if rental
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;

-- Everyone can view equipment
CREATE POLICY "Anyone can view equipment" ON equipment
  FOR SELECT USING (true);

-- Only admins can manage equipment
CREATE POLICY "Admins can insert equipment" ON equipment
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update equipment" ON equipment
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete equipment" ON equipment
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- 5. FOOD ITEMS TABLE (a la carte menu)
-- =============================================
CREATE TABLE IF NOT EXISTS food_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,                -- salad, chicken, pork, beef, seafood, etc.
  available BOOLEAN DEFAULT true,
  price_home DECIMAL(10,2),              -- Home meal (4-5 pax)
  price_tray DECIMAL(10,2),              -- Tray (8-10 pax)
  price_xs DECIMAL(10,2),                -- Extra Small (20 pax)
  price_small DECIMAL(10,2),             -- Small (30 pax)
  price_medium DECIMAL(10,2),            -- Medium (50 pax)
  price_large DECIMAL(10,2),             -- Large (80 pax)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE food_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view food items" ON food_items
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage food items" ON food_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- 6. FOOD ORDERS TABLE (a la carte & packed meal delivery)
-- =============================================
CREATE TABLE IF NOT EXISTS food_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Order Type
  order_type TEXT,                       -- 'packed_meal', 'packed_snack', NULL = a la carte

  -- Customer Info
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,

  -- Delivery Details
  delivery_type TEXT,                    -- 'delivery' or 'pickup'
  delivery_address TEXT,
  delivery_city TEXT,
  delivery_barangay TEXT,
  delivery_street TEXT,
  delivery_landmark TEXT,
  delivery_date DATE,
  delivery_time TIME,

  -- Order Items
  items JSONB NOT NULL,                  -- Array of ordered items with sizes/quantities

  -- Financials
  subtotal DECIMAL(10,2),
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,

  -- Status & Payment
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'deposit_paid', 'fully_paid', 'refund_pending', 'refunded')),

  -- Other
  special_instructions TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE food_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own food orders" ON food_orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create food orders" ON food_orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all food orders" ON food_orders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update food orders" ON food_orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete food orders" ON food_orders
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- 7. PAYMENTS TABLE (transaction log)
-- =============================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  food_order_id UUID REFERENCES food_orders(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  method TEXT NOT NULL,                  -- 'gcash', 'maya', 'bank_transfer', 'cash', 'card', 'check'
  reference_number TEXT,                 -- Transaction reference
  payment_date DATE NOT NULL,
  notes TEXT,
  recorded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (
    booking_id IN (SELECT id FROM bookings WHERE user_id = auth.uid())
    OR food_order_id IN (SELECT id FROM food_orders WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage payments" ON payments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users can insert payments" ON payments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);


-- 8. DISHES TABLE (for custom menu building)
-- =============================================
CREATE TABLE IF NOT EXISTS dishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,                -- salad, main, side, rice, dessert, soup
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view dishes" ON dishes
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage dishes" ON dishes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_food_orders_updated_at
  BEFORE UPDATE ON food_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =============================================
-- 9. SEED DATA (Optional - Default Staff and Equipment)
-- =============================================

-- Head Waiters & Assistants
INSERT INTO staff (name, role, note) VALUES
  ('JR Ramirez', 'head_waiter', NULL),
  ('Oliver Fernandez', 'head_waiter', NULL),
  ('Jojo Bracero', 'head_waiter', 'Assistant'),
  ('Kevin Elustrisimo', 'head_waiter', 'Assistant'),
  ('Justine Baynosa', 'head_waiter', NULL),
  ('MC Quary Kyle Liong', 'head_waiter', NULL),
  ('Wilson Castañeda', 'head_waiter', NULL),
  ('Alex Pioquento', 'head_waiter', NULL),
  ('Jay Arganza', 'head_waiter', NULL),
  ('Tata Liong', 'head_waiter', NULL),
  ('Jordan Carulasan', 'head_waiter', NULL),
  ('Reynaldo Montalban', 'head_waiter', NULL),
  ('Pepe Sanchez', 'head_waiter', 'Assistant'),
  ('Rhonvic + JV', 'head_waiter', 'Assistant'),
  ('Ralfie', 'head_waiter', NULL),
  ('Romel Generalao', 'head_waiter', NULL),
  ('Nathaniel Tan', 'head_waiter', NULL);

-- Service Staff
INSERT INTO staff (name, role, note, available) VALUES
  ('Farhanah Gamal', 'service', NULL, true),
  ('Mariza Abellana', 'service', NULL, true),
  ('Christianie Apostol', 'service', NULL, true),
  ('Jessa Apostol', 'service', NULL, true),
  ('Analie Autor', 'service', NULL, true),
  ('Ester Paoy', 'service', NULL, true),
  ('Charlie Bicbic', 'service', NULL, true),
  ('Juveline Sagolili', 'service', NULL, true),
  ('Megan Bacus', 'service', NULL, true),
  ('Rowena Baluyot', 'service', NULL, true),
  ('Jemma Bibar', 'service', NULL, true),
  ('Fe Plotonia', 'service', NULL, true),
  ('Che2x Sanchez', 'service', NULL, true),
  ('Sheila Mae Fuentes', 'service', NULL, true),
  ('Agot Gabriel', 'service', 'Marketing', true),
  ('Marife Jas-eras', 'service', NULL, true),
  ('Grethel Laude', 'service', 'Pregnant', false),
  ('Sofia Layug', 'service', NULL, true),
  ('Maita Nillama', 'service', NULL, true),
  ('Ma. Christine Rizon', 'service', NULL, true),
  ('Sally Catam-isan', 'service', NULL, true);

-- Extra Staff
INSERT INTO staff (name, role, note) VALUES
  ('Richie', 'extra', 'Extra'),
  ('Jasmine', 'extra', 'Extra'),
  ('Jellian', 'extra', 'Extra'),
  ('Jeda', 'extra', 'Extra'),
  ('Janna', 'extra', 'Extra'),
  ('Shalom', 'extra', 'Extra'),
  ('Nylgen', 'extra', 'Extra');

-- Students
INSERT INTO staff (name, role, note) VALUES
  ('Elgie', 'student', 'Student'),
  ('Jandel', 'student', 'Student'),
  ('Jemmalyn', 'student', 'Student'),
  ('Che-lo', 'student', 'Student'),
  ('Ellen', 'student', 'Student');

-- Equipment
INSERT INTO equipment (name, category, quantity) VALUES
  -- Tables & Seating
  ('Round Table', 'Seating', 30),
  ('Guest Chair', 'Seating', 300),
  ('Chair Cover', 'Linens', 300),
  ('Buffet Table', 'Buffet', 10),
  ('Cocktail Table', 'Others', 12),
  ('Kiddie Table', 'Others', 10),
  ('Kiddie Chair', 'Others', 50),
  -- Utensils (per-guest items)
  ('Dinner Plate', 'Utensils', 200),
  ('Dessert Plate', 'Utensils', 200),
  ('Soup Bowl', 'Utensils', 180),
  ('Spoon & Fork', 'Utensils', 200),
  ('Water Glass', 'Utensils', 200),
  ('Teaspoon', 'Utensils', 100),
  ('Goblet', 'Utensils', 120),
  -- Serving
  ('Serving Spoon', 'Serving', 20),
  ('Pitcher', 'Serving', 10),
  ('Ice Bucket', 'Serving', 12),
  ('Ice Tong', 'Serving', 15),
  ('Serving Tray', 'Serving', 10),
  ('Lechon Tray', 'Serving', 4),
  ('Chafing Dish', 'Buffet', 24),
  ('Serving Tong', 'Serving', 24),
  -- Linens
  ('Table Cloth', 'Linens', 40),
  ('Table Napkin', 'Linens', 200),
  ('Table Skirting', 'Linens', 10);


-- =============================================
-- DONE! Your database is ready.
-- =============================================
-- Next steps:
-- 1. Create a user account through the app
-- 2. Go to Table Editor > profiles
-- 3. Change your role from 'customer' to 'admin'
-- =============================================
