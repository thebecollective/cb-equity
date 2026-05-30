'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-[var(--color-primary)]/10 blur-3xl animate-pulse-glow" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[var(--color-secondary)]/10 blur-3xl animate-pulse-glow" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-4 py-1.5 text-xs font-medium text-[var(--color-primary)] backdrop-blur-sm">
            Social Media Marketing Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          We Build Brands{' '}
          <span className="gradient-text">That Dominate</span>{' '}
          Social Media
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]"
        >
          Strategy, content, and growth — crafted to turn your brand into a social media powerhouse.
          We don&apos;t just post. We dominate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-8 py-3.5 text-sm font-medium text-white transition-all hover:opacity-90 glow"
          >
            Start Your Campaign
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-8 py-3.5 text-sm font-medium text-[var(--color-foreground)] backdrop-blur-sm transition-all hover:bg-[var(--color-surface-light)]"
          >
            View Our Work
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-[var(--color-muted)]"
        >
          {['500+ Campaigns', '200+ Clients', '10M+ Reach'].map((stat) => (
            <div key={stat} className="text-center">
              <div className="text-2xl font-bold text-[var(--color-foreground)]">
                {stat.split(' ')[0]}
              </div>
              <div className="mt-1">{stat.split(' ').slice(1).join(' ')}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
