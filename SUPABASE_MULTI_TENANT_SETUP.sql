-- =============================================================================
-- CB EQUITY MULTI-TENANT SETUP
-- Run this in Supabase SQL Editor after SUPABASE_SECURITY_SETUP.sql
-- =============================================================================

-- 1. CREATE FIRMS TABLE
CREATE TABLE IF NOT EXISTS firms (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#1e3a5f',
  accent_color TEXT DEFAULT '#c9a84c',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CREATE FIRM_USERS JOIN TABLE
CREATE TABLE IF NOT EXISTS firm_users (
  id UUID PRIMARY KEY,
  firm_id UUID REFERENCES firms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'advisor', 'employee', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(firm_id, user_id)
);

-- 3. ADD FIRM_ID TO ALL EXISTING TABLES
ALTER TABLE users ADD COLUMN IF NOT EXISTS firm_id UUID REFERENCES firms(id);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS firm_id UUID REFERENCES firms(id);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS firm_id UUID REFERENCES firms(id);
ALTER TABLE planning ADD COLUMN IF NOT EXISTS firm_id UUID REFERENCES firms(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS firm_id UUID REFERENCES firms(id);
ALTER TABLE commissions ADD COLUMN IF NOT EXISTS firm_id UUID REFERENCES firms(id);
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS firm_id UUID REFERENCES firms(id);

-- 4. CREATE HELPER FUNCTION TO GET CURRENT USER'S FIRM
CREATE OR REPLACE FUNCTION get_current_firm_id()
RETURNS UUID AS $$
  SELECT firm_id FROM users WHERE id = auth.uid();
$$ LANGUAGE SQL STABLE;

-- 5. UPDATE RLS POLICIES FOR FIRM ISOLATION
-- Drop old user-level policies
DROP POLICY IF EXISTS "Users can only access their own leads" ON leads;
DROP POLICY IF EXISTS "Users can only access their own clients" ON clients;
DROP POLICY IF EXISTS "Users can only access their own planning" ON planning;
DROP POLICY IF EXISTS "Users can only access their own orders" ON orders;
DROP POLICY IF EXISTS "Users can only access their own commissions" ON commissions;

-- Drop old admin policies
DROP POLICY IF EXISTS "Admins have full access to leads" ON leads;
DROP POLICY IF EXISTS "Admins have full access to clients" ON clients;
DROP POLICY IF EXISTS "Admins have full access to planning" ON planning;
DROP POLICY IF EXISTS "Admins have full access to orders" ON orders;
DROP POLICY IF EXISTS "Admins have full access to commissions" ON commissions;

-- Create firm-level policies
CREATE POLICY "Firm isolation leads" ON leads FOR ALL USING (
  firm_id = get_current_firm_id()
);

CREATE POLICY "Firm isolation clients" ON clients FOR ALL USING (
  firm_id = get_current_firm_id()
);

CREATE POLICY "Firm isolation planning" ON planning FOR ALL USING (
  firm_id = get_current_firm_id()
);

CREATE POLICY "Firm isolation orders" ON orders FOR ALL USING (
  firm_id = get_current_firm_id()
);

CREATE POLICY "Firm isolation commissions" ON commissions FOR ALL USING (
  firm_id = get_current_firm_id()
);

-- Admin override: admins can see their firm's data
CREATE POLICY "Admin firm access leads" ON leads FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin' AND firm_id = get_current_firm_id()
  )
);

CREATE POLICY "Admin firm access clients" ON clients FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin' AND firm_id = get_current_firm_id()
  )
);

CREATE POLICY "Admin firm access planning" ON planning FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin' AND firm_id = get_current_firm_id()
  )
);

CREATE POLICY "Admin firm access orders" ON orders FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin' AND firm_id = get_current_firm_id()
  )
);

CREATE POLICY "Admin firm access commissions" ON commissions FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin' AND firm_id = get_current_firm_id()
  )
);

-- Enable RLS on new tables
ALTER TABLE firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE firm_users ENABLE ROW LEVEL SECURITY;

-- Firm and firm_users policies
CREATE POLICY "Users can view their own firm" ON firms FOR SELECT USING (
  id = get_current_firm_id()
);

CREATE POLICY "Users can view firm members" ON firm_users FOR SELECT USING (
  firm_id = get_current_firm_id()
);

CREATE POLICY "Admins can manage firm members" ON firm_users FOR ALL USING (
  firm_id = get_current_firm_id()
  AND EXISTS (
    SELECT 1 FROM firm_users
    WHERE user_id = auth.uid() AND role = 'admin' AND firm_id = get_current_firm_id()
  )
);
