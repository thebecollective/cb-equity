'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const projects = [
  {
    title: 'TechVentures Rebrand',
    category: 'Brand Strategy',
    image: 'TV',
    gradient: 'from-purple-600 to-blue-600',
    description: 'Complete social media overhaul resulting in 400% engagement increase.',
  },
  {
    title: 'GrowthLab Campaign',
    category: 'Paid Advertising',
    image: 'GL',
    gradient: 'from-cyan-500 to-teal-600',
    description: 'Multi-platform ad campaign achieving 3.2x ROAS in 60 days.',
  },
  {
    title: 'Bloom Studio Launch',
    category: 'Content Creation',
    image: 'BS',
    gradient: 'from-pink-500 to-rose-600',
    description: 'From zero to 100K followers in 90 days with organic content strategy.',
  },
]

export default function PortfolioGrid() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-4 py-1.5 text-xs font-medium text-[var(--color-primary)]">
            Portfolio
          </span>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Our <span className="gradient-text">Recent Work</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`relative flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                <span className="text-5xl font-bold text-white/20">{project.image}</span>
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium tracking-wider uppercase text-[var(--color-primary)]">
                  {project.category}
                </span>
                <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-secondary)]"
          >
            View Full Portfolio
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
