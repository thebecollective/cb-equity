// Run: npx tsx scripts/seed-firm.ts
// Creates the initial CB Equity firm and admin user

import { supabase } from '../src/lib/supabase'
import bcrypt from 'bcryptjs'

const FIRM_ID = crypto.randomUUID()
const ADMIN_ID = crypto.randomUUID()
const FIRM_SLUG = 'cb-equity'

async function seed() {
  const hashed = await bcrypt.hash('admin123', 12)
  const now = new Date().toISOString()

  const { error: firmError } = await supabase.from('firms').insert([{
    id: FIRM_ID,
    name: 'CB Equity',
    slug: FIRM_SLUG,
    primary_color: '#1e3a5f',
    accent_color: '#c9a84c',
    created_at: now,
    updated_at: now,
  }])
  if (firmError) { console.error('Firm error:', firmError); return }

  const { error: userError } = await supabase.from('users').insert([{
    id: ADMIN_ID,
    name: 'Admin',
    email: 'admin@cbequity.com',
    password: hashed,
    role: 'admin',
    firm_id: FIRM_ID,
    createdAt: now,
  }])
  if (userError) { console.error('User error:', userError); return }

  const { error: fuError } = await supabase.from('firm_users').insert([{
    id: crypto.randomUUID(),
    firm_id: FIRM_ID,
    user_id: ADMIN_ID,
    role: 'admin',
  }])
  if (fuError) { console.error('FirmUsers error:', fuError); return }

  console.log(`✓ Firm created: CB Equity (${FIRM_ID})`)
  console.log(`✓ Admin user: admin@cbequity.com / admin123`)
  console.log(`\nSet NEXT_PUBLIC_DEFAULT_FIRM_ID=${FIRM_ID} in your .env.local`)
}

seed()
