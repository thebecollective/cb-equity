'use client'

import { motion } from 'framer-motion'
import CTASection from '@/components/CTASection'
import Link from 'next/link'

const founders = [
  {
    name: 'Brooke Adams',
    role: 'Co-Founder, Financial Advisor',
    bio: 'Brooke brings a passion for helping individuals and families achieve financial security. Specializing in comprehensive financial planning, insurance solutions, and wealth management, she works closely with clients to develop strategies that align with their unique goals.',
    initials: 'BA',
    focus: ['Financial Planning', 'Insurance Solutions', 'Wealth Management', 'Client Education'],
  },
  {
    name: 'Connor Savenas',
    role: 'Co-Founder, Financial Advisor',
    bio: 'Connor focuses on securities, fixed income, and annuity wholesaling — bringing institutional-grade investment strategies to individual clients and financial advisors. His background in wholesale distribution helps advisors access the products and support they need.',
    initials: 'CS',
    focus: ['Securities & Fixed Income', 'Annuity Wholesaling', 'Insurance Distribution', 'Advisor Support'],
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-bold sm:text-5xl">
              About <span className="gradient-text">CB Equity</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
              CB Equity Financial Advisory was founded by Brooke Adams and Connor Savenas with a simple 
              mission: provide honest, comprehensive financial guidance without the institutional markup. 
              We believe everyone deserves access to quality financial advice, insurance protection, 
              and investment strategies.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
              From term life to fixed income, annuities to wealth management — we cover every aspect 
              of your financial life. And through our wholesale division, we help other financial 
              professionals access the products and support they need to serve their own clients better.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {founders.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-8 sm:p-10"
            >
              <div className="flex flex-col items-start gap-6 sm:flex-row">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl gradient-bg text-3xl font-bold text-white">
                  {person.initials}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[var(--color-primary)]">{person.name}</h2>
                  <div className="text-sm font-medium text-[var(--color-accent)]">{person.role}</div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{person.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {person.focus.map((f) => (
                      <span key={f} className="rounded-full bg-[var(--color-primary)]/5 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl gradient-bg p-8 text-center sm:p-12"
          >
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Our Approach</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-4">
              {[
                { title: 'Listen First', desc: 'We understand your goals before making recommendations.' },
                { title: 'Educate Always', desc: 'You deserve to understand every product and strategy.' },
                { title: 'Act with Integrity', desc: 'Your best interest is our only interest.' },
                { title: 'Deliver Results', desc: 'Strategies that actually move you toward your goals.' },
              ].map((v) => (
                <div key={v.title} className="text-white">
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{v.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
