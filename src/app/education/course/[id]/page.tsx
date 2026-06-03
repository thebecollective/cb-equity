'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Play, BookOpen, HelpCircle, Bot, CheckCircle2 } from 'lucide-react'
import { detailedModules } from '@/lib/detailed-content'
import Link from 'next/link'

export default function CourseViewer() {
  const { id } = useParams()
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const module = detailedModules[id as string]

  if (!module) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link href="/education" className="text-[#1e3a5f] underline">Return to Education Center</Link>
      </div>
    )
  }

  const lesson = module.lessons[activeLessonIndex]

  const handleQuizSubmit = (index: number) => {
    setQuizAnswer(index)
    setQuizSubmitted(true)
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-6 border-b">
          <Link href="/education" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-600 mb-4 transition-colors">
            <ChevronLeft size={14} /> Back to Catalog
          </Link>
          <h2 className="text-lg font-bold text-gray-900 leading-tight">{module.title}</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded-full">
              {module.difficulty}
            </span>
            <span className="text-xs text-gray-400">{module.duration}</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {module.lessons.map((l, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveLessonIndex(i)
                setQuizSubmitted(false)
                setQuizAnswer(null)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeLessonIndex === i 
                  ? 'bg-[#1e3a5f] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                activeLessonIndex === i ? 'bg-white text-[#1e3a5f]' : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1}
              </span>
              {l.title}
            </button>
          ))}
        </nav>

        <div className="p-6 bg-gray-50 border-t">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Your Progress</span>
            <span className="text-xs font-bold text-[#1e3a5f]">{Math.round(((activeLessonIndex + 1) / module.lessons.length) * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1e3a5f] transition-all duration-500" 
              style={{ width: `${((activeLessonIndex + 1) / module.lessons.length) * 100}%` }} 
            />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 md:p-12">
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLessonIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm text-[#1e3a5f]">
                  {lesson.type === 'text' && <BookOpen size={20} />}
                  {lesson.type === 'video' && <Play size={20} />}
                  {lesson.type === 'quiz' && <HelpCircle size={20} />}
                  {lesson.type === 'ai_sim' && <Bot size={20} />}
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
              </div>

              <div className="prose prose-slate max-w-none">
                {lesson.type === 'text' && (
                  <div className="text-lg leading-relaxed text-gray-600 space-y-4">
                    {lesson.content}
                  </div>
                )}

                {lesson.type === 'video' && (
                  <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-black">
                    <iframe 
                      className="w-full h-full" 
                      src={lesson.content} 
                      title={lesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    />
                  </div>
                )}

                {lesson.type === 'quiz' && (
                  <div className="space-y-6">
                    <p className="text-gray-600 italic mb-6">{lesson.content}</p>
                    {lesson.quiz?.map((q, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <p className="text-lg font-bold text-gray-900 mb-4">{q.question}</p>
                        <div className="grid grid-cols-1 gap-3">
                          {q.options.map((opt, oi) => (
                            <button
                              key={oi}
                              onClick={() => handleQuizSubmit(oi)}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-3 rounded-xl border transition-all text-sm ${
                                quizSubmitted 
                                  ? oi === q.correctAnswer 
                                    ? 'bg-green-50 border-green-500 text-green-700 font-bold' 
                                    : quizAnswer === oi ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-gray-200 text-gray-500'
                                    : 'bg-white border-gray-200 hover:border-[#1e3a5f] hover:bg-gray-50'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {quizSubmitted && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 p-4 rounded-xl text-sm flex items-start gap-3 ${
                              quizAnswer === q.correctAnswer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                            }`}
                          >
                            {quizAnswer === q.correctAnswer ? <CheckCircle2 size={18} className="shrink-0" /> : <span className="text-lg">✕</span>}
                            <p>{q.explanation}</p>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {lesson.type === 'ai_sim' && (
                  <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a73] rounded-3xl p-8 text-white shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Bot size={24} />
                      </div>
                      <h3 className="text-xl font-bold">AI Simulation Mode</h3>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-8 text-lg">
                      {lesson.content}
                    </p>
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                      <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">AI Persona Instructions</p>
                      <p className="text-sm italic text-white/90">"{lesson.aiPrompt}"</p>
                    </div>
                    <button 
                      onClick={() => window.location.href = '/dashboard/ai-bot'}
                      className="mt-8 w-full py-4 bg-[#c9a84c] text-white rounded-2xl font-bold hover:bg-[#b38f3a] transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      Launch AI Simulation <Play size={18} fill="currentColor" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
