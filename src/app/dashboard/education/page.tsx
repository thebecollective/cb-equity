'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Modal from '@/components/dashboard/Modal'
import LearningModuleCard from '@/components/education/LearningModuleCard'
import { aiModules } from '@/lib/education-data'

type Tab = 'courses' | 'quizzes' | 'ai'

interface Module {
  title: string
  content: string
  duration: string
}

interface Course {
  id: string
  title: string
  category: 'insurance' | 'financial_advising' | 'wholesaling' | 'business'
  description: string
  modules: Module[]
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  createdAt: string
}

interface Question {
  question: string
  options: string[]
  correctIndex: number
}

interface Quiz {
  id: string
  courseId: string
  title: string
  questions: Question[]
  passingScore: number
}

interface QuizResult {
  score: number
  total: number
  passed: boolean
}

const categoryOptions = ['insurance', 'financial_advising', 'wholesaling', 'business'] as const
const difficultyOptions = ['beginner', 'intermediate', 'advanced'] as const
const categoryLabels: Record<string, string> = {
  insurance: 'Insurance',
  financial_advising: 'Financial Advising',
  wholesaling: 'Wholesaling',
  business: 'Business',
}
const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-50 text-green-700',
  intermediate: 'bg-yellow-50 text-yellow-700',
  advanced: 'bg-red-50 text-red-700',
}
const categoryColors: Record<string, string> = {
  insurance: 'bg-blue-50 text-blue-700',
  financial_advising: 'bg-purple-50 text-purple-700',
  wholesaling: 'bg-orange-50 text-orange-700',
  business: 'bg-teal-50 text-teal-700',
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
      <p className="text-gray-400 text-sm font-medium">{message}</p>
    </div>
  )
}

function Accordion({ modules }: { modules: Module[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-1">
      {modules.map((mod, i) => (
        <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>{mod.title}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{mod.duration}</span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {openIndex === i && (
            <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-2">
              {mod.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function QuizPlayer({
  quiz,
  onDone,
  onClose,
}: {
  quiz: Quiz
  onDone: () => void
  onClose: () => void
}) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<QuizResult | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleAnswer = (index: number) => {
    const next = [...answers]
    next[current] = index
    setAnswers(next)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/quizzes/${quiz.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      //
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    return (
      <div className="text-center py-6 space-y-4">
        <div className={`text-5xl ${result.passed ? 'text-green-500' : 'text-red-500'}`}>
          {result.passed ? '✓' : '✗'}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {result.passed ? 'Passed!' : 'Failed'}
        </h3>
        <p className="text-gray-600">
          Score: {result.score} / {result.total}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-xs mx-auto">
          <div
            className={`h-2.5 rounded-full ${result.passed ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${(result.score / result.total) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onDone}
            className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 transition-colors"
          >
            Retake
          </button>
        </div>
      </div>
    )
  }

  const q = quiz.questions[current]
  if (!q) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          Question {current + 1} of {quiz.questions.length}
        </span>
        <span className="text-xs text-gray-400">
          Passing: {quiz.passingScore}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
        <div
          className="h-1.5 rounded-full bg-[#1e3a5f]"
          style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>
      <p className="text-sm font-medium text-gray-900 mb-4">{q.question}</p>
      <div className="space-y-2 mb-6">
        {q.options.map((opt, i) => (
          <label
            key={i}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              answers[current] === i
                ? 'border-[#1e3a5f] bg-[#1e3a5f]/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name={`q-${current}`}
              checked={answers[current] === i}
              onChange={() => handleAnswer(i)}
              className="w-4 h-4 text-[#1e3a5f] focus:ring-[#1e3a5f]"
            />
            <span className="text-sm text-gray-700">{opt}</span>
          </label>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
          disabled={current === 0}
          className="px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-30 hover:text-gray-800 transition-colors"
        >
          Previous
        </button>
        {current < quiz.questions.length - 1 ? (
          <button
            onClick={() => setCurrent((p) => p + 1)}
            className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || answers.length < quiz.questions.length}
            className="px-4 py-2 bg-[#c9a84c] text-white text-sm font-medium rounded-lg hover:bg-[#c9a84c]/90 disabled:opacity-50 transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  )
}

export default function EducationPage() {
  const [tab, setTab] = useState<Tab>('courses')

  // Courses state
  const [courses, setCourses] = useState<Course[]>([])
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [courseModalOpen, setCourseModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [courseForm, setCourseForm] = useState({
    title: '',
    category: 'insurance' as string,
    description: '',
    duration: '',
    difficulty: 'beginner' as string,
    modules: '',
  })
  const [courseSaving, setCourseSaving] = useState(false)
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

  // Quizzes state
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [quizzesLoading, setQuizzesLoading] = useState(true)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null)
  const [quizForm, setQuizForm] = useState({
    title: '',
    courseId: '',
    passingScore: '70',
    questions: '',
  })
  const [quizSaving, setQuizSaving] = useState(false)
  const [takingQuiz, setTakingQuiz] = useState<Quiz | null>(null)

  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch('/api/courses')
      const data = await res.json()
      setCourses(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch courses', err)
    } finally {
      setCoursesLoading(false)
    }
  }, [])

  const fetchQuizzes = useCallback(async () => {
    try {
      const res = await fetch('/api/quizzes')
      const data = await res.json()
      setQuizzes(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch quizzes', err)
    } finally {
      setQuizzesLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
    fetchQuizzes()
  }, [fetchCourses, fetchQuizzes])

  // Course CRUD
  const openAddCourse = () => {
    setEditingCourse(null)
    setCourseForm({ title: '', category: 'insurance', description: '', duration: '', difficulty: 'beginner', modules: '' })
    setCourseModalOpen(true)
  }

  const openEditCourse = (course: Course) => {
    setEditingCourse(course)
    setCourseForm({
      title: course.title,
      category: course.category,
      description: course.description,
      duration: course.duration,
      difficulty: course.difficulty,
      modules: course.modules.map((m) => `${m.title}|${m.content}|${m.duration}`).join('\n'),
    })
    setCourseModalOpen(true)
  }

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCourseSaving(true)

    const modules: Module[] = courseForm.modules
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        const parts = line.split('|').map((p) => p.trim())
        return { title: parts[0] || '', content: parts[1] || '', duration: parts[2] || '' }
      })

    const body = {
      title: courseForm.title,
      category: courseForm.category,
      description: courseForm.description,
      duration: courseForm.duration,
      difficulty: courseForm.difficulty,
      modules,
    }

    try {
      if (editingCourse) {
        await fetch(`/api/courses/${editingCourse.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      } else {
        await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      }
      setCourseModalOpen(false)
      await fetchCourses()
    } catch (err) {
      console.error('Error saving course', err)
    } finally {
      setCourseSaving(false)
    }
  }

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Delete this course?')) return
    try {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' })
      await fetchCourses()
    } catch (err) {
      console.error('Error deleting course', err)
    }
  }

  // Quiz CRUD
  const openAddQuiz = () => {
    setEditingQuiz(null)
    setQuizForm({ title: '', courseId: '', passingScore: '70', questions: '' })
    setQuizModalOpen(true)
  }

  const openEditQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz)
    setQuizForm({
      title: quiz.title,
      courseId: quiz.courseId,
      passingScore: String(quiz.passingScore),
      questions: quiz.questions
        .map((q) => `Q: ${q.question}|A: ${q.options.join(',')}|C: ${q.correctIndex}`)
        .join('\n\n'),
    })
    setQuizModalOpen(true)
  }

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setQuizSaving(true)

    const questions: Question[] = quizForm.questions
      .split(/\n\n+/)
      .filter((block) => block.trim())
      .map((block) => {
        const qMatch = block.match(/^Q:\s*(.+)/m)
        const aMatch = block.match(/^A:\s*(.+)/m)
        const cMatch = block.match(/^C:\s*(\d+)/m)
        return {
          question: qMatch?.[1]?.trim() || '',
          options: aMatch?.[1]?.split(',').map((o) => o.trim()) || [],
          correctIndex: cMatch ? parseInt(cMatch[1], 10) : 0,
        }
      })

    try {
      if (editingQuiz) {
        await fetch(`/api/quizzes/${editingQuiz.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...quizForm, passingScore: Number(quizForm.passingScore), questions }),
        })
      } else {
        await fetch('/api/quizzes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...quizForm, passingScore: Number(quizForm.passingScore), questions }),
        })
      }
      setQuizModalOpen(false)
      await fetchQuizzes()
    } catch (err) {
      console.error('Error saving quiz', err)
    } finally {
      setQuizSaving(false)
    }
  }

  const handleDeleteQuiz = async (id: string) => {
    if (!window.confirm('Delete this quiz?')) return
    try {
      await fetch(`/api/quizzes/${id}`, { method: 'DELETE' })
      await fetchQuizzes()
    } catch (err) {
      console.error('Error deleting quiz', err)
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3352]">Education Center</h1>
          <p className="mt-1 text-sm text-gray-500">Courses, AI modules, and practice quizzes</p>
        </div>
        <Link
          href="/dashboard/ai-bot"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1a3352] to-[#2a5080] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          Open AI Assistant
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {([
          { id: 'courses' as Tab, label: 'Courses', count: courses.length },
          { id: 'ai' as Tab, label: 'AI Modules', count: aiModules.length },
          { id: 'quizzes' as Tab, label: 'Practice Tests', count: quizzes.length },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              tab === t.id
                ? 'bg-[#1a3352] text-white shadow-md shadow-[#1a3352]/20'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1a3352]/30'
            }`}
          >
            {t.label}
            <span className={`ml-1.5 text-xs ${tab === t.id ? 'text-white/70' : 'text-gray-400'}`}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Courses Tab */}
      {tab === 'courses' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">{courses.length} courses</p>
            <button
              onClick={openAddCourse}
              className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 transition-colors"
            >
              Add Course
            </button>
          </div>

          {coursesLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : courses.length === 0 ? (
            <EmptyState message="No courses found" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:border-[#1a3352]/20 hover:shadow-lg hover:shadow-[#1a3352]/5 transition-all duration-300"
                >
                  <div className="h-1 bg-gradient-to-r from-[#1a3352] via-[#b8943f] to-[#2a5080] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1a3352]">{course.title}</h3>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditCourse(course)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-[#1e3a5f] bg-[#1e3a5f]/5 hover:bg-[#1e3a5f]/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          categoryColors[course.category] || 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        {categoryLabels[course.category] || course.category}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          difficultyColors[course.difficulty] || 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        {course.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{course.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{course.duration}</span>
                      <span>{course.modules?.length || 0} modules</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                    className="w-full px-5 py-2.5 text-xs font-medium text-gray-500 border-t border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                  >
                    {expandedCourse === course.id ? 'Hide Modules' : 'View Modules'}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${expandedCourse === course.id ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {expandedCourse === course.id && (
                    <div className="px-5 pb-4 border-t border-gray-100 pt-3">
                      <Accordion modules={course.modules || []} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AI Modules Tab */}
      {tab === 'ai' && (
        <div>
          <div className="mb-6 rounded-2xl border border-[#b8943f]/20 bg-gradient-to-br from-[#1a3352]/5 to-[#b8943f]/5 p-6">
            <h2 className="text-lg font-bold text-[#1a3352]">CB Equity AI Learning</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-600">
              Interactive AI modules trained on Brooke & Connor&apos;s sales, planning, and market philosophy. 
              Launch any module in the AI Assistant to practice and get feedback.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiModules.map((mod, i) => (
              <Link key={mod.id} href="/dashboard/ai-bot">
                <LearningModuleCard module={mod} index={i} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quizzes Tab */}
      {tab === 'quizzes' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">{quizzes.length} quizzes</p>
            <button
              onClick={openAddQuiz}
              className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 transition-colors"
            >
              Add Quiz
            </button>
          </div>

          {quizzesLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : quizzes.length === 0 ? (
            <EmptyState message="No quizzes found" />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Questions</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Passing Score</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quizzes.map((quiz) => (
                      <tr key={quiz.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900">{quiz.title}</span>
                          {quiz.courseId && (
                            <p className="text-xs text-gray-400 mt-0.5">Course ID: {quiz.courseId}</p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{quiz.questions?.length || 0}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-[#c9a84c]">{quiz.passingScore}%</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setTakingQuiz(quiz)}
                              className="px-3 py-1.5 text-xs font-medium text-white bg-[#c9a84c] hover:bg-[#c9a84c]/90 rounded-lg transition-colors"
                            >
                              Take Quiz
                            </button>
                            <button
                              onClick={() => openEditQuiz(quiz)}
                              className="px-3 py-1.5 text-xs font-medium text-[#1e3a5f] bg-[#1e3a5f]/5 hover:bg-[#1e3a5f]/10 rounded-lg transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteQuiz(quiz.id)}
                              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Course Modal */}
      <Modal
        isOpen={courseModalOpen}
        onClose={() => setCourseModalOpen(false)}
        title={editingCourse ? 'Edit Course' : 'Add Course'}
      >
        <form onSubmit={handleCourseSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={courseForm.title}
              onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={courseForm.category}
              onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {categoryLabels[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              required
              value={courseForm.description}
              onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              required
              value={courseForm.duration}
              onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
              placeholder="e.g. 4 weeks"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              value={courseForm.difficulty}
              onChange={(e) => setCourseForm({ ...courseForm, difficulty: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            >
              {difficultyOptions.map((d) => (
                <option key={d} value={d}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modules{' '}
              <span className="text-gray-400 font-normal">(one per line: title|content|duration)</span>
            </label>
            <textarea
              rows={5}
              value={courseForm.modules}
              onChange={(e) => setCourseForm({ ...courseForm, modules: e.target.value })}
              placeholder="Module 1|Description of module 1|30 min&#10;Module 2|Description of module 2|45 min"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none font-mono"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCourseModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={courseSaving}
              className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 disabled:opacity-50 transition-colors"
            >
              {courseSaving ? 'Saving...' : editingCourse ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Quiz Modal */}
      <Modal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        title={editingQuiz ? 'Edit Quiz' : 'Add Quiz'}
      >
        <form onSubmit={handleQuizSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={quizForm.title}
              onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
            <input
              type="text"
              required
              value={quizForm.courseId}
              onChange={(e) => setQuizForm({ ...quizForm, courseId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passing Score (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              required
              value={quizForm.passingScore}
              onChange={(e) => setQuizForm({ ...quizForm, passingScore: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Questions{' '}
              <span className="text-gray-400 font-normal">
                (format: Q: question|A: opt1,opt2,opt3,opt4|C: correctIndex)
              </span>
            </label>
            <textarea
              rows={8}
              required
              value={quizForm.questions}
              onChange={(e) => setQuizForm({ ...quizForm, questions: e.target.value })}
              placeholder="Q: What is 2+2?|A: 3,4,5,6|C: 1&#10;&#10;Q: What color is the sky?|A: Red,Blue,Green,Yellow|C: 1"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none font-mono"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setQuizModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={quizSaving}
              className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 disabled:opacity-50 transition-colors"
            >
              {quizSaving ? 'Saving...' : editingQuiz ? 'Update Quiz' : 'Add Quiz'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Take Quiz Modal */}
      <Modal
        isOpen={!!takingQuiz}
        onClose={() => setTakingQuiz(null)}
        title={takingQuiz?.title || 'Take Quiz'}
      >
        {takingQuiz && (
          <QuizPlayer
            quiz={takingQuiz}
            onDone={() => {
              setTakingQuiz(null)
              setTimeout(() => setTakingQuiz(takingQuiz), 100)
            }}
            onClose={() => setTakingQuiz(null)}
          />
        )}
      </Modal>
    </div>
  )
}
