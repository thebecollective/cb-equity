import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAll, getById, create, generateId } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const orders = await getAll('orders')
    return NextResponse.json(orders)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    if (!body.clientId || !body.productId || !body.amount) {
      return NextResponse.json({ error: 'clientId, productId, and amount are required' }, { status: 400 })
    }
    const product = await getById('products', body.productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    const commissionAmount = body.amount * product.commissionRate
    const now = new Date().toISOString()
    const order = await create('orders', {
      id: generateId(),
      userId: body.userId || (session.user as any).id,
      clientId: body.clientId,
      productId: body.productId,
      productName: product.name,
      productType: product.type,
      amount: body.amount,
      commission: commissionAmount,
      status: body.status || 'pending',
      createdAt: now,
    }, (session.user as any).id)
    const client = await getById('clients', body.clientId)
    await create('commissions', {
      id: generateId(),
      userId: order.userId,
      clientId: body.clientId,
      clientName: client?.name || '',
      type: product.type,
      product: product.name,
      premium: body.amount,
      rate: product.commissionRate,
      amount: commissionAmount,
      status: 'pending',
      date: now,
      paidAt: null,
      createdAt: now,
    }, (session.user as any).id)
    return NextResponse.json(order, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
