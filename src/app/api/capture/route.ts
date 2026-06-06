import { NextResponse } from 'next/server'
import { create, generateId } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, name, source, data } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const now = new Date().toISOString()
    const lead = await create('leads', {
      id: generateId(),
      name: name || 'Unknown Lead',
      email: email,
      phone: data?.phone || '',
      source: source || 'website_tool',
      interest: data?.interest || [],
      notes: `Captured via ${source}. Details: ${JSON.stringify(data)}`,
      status: 'new',
      value: data?.estimatedValue || 0,
      createdAt: now,
      updatedAt: now,
    }, 'system')

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 })
  } catch (error) {
    console.error('Capture Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
