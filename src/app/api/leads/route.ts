import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import { getAll, create, generateId } from '@/lib/db'

const LeadSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  source: z.string().optional(),
  interest: z.array(z.string()).optional(),
  notes: z.string().optional(),
  status: z.string().optional(),
  value: z.number().optional(),
  userId: z.string().optional(),
})

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const leads = await getAll('leads')
    return NextResponse.json(leads)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    const result = LeadSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message || 'Invalid input' }, { status: 400 })
    }

    const data = result.data
    const now = new Date().toISOString()
    const lead = await create('leads', {
      id: generateId(),
      userId: data.userId || (session.user as any).id,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      source: data.source || 'other',
      interest: data.interest || [],
      notes: data.notes || '',
      status: data.status || 'new',
      value: data.value || 0,
      createdAt: now,
      updatedAt: now,
    }, (session.user as any).id)
    return NextResponse.json(lead, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
