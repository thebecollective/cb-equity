import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { create, getAll, generateId, User } from '@/lib/db'

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = RegisterSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const { name, email, password } = result.data
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
