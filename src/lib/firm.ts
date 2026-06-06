import { auth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export interface Firm {
  id: string
  name: string
  slug: string
  logo_url: string | null
  primary_color: string
  accent_color: string
  settings: Record<string, any>
}

export interface FirmUser {
  id: string
  firm_id: string
  user_id: string
  role: 'admin' | 'advisor' | 'employee' | 'viewer'
}

export async function getCurrentFirmId(): Promise<string | null> {
  const session = await auth()
  return (session?.user as any)?.firm_id || null
}

export async function getCurrentFirm(): Promise<Firm | null> {
  const firmId = await getCurrentFirmId()
  if (!firmId) return null
  const { data } = await supabase.from('firms').select('*').eq('id', firmId).single()
  return data
}

export async function getFirmBySlug(slug: string): Promise<Firm | null> {
  const { data } = await supabase.from('firms').select('*').eq('slug', slug).single()
  return data
}

export async function getFirmUsers(firmId: string): Promise<FirmUser[]> {
  const { data } = await supabase
    .from('firm_users')
    .select('*')
    .eq('firm_id', firmId)
  return data || []
}

export async function getDefaultFirmId(): Promise<string | null> {
  const firmId = process.env.NEXT_PUBLIC_DEFAULT_FIRM_ID
  if (firmId) return firmId
  const { data } = await supabase.from('firms').select('id').limit(1).single()
  return data?.id || null
}
