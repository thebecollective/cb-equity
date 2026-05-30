'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import LearningModuleCard from '@/components/education/LearningModuleCard'
import {
  tracks,
  aiModules,
  catalogModules,
  majorTracks,
  resources,
  filterModules,
  type TrackId,
} from '@/lib/education-data'

const stats = [
  { value: '42+', label: 'Learning Modules' },
  { value: '8', label: 'AI-Powered Courses' },
  { value: '150+', label: 'Practice Questions' },
  { value: '15+', label: 'College Partners' },
]

export default function EducationPage() {
  const [activeTrack, setActiveTrack] = useState<TrackId>('all')

  const displayedModules =
    activeTrack === 'majors'
      ? []
      : activeTrack === 'ai'
        ? aiModules
        : activeTrack === 'all'
          ? [...aiModules.slice(0, 4), ...catalogModules.slice(0, 8)]
          : filterModules(activeTrack)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 edu-hero-mesh">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="section-label">Education Center</span>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Learn. Practice. <span className="gradient-text">Excel.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
              Sleek learning paths for insurance, financial advising, wholesaling, and business — 
              plus AI-powered modules trained on Brooke & Connor&apos;s approach. Built for interns, 
              1099 partners, and career builders.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="rounded-xl gradient-bg px-8 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 glow"
              >
                Start Learning — Portal Login
              </Link>
              <Link
                href="/careers"
                className="rounded-xl border border-[var(--color-border)] bg-white px-8 py-3.5 text-sm font-semibold text-[var(--color-primary)] transition-all hover:bg-[var(--color-surface-alt)]"
              >
                Internship Programs
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[var(--color-border)]/80 bg-white/80 px-4 py-5 text-center backdrop-blur-sm"
              >
                <div className="stat-number text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-[var(--color-muted)]">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Learning — Featured */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[#2d4a73] text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </span>
                <span className="section-label">AI-Powered</span>
              </div>
              <h2 className="mt-3 text-3xl font-bold">
                AI Learning <span className="gradient-text">Modules</span>
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--color-muted)]">
                Practice sales, analyze markets, and prep for exams with AI trained on our financial philosophy — available in the portal.
              </p>
            </div>
            <Link href="/login" className="text-sm font-semibold text-[var(--color-accent)] hover:underline shrink-0">
              Access all AI modules →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aiModules.map((mod, i) => (
              <div key={mod.id} className={i === 0 ? 'sm:col-span-2' : ''}>
                <LearningModuleCard
                  module={mod}
                  index={i}
                  featured={i === 0}
                  onClick={() => window.location.href = '/login'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track filter + catalog */}
      <section className="pb-20 bg-[var(--color-surface-alt)]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Browse All Modules</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Filter by track to find courses, workshops, and resources.</p>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={`track-pill shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                  activeTrack === track.id
                    ? 'track-pill-active'
                    : 'bg-white text-[var(--color-muted)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:text-[var(--color-primary)]'
                }`}
              >
                {track.label}
                <span className={`ml-1.5 text-xs ${activeTrack === track.id ? 'text-white/70' : 'text-[var(--color-muted)]'}`}>
                  {track.count}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTrack === 'majors' ? (
              <motion.div
                key="majors"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {majorTracks.map((m, i) => (
                  <motion.div
                    key={m.major}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`card-hover group rounded-2xl border border-[var(--color-border)] bg-gradient-to-br ${m.color} to-white p-6`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-[var(--color-primary)]">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                      </svg>
                    </div>
                    <h3 className="mt-4 font-bold text-[var(--color-primary)]">{m.major}</h3>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">{m.modules} modules · College credit eligible</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
                      View track
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activeTrack}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {displayedModules.map((mod, i) => (
                  <LearningModuleCard
                    key={mod.id}
                    module={mod}
                    index={i}
                    onClick={() => (window.location.href = '/login')}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Resources */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="section-label">Library</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Books, Videos & Practice Tests</h2>
          </div>
          
          <div className="space-y-12">
            {[
              { id: 'video', label: 'Video Series' },
              { id: 'book', label: 'Recommended Books' },
              { id: 'practice', label: 'Practice Tests' }
            ].map(section => (
              <div key={section.id}>
                <h3 className="text-lg font-semibold mb-6 text-[var(--color-primary)] border-b border-[var(--color-border)] pb-2">
                   {section.label}
                </h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {resources.filter(r => r.format === section.id).map((r, i) => (
                    <LearningModuleCard key={r.id} module={r} index={i} onClick={() => (window.location.href = '/login')} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* College credit */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white p-8 sm:p-12"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="section-label">Internships</span>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">College Credit Partnership</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  Learning modules designed for college credit compliance — documented hours, 
                  supervisor evaluations, and practice assessments for communications, marketing, 
                  finance, accounting, business, and computer science.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/contact" className="rounded-xl gradient-bg px-6 py-3 text-center text-sm font-semibold text-white hover:opacity-90">
                  Apply for Credit
                </Link>
                <Link href="/careers" className="rounded-xl border border-[var(--color-border)] px-6 py-3 text-center text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-surface-alt)]">
                  View Internships
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
