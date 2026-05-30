import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAll, create, generateId } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const planningData = await getAll('planningData')
    return NextResponse.json(planningData)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    if (!body.type || !body.name) {
      return NextResponse.json({ error: 'Type and name are required' }, { status: 400 })
    }
    const now = new Date().toISOString()
    const item = await create('planningData', {
      id: generateId(),
      userId: body.userId || (session.user as any).id,
      type: body.type,
      name: body.name,
      data: body.data || {},
      createdAt: now,
      updatedAt: now,
    }, (session.user as any).id)
    return NextResponse.json(item, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
