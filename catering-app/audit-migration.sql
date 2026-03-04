-- =====================================================
-- AUDIT LOG SYSTEM - Database Migration
-- =====================================================
-- Run this in Supabase SQL Editor
-- Adds audit tracking columns and audit_log table
-- =====================================================

-- 1. Add created_by / modified_by to bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS modified_by UUID REFERENCES auth.users(id);

-- 2. Add created_by / modified_by to food_orders
ALTER TABLE food_orders ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
ALTER TABLE food_orders ADD COLUMN IF NOT EXISTS modified_by UUID REFERENCES auth.users(id);

-- 3. Create audit_log table
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL,        -- 'booking', 'food_order', 'payment'
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,              -- 'created', 'updated', 'status_changed', 'deleted', 'payment_recorded'
  admin_id UUID REFERENCES auth.users(id),
  admin_name TEXT,                   -- Denormalized for display
  changed_fields JSONB,              -- Array of {field, old, new}
  description TEXT,                  -- Human-readable summary
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_admin_id ON audit_log(admin_id);

-- 5. RLS: admin-only access
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read audit log" ON audit_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can insert audit log" ON audit_log
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Allow authenticated users to insert audit entries (for created_by on customer bookings)
CREATE POLICY "Authenticated users can insert audit log" ON audit_log
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
