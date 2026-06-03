'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import LearningModuleCard from '@/components/education/LearningModuleCard'
import { generateStateCourses, LineOfAuthority } from '@/lib/state-insurance-laws'
import StatsCard from '@/components/dashboard/StatsCard'

export default function StateLawsEducationPage() {
  const searchParams = useSearchParams()
  const [selectedState, setSelectedState] = useState<string>('TX')
  const [lineOfAuthority, setLineOfAuthority] = useState<LineOfAuthority>('life')
  const [activeLesson, setActiveLesson] = useState<number | null>(null)

  const courses = generateStateCourses()
  const currentCourse = courses.find(c => c.stateCode === selectedState && c.lineOfAuthority === lineOfAuthority)

  useEffect(() => {
    const state = searchParams.get('state')
    if (state && state.length === 2) setSelectedState(state.toUpperCase())
  }, [searchParams])

  const states = courses.map(c => ({ name: c.state, code: c.stateCode }))
    .filter((v, i, a) => a.findIndex(t => t.code === v.code) === i)

  return (
    <div className="space-y-8 py-8">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">State Life & Health Law Courses</h1>
            <p className="text-gray-500">Comprehensive study guides for state licensing examinations.</p>
          </div>
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
            {(['life', 'health'] as const).map(loa => (
              <button
                key={loa}
                onClick={() => setLineOfAuthority(loa)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                  lineOfAuthority === loa ? 'bg-white text-[#1e3a5f] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {loa === 'life' ? 'Life Insurance' : 'Accident & Health'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Select Jurisdiction</label>
            <div className="h-[600px] overflow-y-auto pr-2 space-y-1 custom-scrollbar">
              {states.map(state => (
                <button
                  key={state.code}
                  onClick={() => setSelectedState(state.code)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    selectedState === state.code 
                      ? 'bg-[#1e3a5f] text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                  }`}
                >
                  {state.name} ({state.code})
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {currentCourse ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{currentCourse.title}</h2>
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase">
                    Active Course
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {currentCourse.lessons.map((lesson, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveLesson(i)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        activeLesson === i 
                          ? 'border-[#1e3a5f] bg-[#1e3a5f]/5 shadow-sm' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          activeLesson === i ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {i + 1}
                        </span>
                        <span className={`text-sm font-bold ${activeLesson === i ? 'text-[#1e3a5f]' : 'text-gray-700'}`}>
                          {lesson.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeLesson !== null ? (
                    <motion.div
                      key={activeLesson}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-gray-50 rounded-3xl p-8 border border-gray-200"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {currentCourse.lessons[activeLesson].title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {currentCourse.lessons[activeLesson].content}
                      </p>
                      <div className="mt-8 p-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-400 italic">
                        Disclaimer: Insurance laws change frequently. Always verify current regulations with the {currentCourse.state} Department of Insurance.
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                      <div className="text-4xl">📖</div>
                      <p className="text-gray-500 text-sm">Select a lesson above to start studying {currentCourse.state} laws.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Course data not found for this jurisdiction.
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}</style>
    </div>
  )
}
