import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAll, create, generateId } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const courses = await getAll('courses')
    return NextResponse.json(courses)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }
    const course = await create('courses', {
      id: generateId(),
      title: body.title,
      category: body.category || 'financial_advising',
      description: body.description || '',
      modules: body.modules || [],
      duration: body.duration || '',
      difficulty: body.difficulty || 'beginner',
      createdAt: new Date().toISOString(),
    }, (session.user as any).id)
    return NextResponse.json(course, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
