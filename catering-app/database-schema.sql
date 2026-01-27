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
  
  -- Customer Info
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  
  -- Event Details
  venue TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  
  -- Menu Selection
  menu_package TEXT NOT NULL,
  menu_option TEXT,
  number_of_pax INTEGER NOT NULL DEFAULT 60,
  add_ons JSONB DEFAULT '[]',
  
  -- Theme
  motif TEXT,
  special_requests TEXT,
  
  -- Financials
  total_amount DECIMAL(10,2) NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  
  -- Admin Assignments (only admin can modify)
  assigned_staff JSONB DEFAULT '[]',
  assigned_equipment JSONB DEFAULT '{}',
  
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


-- 5. SEED DATA (Optional - Default Staff and Equipment)
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
  ('Oval Table (Buffet)', 'Buffet', 10),
  ('Table Good for 10', 'Buffet', 20),
  ('Table Good for 4', 'Buffet', 15),
  ('Bar Table (10 pax)', 'Bar', 8),
  ('Round Tables', 'Seating', 30),
  ('Chairs', 'Seating', 300),
  ('Chair Covers', 'Linens', 300),
  ('Cocktail Tables', 'Others', 12),
  ('Kiddie Tables', 'Others', 10),
  ('Kiddie Chairs', 'Others', 50);


-- =============================================
-- DONE! Your database is ready.
-- =============================================
-- Next steps:
-- 1. Create a user account through the app
-- 2. Go to Table Editor > profiles
-- 3. Change your role from 'customer' to 'admin'
-- =============================================
