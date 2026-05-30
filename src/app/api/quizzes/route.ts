import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAll, create, generateId } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const quizzes = await getAll('quizzes')
    return NextResponse.json(quizzes)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    if (!body.title || !body.courseId || !body.questions) {
      return NextResponse.json({ error: 'Title, courseId, and questions are required' }, { status: 400 })
    }
    const quiz = await create('quizzes', {
      id: generateId(),
      courseId: body.courseId,
      title: body.title,
      questions: body.questions,
      passingScore: body.passingScore || 70,
    }, (session.user as any).id)
    return NextResponse.json(quiz, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
