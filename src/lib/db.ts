import { supabase } from './supabase'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'employee' | 'partner'
  createdAt: string
}

export function generateId(): string {
  return crypto.randomUUID()
}

// Wrapper to log actions
async function logAction(userId: string, action: string, table: string, recordId: string, changes?: any) {
  await supabase.from('audit_logs').insert([{
    id: generateId(),
    user_id: userId,
    action,
    table_name: table,
    record_id: recordId,
    changes
  }])
}

export async function getAll(table: string) {
  const { data, error } = await supabase.from(table).select('*')
  if (error) throw error
  return data
}

export async function getById(table: string, id: string) {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function create(table: string, item: any, userId: string) {
  const { data, error } = await supabase.from(table).insert([item]).select().single()
  if (error) throw error
  
  await logAction(userId, 'CREATE', table, data.id, item)
  return data
}

export async function update(table: string, id: string, updates: any, userId: string) {
  const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single()
  if (error) throw error
  
  await logAction(userId, 'UPDATE', table, id, updates)
  return data
}

export async function remove(table: string, id: string, userId: string) {
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw error
  
  await logAction(userId, 'DELETE', table, id)
  return true
}

export async function query(table: string, predicateOrColumn: any, value?: any) {
  const data = await getAll(table)
  if (typeof predicateOrColumn === 'function') {
    return data.filter(predicateOrColumn)
  }
  return data.filter(item => item[predicateOrColumn] === value)
}
