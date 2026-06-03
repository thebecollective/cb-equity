'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Timer, Award, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

interface ExamSimulatorProps {
  state: string
  lineOfAuthority: 'life' | 'health'
  onComplete: (score: number) => void
}

export default function ExamSimulator({ state, lineOfAuthority, onComplete }: ExamSimulatorProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes

  // Dynamic Question Generator based on State and LOA
  const questions: Question[] = [
    {
      id: 'q1',
      category: 'Licensing',
      question: `In ${state}, what is the minimum age requirement to apply for a ${lineOfAuthority} insurance producer license?`,
      options: ['16', '18', '21', '25'],
      correctAnswer: 1,
      explanation: `Most states, including ${state}, require producers to be at least 18 years of age.`
    },
    {
      id: 'q2',
      category: 'Unfair Trade Practices',
      question: `Which of the following is considered 'Twisting' under ${state} insurance law?`,
      options: ['Offering a lower premium', 'Making a misleading comparison to induce a policy replacement', 'Suggesting a whole life policy', 'Refusing to sell a policy'],
      correctAnswer: 1,
      explanation: 'Twisting is the act of intentionally misrepresenting a policy to persuade a client to switch.'
    },
    {
      id: 'q3',
      category: 'Administrative Law',
      question: `How many days does a producer in ${state} typically have to notify the DOI of a change of address?`,
      options: ['15 days', '30 days', '60 days', '90 days'],
      correctAnswer: 1,
      explanation: `Standard ${state} regulation requires notification within 30 days.`
    },
    {
      id: 'q4',
      category: 'Replacement',
      question: `When replacing a ${lineOfAuthority} policy in ${state}, the producer must provide the same notice to the existing insurer as to the applicant.`,
      options: ['True', 'False', 'Only for policies over $100k', 'Only for senior citizens'],
      correctAnswer: 0,
      explanation: 'Replacement regulations require notification to both parties to prevent churning.'
    },
    {
      id: 'q5',
      category: 'Ethics',
      question: `A producer in ${state} receives an undisclosed commission from a third party. This is an example of:`,
      options: ['Rebating', 'Coercion', 'Illegal Inducement', 'Proper Compensation'],
      correctAnswer: 2,
      explanation: 'Providing undisclosed payments to induce a sale is an illegal inducement.'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    const correctCount = questions.reduce((acc, q, i) => (answers[i] === q.correctAnswer ? acc + 1 : acc), 0)
    onComplete((correctCount / questions.length) * 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
          <Timer size={18} className="text-red-500" />
          <span>Time Remaining: {formatTime(timeLeft)}</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
        {!isSubmitted ? (
          <div className="space-y-8">
            <div>
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-md mb-2 inline-block">
                {questions[currentQuestionIndex].category}
              </span>
              <h2 className="text-xl font-bold text-gray-900 leading-relaxed">
                {questions[currentQuestionIndex].question}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {questions[currentQuestionIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setAnswers({...answers, [currentQuestionIndex]: i})}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    answers[currentQuestionIndex] === i 
                      ? 'border-[#1e3a5f] bg-[#1e3a5f]/5 text-[#1e3a5f] font-bold' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t">
              <button 
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 disabled:opacity-30"
              >
                Previous
              </button>
              {currentQuestionIndex === questions.length - 1 ? (
                <button 
                  onClick={handleSubmit}
                  className="px-8 py-2 gradient-bg text-white rounded-xl font-bold hover:opacity-90 shadow-lg"
                >
                  Submit Exam
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="px-6 py-2 bg-[#1e3a5f] text-white rounded-xl text-sm font-bold hover:bg-[#2d4a73]"
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Award size={64} className="mx-auto text-[#c9a84c]" />
              <h2 className="text-3xl font-bold text-gray-900">Exam Complete!</h2>
              <p className="text-gray-500">Your final score for the {state} {lineOfAuthority} exam.</p>
            </div>

            <div className="flex justify-center">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                  <circle 
                    cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                    strokeDasharray={440} 
                    strokeDashoffset={440 - (440 * (questions.reduce((acc, q, i) => (answers[i] === q.correctAnswer ? acc + 1 : acc), 0) / questions.length))} 
                    strokeLinecap="round" 
                    className="text-[#1e3a5f]" 
                  />
                </svg>
                <span className="absolute text-3xl font-bold">
                  {Math.round((questions.reduce((acc, q, i) => (answers[i] === q.correctAnswer ? acc + 1 : acc), 0) / questions.length) * 100)}%
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={i} className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-start gap-3">
                    {answers[i] === q.correctAnswer ? <CheckCircle2 className="text-green-500 shrink-0" size={20} /> : <XCircle className="text-red-500 shrink-0" size={20} />}
                    <div>
                      <p className="text-sm font-bold text-gray-900">{q.question}</p>
                      <p className="text-xs text-gray-500 mt-1">Your answer: {q.options[answers[i]] || 'Skipped'}</p>
                      <p className="text-xs font-bold text-green-600 mt-1">Correct: {q.options[q.correctAnswer]}</p>
                      <p className="text-xs text-gray-400 mt-2 italic">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                setAnswers({})
                setIsSubmitted(false)
                setCurrentQuestionIndex(0)
              }}
              className="w-full py-4 bg-[#1e3a5f] text-white rounded-2xl font-bold hover:bg-[#2d4a73] transition-all"
            >
              Retake Exam
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
