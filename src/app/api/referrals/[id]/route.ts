import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getById, update, remove } from '@/lib/db'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const referral = await getById('referrals', id)
    if (!referral) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(referral)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const body = await req.json()
    const updated = await update('referrals', id, { ...body, updatedAt: new Date().toISOString() }, (session.user as any).id)
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const removed = await remove('referrals', id, (session.user as any).id)
    if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
