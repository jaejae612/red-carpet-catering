-- =====================================================
-- RED CARPET CATERING - SUPABASE DATABASE SETUP
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor
-- =====================================================

-- 1. PROFILES TABLE (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EQUIPMENT TABLE (Tables, Chairs, etc.)
CREATE TABLE IF NOT EXISTS public.equipment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  venue TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  menu_package TEXT NOT NULL,
  menu_option TEXT,
  number_of_pax INTEGER NOT NULL,
  add_ons JSONB DEFAULT '[]'::jsonb,
  motif TEXT,
  special_requests TEXT,
  total_amount NUMERIC(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  -- Admin-only fields
  assigned_staff JSONB DEFAULT '[]'::jsonb,
  assigned_equipment JSONB DEFAULT '{}'::jsonb,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow insert during signup" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- STAFF POLICIES (Admin only for write, all authenticated can read)
CREATE POLICY "Anyone can view staff" ON public.staff
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only admins can manage staff" ON public.staff
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- EQUIPMENT POLICIES (Admin only for write, all authenticated can read)
CREATE POLICY "Anyone can view equipment" ON public.equipment
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only admins can manage equipment" ON public.equipment
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- BOOKINGS POLICIES
-- Customers can view their own bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

-- Customers can create bookings
CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view all bookings
CREATE POLICY "Admins can view all bookings" ON public.bookings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can update all bookings (for assignments)
CREATE POLICY "Admins can update bookings" ON public.bookings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to handle new user signup
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

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for bookings updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =====================================================
-- SEED DATA (Optional - Default Staff & Equipment)
-- =====================================================

-- Insert default staff
INSERT INTO public.staff (name, role, note, available) VALUES
  ('JR Ramirez', 'head_waiter', NULL, true),
  ('Oliver Fernandez', 'head_waiter', NULL, true),
  ('Jojo Bracero', 'head_waiter', 'Assistant', true),
  ('Kevin Elustrisimo', 'head_waiter', 'Assistant', true),
  ('Justine Baynosa', 'head_waiter', NULL, true),
  ('MC Quary Kyle Liong', 'head_waiter', NULL, true),
  ('Wilson Castañeda', 'head_waiter', NULL, true),
  ('Alex Pioquento', 'head_waiter', NULL, true),
  ('Farhanah Gamal', 'service', NULL, true),
  ('Mariza Abellana', 'service', NULL, true),
  ('Christianie Apostol', 'service', NULL, true),
  ('Jessa Apostol', 'service', NULL, true),
  ('Analie Autor', 'service', NULL, true),
  ('Ester Paoy', 'service', NULL, true),
  ('Grethel Laude', 'service', 'Pregnant', false),
  ('Richie', 'extra', NULL, true),
  ('Jasmine', 'extra', NULL, true),
  ('Jellian', 'extra', NULL, true),
  ('Elgie', 'student', NULL, true),
  ('Jandel', 'student', NULL, true),
  ('Jemmalyn', 'student', NULL, true)
ON CONFLICT DO NOTHING;

-- Insert default equipment
INSERT INTO public.equipment (name, category, quantity) VALUES
  ('Oval Table (Buffet)', 'Buffet', 10),
  ('Table Good for 10', 'Buffet', 20),
  ('Table Good for 4', 'Buffet', 15),
  ('Bar Table (10 pax)', 'Bar', 8),
  ('Round Tables', 'Seating', 30),
  ('Chairs', 'Seating', 300),
  ('Chair Covers', 'Seating', 300),
  ('Cocktail Tables', 'Others', 12),
  ('Kiddie Tables', 'Others', 10),
  ('Kiddie Chairs', 'Others', 50)
ON CONFLICT DO NOTHING;

-- =====================================================
-- CREATE FIRST ADMIN (Run after your first signup)
-- Replace 'YOUR_USER_ID' with your actual user ID from auth.users
-- =====================================================
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';
