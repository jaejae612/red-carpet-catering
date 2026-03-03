-- =====================================================
-- RED CARPET CATERING - DATABASE MIGRATION
-- =====================================================
-- Run this FIRST in Supabase SQL Editor if your database
-- was set up with the old database-setup.sql.
-- This adds all missing columns and tables.
-- Safe to run multiple times (uses IF NOT EXISTS / ADD COLUMN IF NOT EXISTS).
-- =====================================================


-- =====================================================
-- 1. ADD MISSING COLUMNS TO BOOKINGS
-- =====================================================
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_type TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS order_type TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS venue_address TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS gas_charge DECIMAL(10,2) DEFAULT 0;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS menu_items JSONB;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS custom_dishes JSONB;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS swapped_dishes JSONB;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS occasion TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS occasion_other TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS birthday_celebrant TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS birthday_age TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS motif_type TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS motif_preset TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS motif_colors JSONB;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS free_drink TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS drink_add_ons JSONB;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS price_per_head DECIMAL(10,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(10,2) DEFAULT 0;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS deposit_amount DECIMAL(10,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS deposit_paid_at TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS balance_paid_at TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_notes TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS customer_email TEXT;

-- Add CHECK constraint for payment_status if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'bookings_payment_status_check'
  ) THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_payment_status_check
      CHECK (payment_status IN ('unpaid', 'deposit_paid', 'fully_paid', 'refund_pending', 'refunded'));
  END IF;
END $$;


-- =====================================================
-- 2. ADD MISSING COLUMNS TO STAFF
-- =====================================================
ALTER TABLE staff ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'regular';
ALTER TABLE staff ADD COLUMN IF NOT EXISTS daily_rate DECIMAL(10,2);
ALTER TABLE staff ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE staff ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();


-- =====================================================
-- 3. ADD MISSING COLUMNS TO EQUIPMENT
-- =====================================================
ALTER TABLE equipment ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'owned';
ALTER TABLE equipment ADD COLUMN IF NOT EXISTS supplier TEXT;
ALTER TABLE equipment ADD COLUMN IF NOT EXISTS rental_cost DECIMAL(10,2);
ALTER TABLE equipment ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();


-- =====================================================
-- 4. CREATE MISSING TABLES
-- =====================================================

-- FOOD ITEMS TABLE (a la carte menu)
CREATE TABLE IF NOT EXISTS food_items (
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

-- FOOD ORDERS TABLE (a la carte & packed meal delivery)
CREATE TABLE IF NOT EXISTS food_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_type TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  delivery_type TEXT,
  delivery_address TEXT,
  delivery_city TEXT,
  delivery_barangay TEXT,
  delivery_street TEXT,
  delivery_landmark TEXT,
  delivery_date DATE,
  delivery_time TIME,
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2),
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'deposit_paid', 'fully_paid', 'refund_pending', 'refunded')),
  special_instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAYMENTS TABLE (transaction log)
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  food_order_id UUID REFERENCES food_orders(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  method TEXT NOT NULL,
  reference_number TEXT,
  payment_date DATE NOT NULL,
  notes TEXT,
  recorded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DISHES TABLE (for custom menu building)
CREATE TABLE IF NOT EXISTS dishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =====================================================
-- 5. ENABLE RLS ON NEW TABLES
-- =====================================================
ALTER TABLE food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;


-- =====================================================
-- 6. RLS POLICIES FOR NEW TABLES
-- =====================================================

-- Food Items: anyone can read, admins can manage
DO $$ BEGIN
  CREATE POLICY "Anyone can view food items" ON food_items FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can manage food items" ON food_items FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Food Orders
DO $$ BEGIN
  CREATE POLICY "Users can view own food orders" ON food_orders FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can create food orders" ON food_orders FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can view all food orders" ON food_orders FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can update food orders" ON food_orders FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can delete food orders" ON food_orders FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Payments
DO $$ BEGIN
  CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (
    booking_id IN (SELECT id FROM bookings WHERE user_id = auth.uid())
    OR food_order_id IN (SELECT id FROM food_orders WHERE user_id = auth.uid())
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can manage payments" ON payments FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can insert payments" ON payments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Dishes
DO $$ BEGIN
  CREATE POLICY "Anyone can view dishes" ON dishes FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can manage dishes" ON dishes FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Admins can delete bookings (if policy missing)
DO $$ BEGIN
  CREATE POLICY "Admins can delete bookings" ON bookings FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Admins can create bookings for customers (if policy missing)
DO $$ BEGIN
  CREATE POLICY "Admins can create bookings" ON bookings FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- =====================================================
-- 7. TRIGGERS FOR NEW TABLES
-- =====================================================
DROP TRIGGER IF EXISTS update_food_orders_updated_at ON food_orders;
CREATE TRIGGER update_food_orders_updated_at
  BEFORE UPDATE ON food_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =====================================================
-- 8. UPDATE EQUIPMENT (replace old names with formula-matching names)
-- =====================================================
-- Delete old equipment that doesn't match the formulas
DELETE FROM equipment WHERE name IN (
  'Oval Table (Buffet)', 'Table Good for 10', 'Table Good for 4',
  'Bar Table (10 pax)', 'Round Tables', 'Chairs', 'Chair Covers',
  'Cocktail Tables', 'Kiddie Tables', 'Kiddie Chairs'
);

-- Insert new equipment (skip if already exists by name)
INSERT INTO equipment (name, category, quantity)
SELECT name, category, quantity FROM (VALUES
  ('Round Table', 'Seating', 30),
  ('Guest Chair', 'Seating', 300),
  ('Chair Cover', 'Linens', 300),
  ('Buffet Table', 'Buffet', 10),
  ('Cocktail Table', 'Others', 12),
  ('Kiddie Table', 'Others', 10),
  ('Kiddie Chair', 'Others', 50),
  ('Dinner Plate', 'Utensils', 200),
  ('Dessert Plate', 'Utensils', 200),
  ('Soup Bowl', 'Utensils', 180),
  ('Spoon & Fork', 'Utensils', 200),
  ('Water Glass', 'Utensils', 200),
  ('Teaspoon', 'Utensils', 100),
  ('Goblet', 'Utensils', 120),
  ('Serving Spoon', 'Serving', 20),
  ('Pitcher', 'Serving', 10),
  ('Ice Bucket', 'Serving', 12),
  ('Ice Tong', 'Serving', 15),
  ('Serving Tray', 'Serving', 10),
  ('Lechon Tray', 'Serving', 4),
  ('Chafing Dish', 'Buffet', 24),
  ('Serving Tong', 'Serving', 24),
  ('Table Cloth', 'Linens', 40),
  ('Table Napkin', 'Linens', 200),
  ('Table Skirting', 'Linens', 10)
) AS t(name, category, quantity)
WHERE NOT EXISTS (SELECT 1 FROM equipment e WHERE e.name = t.name);


-- =====================================================
-- DONE! Now run test-data.sql to add sample bookings.
-- =====================================================
