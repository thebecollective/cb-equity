import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getById, update, remove, create, generateId } from '@/lib/db'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const quiz = await getById('quizzes', id)
    if (!quiz) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(quiz)
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
    const updated = await update('quizzes', id, body, (session.user as any).id)
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
    const removed = await remove('quizzes', id, (session.user as any).id)
    if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const quiz = await getById('quizzes', id)
    if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    const { answers } = await req.json()
    if (!Array.isArray(answers)) {
      return NextResponse.json({ error: 'Answers array is required' }, { status: 400 })
    }
    const total = quiz.questions.length
    let correct = 0
     quiz.questions.forEach((q: any, i: number) => {
      if (answers[i] === q.correctIndex) correct++
    })
    const score = Math.round((correct / total) * 100)
    const passed = score >= quiz.passingScore
    const attempt = await create('quizAttempts', {
      id: generateId(),
      userId: (session.user as any).id,
      quizId: id,
      score,
      total,
      passed,
      answers,
      createdAt: new Date().toISOString(),
    }, (session.user as any).id)
    return NextResponse.json({ attempt, score, total, correct, passed }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
