import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAll, query, create, generateId } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    let commissions
    if (userId || status) {
       commissions = await query('commissions', (item: any) => {
        if (userId && item.userId !== userId) return false
        if (status && item.status !== status) return false
        return true
      })
    } else {
      commissions = await getAll('commissions')
    }
    return NextResponse.json(commissions)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    if (!body.userId || !body.clientName || !body.amount) {
      return NextResponse.json({ error: 'userId, clientName, and amount are required' }, { status: 400 })
    }
    const commission = await create('commissions', {
      id: generateId(),
      userId: body.userId,
      clientId: body.clientId || '',
      clientName: body.clientName,
      type: body.type || 'insurance',
      product: body.product || '',
      premium: body.premium || body.amount,
      rate: body.rate || 0,
      amount: body.amount,
      status: body.status || 'pending',
      date: body.date || new Date().toISOString(),
      paidAt: body.paidAt || null,
      createdAt: new Date().toISOString(),
    }, (session.user as any).id)
    return NextResponse.json(commission, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
