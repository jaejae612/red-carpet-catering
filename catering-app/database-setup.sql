-- =====================================================
-- RED CARPET CATERING - SUPABASE DATABASE SETUP
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard > Your Project > SQL Editor
-- =====================================================

-- 1. PROFILES TABLE (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. STAFF TABLE
CREATE TABLE IF NOT EXISTS public.staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('head_waiter', 'service', 'extra', 'student')),
  note TEXT,
  available BOOLEAN DEFAULT true,
  type TEXT DEFAULT 'regular',
  daily_rate DECIMAL(10,2),
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EQUIPMENT TABLE
CREATE TABLE IF NOT EXISTS public.equipment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  type TEXT DEFAULT 'owned',
  supplier TEXT,
  rental_cost DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Booking Type
  booking_type TEXT,
  order_type TEXT,

  -- Customer Info
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,

  -- Event Details
  venue TEXT NOT NULL,
  venue_address TEXT,
  gas_charge DECIMAL(10,2) DEFAULT 0,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,

  -- Menu Selection
  menu_package TEXT NOT NULL,
  menu_option TEXT,
  menu_items JSONB,
  number_of_pax INTEGER NOT NULL DEFAULT 60,
  add_ons JSONB DEFAULT '[]',
  custom_dishes JSONB,
  swapped_dishes JSONB,

  -- Occasion & Theme
  occasion TEXT,
  occasion_other TEXT,
  birthday_celebrant TEXT,
  birthday_age TEXT,
  motif TEXT,
  motif_type TEXT,
  motif_preset TEXT,
  motif_colors JSONB,

  -- Drinks
  free_drink TEXT,
  drink_add_ons JSONB,

  -- Other
  special_requests TEXT,

  -- Financials
  price_per_head DECIMAL(10,2),
  total_amount DECIMAL(10,2) NOT NULL,
  amount_paid DECIMAL(10,2) DEFAULT 0,

  -- Payment
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'deposit_paid', 'fully_paid', 'refund_pending', 'refunded')),
  deposit_amount DECIMAL(10,2),
  deposit_paid_at TIMESTAMPTZ,
  balance_paid_at TIMESTAMPTZ,
  payment_notes TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),

  -- Admin Assignments
  assigned_staff JSONB DEFAULT '[]',
  assigned_equipment JSONB DEFAULT '{}',
  admin_notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FOOD ITEMS TABLE (a la carte menu)
CREATE TABLE IF NOT EXISTS public.food_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  price_home DECIMAL(10,2),
  price_tray DECIMAL(10,2),
  price_xs DECIMAL(10,2),
  price_small DECIMAL(10,2),
  price_medium DECIMAL(10,2),
  price_large DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. FOOD ORDERS TABLE (a la carte & packed meal delivery)
CREATE TABLE IF NOT EXISTS public.food_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Order Type
  order_type TEXT,

  -- Customer Info
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,

  -- Delivery Details
  delivery_type TEXT,
  delivery_address TEXT,
  delivery_city TEXT,
  delivery_barangay TEXT,
  delivery_street TEXT,
  delivery_landmark TEXT,
  delivery_date DATE,
  delivery_time TIME,

  -- Order Items
  items JSONB NOT NULL,

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

-- 7. PAYMENTS TABLE (transaction log)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  food_order_id UUID REFERENCES public.food_orders(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  method TEXT NOT NULL,
  reference_number TEXT,
  payment_date DATE NOT NULL,
  notes TEXT,
  recorded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DISHES TABLE (for custom menu building)
CREATE TABLE IF NOT EXISTS public.dishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow insert during signup" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- STAFF POLICIES
CREATE POLICY "Anyone can view staff" ON public.staff
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only admins can manage staff" ON public.staff
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- EQUIPMENT POLICIES
CREATE POLICY "Anyone can view equipment" ON public.equipment
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only admins can manage equipment" ON public.equipment
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- BOOKINGS POLICIES
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all bookings" ON public.bookings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update bookings" ON public.bookings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete bookings" ON public.bookings
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can create bookings for customers
CREATE POLICY "Admins can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- FOOD ITEMS POLICIES
CREATE POLICY "Anyone can view food items" ON public.food_items
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage food items" ON public.food_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- FOOD ORDERS POLICIES
CREATE POLICY "Users can view own food orders" ON public.food_orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create food orders" ON public.food_orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all food orders" ON public.food_orders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update food orders" ON public.food_orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete food orders" ON public.food_orders
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- PAYMENTS POLICIES
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (
    booking_id IN (SELECT id FROM public.bookings WHERE user_id = auth.uid())
    OR food_order_id IN (SELECT id FROM public.food_orders WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage payments" ON public.payments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users can insert payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- DISHES POLICIES
CREATE POLICY "Anyone can view dishes" ON public.dishes
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage dishes" ON public.dishes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

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

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_food_orders_updated_at
  BEFORE UPDATE ON public.food_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


-- =====================================================
-- SEED DATA (Default Staff & Equipment)
-- =====================================================

-- Head Waiters & Assistants
INSERT INTO public.staff (name, role, note) VALUES
  ('JR Ramirez', 'head_waiter', NULL),
  ('Oliver Fernandez', 'head_waiter', NULL),
  ('Jojo Bracero', 'head_waiter', 'Assistant'),
  ('Kevin Elustrisimo', 'head_waiter', 'Assistant'),
  ('Justine Baynosa', 'head_waiter', NULL),
  ('MC Quary Kyle Liong', 'head_waiter', NULL),
  ('Wilson Castaneda', 'head_waiter', NULL),
  ('Alex Pioquento', 'head_waiter', NULL),
  ('Jay Arganza', 'head_waiter', NULL),
  ('Tata Liong', 'head_waiter', NULL),
  ('Jordan Carulasan', 'head_waiter', NULL),
  ('Reynaldo Montalban', 'head_waiter', NULL),
  ('Pepe Sanchez', 'head_waiter', 'Assistant'),
  ('Ralfie', 'head_waiter', NULL),
  ('Romel Generalao', 'head_waiter', NULL),
  ('Nathaniel Tan', 'head_waiter', NULL)
ON CONFLICT DO NOTHING;

-- Service Staff
INSERT INTO public.staff (name, role, note, available) VALUES
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
  ('Sheila Mae Fuentes', 'service', NULL, true),
  ('Agot Gabriel', 'service', 'Marketing', true),
  ('Grethel Laude', 'service', 'Pregnant', false),
  ('Sofia Layug', 'service', NULL, true),
  ('Maita Nillama', 'service', NULL, true),
  ('Sally Catam-isan', 'service', NULL, true)
ON CONFLICT DO NOTHING;

-- Extra Staff
INSERT INTO public.staff (name, role, note) VALUES
  ('Richie', 'extra', 'Extra'),
  ('Jasmine', 'extra', 'Extra'),
  ('Jellian', 'extra', 'Extra'),
  ('Jeda', 'extra', 'Extra'),
  ('Janna', 'extra', 'Extra'),
  ('Shalom', 'extra', 'Extra'),
  ('Nylgen', 'extra', 'Extra')
ON CONFLICT DO NOTHING;

-- Students
INSERT INTO public.staff (name, role, note) VALUES
  ('Elgie', 'student', 'Student'),
  ('Jandel', 'student', 'Student'),
  ('Jemmalyn', 'student', 'Student'),
  ('Che-lo', 'student', 'Student'),
  ('Ellen', 'student', 'Student')
ON CONFLICT DO NOTHING;

-- Equipment
INSERT INTO public.equipment (name, category, quantity) VALUES
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
  ('Table Skirting', 'Linens', 10)
ON CONFLICT DO NOTHING;


-- =====================================================
-- CREATE FIRST ADMIN (Run after your first signup)
-- =====================================================
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';
