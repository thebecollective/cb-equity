import { supabase } from './supabase'
import { getCurrentFirmId, getDefaultFirmId } from './firm'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'employee' | 'partner'
  firm_id: string
  createdAt: string
}

export function generateId(): string {
  return crypto.randomUUID()
}

async function logAction(userId: string, action: string, table: string, recordId: string, firmId?: string, changes?: any) {
  await supabase.from('audit_logs').insert([{
    id: generateId(),
    user_id: userId,
    firm_id: firmId || null,
    action,
    table_name: table,
    record_id: recordId,
    changes
  }])
}

export async function getAll(table: string) {
  const firmId = await getCurrentFirmId()
  if (firmId) {
    const { data, error } = await supabase.from(table).select('*').eq('firm_id', firmId)
    if (error) throw error
    return data
  }
  const { data, error } = await supabase.from(table).select('*')
  if (error) throw error
  return data
}

export async function getById(table: string, id: string) {
  const firmId = await getCurrentFirmId()
  const query = supabase.from(table).select('*').eq('id', id)
  if (firmId) query.eq('firm_id', firmId)
  const { data, error } = await query.single()
  if (error) throw error
  return data
}

export async function create(table: string, item: any, userId: string) {
  const firmId = item.firm_id || await getCurrentFirmId() || await getDefaultFirmId()
  const record = { ...item, firm_id: firmId }
  const { data, error } = await supabase.from(table).insert([record]).select().single()
  if (error) throw error
  await logAction(userId, 'CREATE', table, data.id, firmId, item)
  return data
}

export async function update(table: string, id: string, updates: any, userId: string) {
  const firmId = await getCurrentFirmId()
  const query = supabase.from(table).update(updates).eq('id', id)
  if (firmId) query.eq('firm_id', firmId)
  const { data, error } = await query.select().single()
  if (error) throw error
  await logAction(userId, 'UPDATE', table, id, firmId || undefined, updates)
  return data
}

export async function remove(table: string, id: string, userId: string) {
  const firmId = await getCurrentFirmId()
  const query = supabase.from(table).delete().eq('id', id)
  if (firmId) query.eq('firm_id', firmId)
  const { error } = await query
  if (error) throw error
  await logAction(userId, 'DELETE', table, id, firmId || undefined)
  return true
}

export async function query(table: string, predicateOrColumn: any, value?: any) {
  const firmId = await getCurrentFirmId()
  const { data } = await supabase.from(table).select('*')
  const rows = data || []
  const filtered = firmId ? rows.filter(r => r.firm_id === firmId) : rows
  if (typeof predicateOrColumn === 'function') {
    return filtered.filter(predicateOrColumn)
  }
  return filtered.filter(item => item[predicateOrColumn] === value)
}

export async function getAllPublic(table: string) {
  const { data, error } = await supabase.from(table).select('*')
  if (error) throw error
  return data
}
