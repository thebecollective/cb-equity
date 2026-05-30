'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CommissionCalculator from '@/components/CommissionCalculator'

const compensationTiers = [
  {
    title: '1099 Sales Contractor',
    subtitle: 'Insurance, Securities & Wholesaling',
    highlight: 'Unlimited earning potential',
    items: [
      '50–110% first-year premium on life insurance',
      '3–8% on fixed and indexed annuities',
      '0.5–2% on securities and fixed income transactions',
      'Renewal and trail commissions on ongoing business',
      'Volume bonuses at $100K, $250K, $500K annual production',
      'Referral bonuses: $250–$1,000 per qualified lead converted',
    ],
    cta: 'Join as 1099 Partner',
    href: '/contact',
  },
  {
    title: 'Paid Internships',
    subtitle: 'Social Media, Design, CS, Finance & Sales',
    highlight: 'Hourly pay + college credit',
    featured: true,
    items: [
      '$18–32/hr depending on role and experience',
      'Monthly stipends of $800–1,600 for part-time interns',
      'Sales interns: hourly base + commission on closed deals',
      'College credit at 15+ partner institutions',
      'Documented hours, evaluations, and learning objectives',
      'Direct path to full 1099 contractor role upon graduation',
    ],
    cta: 'Apply for Internship',
    href: '/contact',
  },
  {
    title: 'Referral Partners',
    subtitle: 'Real Estate Agents, CPAs & Attorneys',
    highlight: 'Earn on every referral',
    items: [
      '$500–$2,500 per converted financial planning client',
      '$250–$1,500 per insurance policy sold to your referral',
      'Reciprocal referrals — we send clients your way too',
      'Co-branded marketing materials and partner portal',
      'Real-time referral tracking in our CRM',
      'Quarterly partner appreciation events',
    ],
    cta: 'Become a Partner',
    href: '/referrals',
  },
]

const volumeBonuses = [
  { tier: 'Bronze', production: '$50K–$99K', bonus: '2% production bonus' },
  { tier: 'Silver', production: '$100K–$249K', bonus: '4% production bonus' },
  { tier: 'Gold', production: '$250K–$499K', bonus: '6% production bonus' },
  { tier: 'Platinum', production: '$500K+', bonus: '8% production bonus + priority leads' },
]

export default function CompensationPage() {
  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="section-label">Transparent Compensation</span>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
              How You <span className="gradient-text">Get Paid</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
              Clear commission structures for 1099 contractors, paid internships, and referral partners. 
              No hidden fees — know exactly what you can earn before you start.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {compensationTiers.map((tier, i) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  tier.featured
                    ? 'border-[var(--color-primary)]/30 bg-white glow'
                    : 'border-[var(--color-border)] bg-white'
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-accent px-4 py-1 text-xs font-semibold text-[var(--color-primary)]">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold">{tier.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{tier.subtitle}</p>
                  <p className="mt-3 text-sm font-semibold text-[var(--color-accent)]">{tier.highlight}</p>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[var(--color-muted)]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-success)]/10 text-xs text-[var(--color-success)]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`mt-8 flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                    tier.featured
                      ? 'gradient-bg text-white hover:opacity-90'
                      : 'border border-[var(--color-border)] text-[var(--color-primary)] hover:bg-[var(--color-surface-alt)]'
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold">Volume Bonus Tiers <span className="text-base font-normal text-[var(--color-muted)]">(1099 Sales)</span></h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {volumeBonuses.map((b) => (
                <div key={b.tier} className="rounded-xl border border-[var(--color-border)] bg-white p-5 text-center">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">{b.tier}</div>
                  <div className="mt-2 text-sm font-medium text-[var(--color-primary)]">{b.production}</div>
                  <div className="mt-1 text-sm text-[var(--color-muted)]">{b.bonus}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CommissionCalculator />
        </div>
      </section>
    </>
  )
}
