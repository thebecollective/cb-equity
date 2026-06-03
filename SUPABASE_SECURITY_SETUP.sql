-- =============================================================================
-- CB EQUITY SECURITY HARDENING SCRIPT
-- Instructions: Copy all text below and paste into the Supabase SQL Editor
-- =============================================================================

-- 1. ENABLE RLS ON ALL SENSITIVE TABLES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE planning ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- 2. USER-LEVEL POLICIES (Ensures users only see their own data)
-- Leads
CREATE POLICY "Users can only access their own leads" ON leads FOR ALL USING (auth.uid() = user_id);
-- Clients
CREATE POLICY "Users can only access their own clients" ON clients FOR ALL USING (auth.uid() = user_id);
-- Planning
CREATE POLICY "Users can only access their own planning" ON planning FOR ALL USING (auth.uid() = user_id);
-- Orders
CREATE POLICY "Users can only access their own orders" ON orders FOR ALL USING (auth.uid() = user_id);
-- Commissions
CREATE POLICY "Users can only access their own commissions" ON commissions FOR ALL USING (auth.uid() = user_id);

-- 3. ADMIN-LEVEL POLICIES (Ensures admins can see everything)
CREATE POLICY "Admins have full access to leads" ON leads FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins have full access to clients" ON clients FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins have full access to planning" ON planning FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins have full access to orders" ON orders FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins have full access to commissions" ON commissions FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- 4. AUTHENTICATION HARDENING
-- Ensure only verified emails can sign up (Optional, but recommended)
-- ALTER TABLE auth.users ADD CONSTRAINT email_verified CHECK (email_confirmed_at IS NOT NULL);
