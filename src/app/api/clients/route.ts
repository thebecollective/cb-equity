import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAll, create, generateId } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const clients = await getAll('clients')
    return NextResponse.json(clients)
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
    const client = await create('clients', {
      id: generateId(),
      userId: body.userId || (session.user as any).id,
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      address: body.address || '',
      notes: body.notes || '',
      status: body.status || 'lead',
      tags: body.tags || [],
      createdAt: now,
      updatedAt: now,
    }, (session.user as any).id)
    return NextResponse.json(client, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
