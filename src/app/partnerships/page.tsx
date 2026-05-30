'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PartnershipsPage() {
  const benefits = [
    {
      title: 'Reciprocal Referrals',
      desc: 'We don\'t just take leads; we send them. We refer our high-net-worth clients to our trusted partners.',
      icon: '🔄',
    },
    {
      title: 'Value-Add for Your Clients',
      desc: 'Offer your clients institutional-grade financial planning as a value-add to your own services.',
      icon: '💎',
    },
    {
      title: 'Seamless Integration',
      desc: 'We provide a dedicated account manager to handle the transition, ensuring your clients are treated with white-glove service.',
      icon: '🤝',
    },
  ]

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-4 py-1.5 text-xs font-medium text-[var(--color-primary)]"
          >
            B2B Strategic Growth
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-4xl font-bold sm:text-6xl"
          >
            Scale Your Practice with <span className="gradient-text">CB Equity</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]"
          >
            We partner with CPAs, Attorneys, and Real Estate Brokers to create a seamless financial ecosystem for our mutual clients.
          </motion.p>
          <Link href="/contact" className="mt-10 inline-block rounded-xl gradient-bg px-8 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 glow">
            Apply for Partnership
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div 
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-8 hover:border-[#c9a84c] transition-colors"
            >
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="text-xl font-bold mb-3">{b.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 rounded-3xl bg-[#1e3a5f] p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Who We Partner With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['CPA Firms', 'Estate Attorneys', 'RE Brokers', 'Payroll Providers'].map(type => (
              <div key={type} className="p-4 rounded-xl bg-white/10 border border-white/10 font-medium">
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
