'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--color-surface)] to-[var(--color-secondary)]/10 p-12 text-center sm:p-16"
        >
          <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-[var(--color-secondary)]/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-4xl font-bold sm:text-5xl">
              Ready to <span className="gradient-text">Dominate</span> Social Media?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--color-muted)]">
              Let&apos;s craft a strategy that puts your brand at the forefront of every feed.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-8 py-3.5 text-sm font-medium text-white transition-all hover:opacity-90 glow"
              >
                Book a Free Consultation
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-8 py-3.5 text-sm font-medium text-[var(--color-foreground)] backdrop-blur-sm transition-all hover:bg-[var(--color-surface-light)]"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
