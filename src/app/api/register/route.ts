import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { create, getAll, generateId, User } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    const existing = (await getAll('users')).find((u: User) => u.email === email)
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }
    const hashed = await bcrypt.hash(password, 12)
    const userId = generateId()
    const user = await create('users', {
      id: userId,
      name,
      email,
      password: hashed,
      role: 'employee',
      createdAt: new Date().toISOString(),
    }, userId)
    return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
