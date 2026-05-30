import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAll, create, generateId } from '@/lib/db'

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
    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }
    const now = new Date().toISOString()
    const lead = await create('leads', {
      id: generateId(),
      userId: body.userId || (session.user as any).id,
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      source: body.source || 'other',
      interest: body.interest || [],
      notes: body.notes || '',
      status: body.status || 'new',
      value: body.value || 0,
      createdAt: now,
      updatedAt: now,
    }, (session.user as any).id)
    return NextResponse.json(lead, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
