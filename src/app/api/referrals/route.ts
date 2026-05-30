import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAll, create, generateId } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const referrals = await getAll('referrals')
    return NextResponse.json(referrals)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    if (!body.partnerName || !body.clientName) {
      return NextResponse.json({ error: 'Partner name and client name are required' }, { status: 400 })
    }
    const now = new Date().toISOString()
    const referral = await create('referrals', {
      id: generateId(),
      userId: body.userId || (session.user as any).id,
      partnerName: body.partnerName,
      partnerType: body.partnerType || 'real_estate',
      partnerEmail: body.partnerEmail || '',
      partnerPhone: body.partnerPhone || '',
      clientName: body.clientName,
      clientEmail: body.clientEmail || '',
      clientPhone: body.clientPhone || '',
      status: body.status || 'pending',
      commission: body.commission || 0,
      createdAt: now,
      updatedAt: now,
    }, (session.user as any).id)
    return NextResponse.json(referral, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
