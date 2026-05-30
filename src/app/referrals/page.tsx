'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const programs = [
  {
    title: 'Real Estate Agent Partnership',
    icon: '🏠',
    description: 'A reciprocal referral partnership. You refer clients to us for financial advisory, wealth management, and insurance. We refer clients to you for home purchases, rentals, and real estate investments.',
    benefits: [
      'Clients referred to you for real estate transactions',
      'We handle all financial planning and insurance',
      'Co-branded marketing materials',
      'Regular partner events and networking',
      'Transparent tracking and reporting',
    ],
  },
  {
    title: 'CPA Partnership',
    icon: '📊',
    description: 'Tax expertise meets financial strategy. Your clients need financial planning and insurance solutions — refer them to us with confidence.',
    benefits: [
      'Seamless client referrals for financial planning',
      'Insurance solutions for your clients',
      'Retirement and estate planning collaboration',
      'Tax-efficient investment strategies',
      'Joint client seminars and workshops',
    ],
  },
  {
    title: 'Attorney Partnership',
    icon: '⚖️',
    description: 'Legal expertise paired with financial advisory. Refer clients for wealth management, estate planning execution, and insurance needs.',
    benefits: [
      'Estate planning implementation referrals',
      'Trust and insurance solutions for clients',
      'Business succession planning collaboration',
      'Asset protection strategies',
      'Regular CLE-eligible educational events',
    ],
  },
]

export default function ReferralsPage() {
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
              Referral <span className="gradient-text">Partnerships</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--color-muted)]">
              We refer clients to you; you refer clients to us. A mutually beneficial partnership 
              that grows both practices. Built for real estate agents, CPAs, and attorneys.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {programs.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-8 sm:p-10"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{p.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[var(--color-primary)]">{p.title}</h2>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">{p.description}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {p.benefits.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                          <span className="text-[var(--color-success)]">✓</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-2 rounded-lg gradient-bg px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
                    >
                      Become a Partner
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-8"
          >
            <h2 className="text-xl font-bold text-[var(--color-primary)]">Referral Compensation</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                { type: 'Financial Planning Client', amount: '$500 – $2,500' },
                { type: 'Insurance Policy Sold', amount: '$250 – $1,500' },
                { type: 'Real Estate Referral (from us)', amount: 'Reciprocal — no fee' },
              ].map((r) => (
                <div key={r.type} className="rounded-xl bg-white p-4">
                  <div className="text-sm font-medium">{r.type}</div>
                  <div className="mt-1 text-lg font-bold text-[var(--color-accent)]">{r.amount}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              Track all referrals in real time through our partner portal. Partners receive co-branded materials and quarterly reporting.
            </p>
          </motion.div>
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
            <h2 className="text-2xl font-bold text-white sm:text-3xl">How It Works</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { step: '1', title: 'Partner Up', desc: 'Fill out our quick partner application.' },
                { step: '2', title: 'Get Connected', desc: 'We set up your referral tracking and marketing materials.' },
                { step: '3', title: 'Grow Together', desc: 'Send referrals our way, we send them yours.' },
              ].map((s) => (
                <div key={s.step} className="text-white">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
                    {s.step}
                  </div>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
