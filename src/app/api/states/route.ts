import { NextResponse } from 'next/server'
import { getAll } from '@/lib/db'

export async function GET() {
  try {
    const states = await getAll('state_exam_requirements')
    return NextResponse.json(states)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
