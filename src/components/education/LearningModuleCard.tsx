'use client'

import { motion } from 'framer-motion'

export type ModuleFormat = 'course' | 'workshop' | 'video' | 'book' | 'practice' | 'ai'

export interface LearningModule {
  id: string
  title: string
  description: string
  format: ModuleFormat
  lessons?: number
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  progress?: number
  aiPowered?: boolean
  tags?: string[]
}

const formatConfig: Record<ModuleFormat, { label: string; className: string }> = {
  course: { label: 'Course', className: 'bg-[var(--color-primary)]/8 text-[var(--color-primary)]' },
  workshop: { label: 'Workshop', className: 'bg-violet-500/10 text-violet-700' },
  video: { label: 'Video', className: 'bg-rose-500/10 text-rose-700' },
  book: { label: 'Book', className: 'bg-amber-500/10 text-amber-800' },
  practice: { label: 'Practice Test', className: 'bg-emerald-500/10 text-emerald-700' },
  ai: { label: 'AI Module', className: 'bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/15 text-[var(--color-primary)]' },
}

const difficultyConfig = {
  beginner: 'text-emerald-600 bg-emerald-50',
  intermediate: 'text-amber-700 bg-amber-50',
  advanced: 'text-rose-700 bg-rose-50',
}

function ModuleIcon({ format, aiPowered }: { format: ModuleFormat; aiPowered?: boolean }) {
  if (aiPowered || format === 'ai') {
    return (
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#2d4a73] text-white shadow-sm">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] ring-2 ring-white" />
      </div>
    )
  }

  const paths: Record<ModuleFormat, string> = {
    course: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
    workshop: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z',
    video: 'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z',
    book: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
    practice: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    ai: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-surface-alt)] text-[var(--color-primary)]">
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={paths[format]} />
      </svg>
    </div>
  )
}

interface LearningModuleCardProps {
  module: LearningModule
  index?: number
  onClick?: () => void
  featured?: boolean
}

export default function LearningModuleCard({ module, index = 0, onClick, featured }: LearningModuleCardProps) {
  const fmt = formatConfig[module.format]
  const isAi = module.aiPowered || module.format === 'ai'

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      onClick={onClick}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
        featured
          ? 'border-[var(--color-primary)]/20 shadow-lg shadow-[var(--color-primary)]/5 lg:flex-row'
          : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/20 hover:shadow-xl hover:shadow-[var(--color-primary)]/5'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      {isAi && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary-light)]" />
      )}

      <div className={`flex flex-1 flex-col p-6 ${featured ? 'lg:p-8' : ''}`}>
        <div className="flex items-start justify-between gap-4">
          <ModuleIcon format={module.format} aiPowered={module.aiPowered} />
          <div className="flex flex-wrap justify-end gap-1.5">
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${fmt.className}`}>
              {fmt.label}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize ${difficultyConfig[module.difficulty]}`}>
              {module.difficulty}
            </span>
          </div>
        </div>

        <h3 className={`mt-4 font-bold text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-primary)] ${featured ? 'text-xl' : 'text-base'}`}>
          {module.title}
        </h3>
        <p className={`mt-2 flex-1 leading-relaxed text-[var(--color-muted)] ${featured ? 'text-sm' : 'text-xs line-clamp-2'}`}>
          {module.description}
        </p>

        {module.tags && module.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {module.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-[var(--color-surface-alt)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-muted)]">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
          <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {module.duration}
            </span>
            {module.lessons != null && (
              <span>{module.lessons} lessons</span>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100">
            Start
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>

        {module.progress != null && module.progress > 0 && (
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[10px] font-medium text-[var(--color-muted)]">
              <span>Progress</span>
              <span>{module.progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-alt)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transition-all"
                style={{ width: `${module.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.article>
  )
}
