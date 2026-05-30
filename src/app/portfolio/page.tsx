'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const caseStudies = [
  {
    title: 'Retirement Income Plan',
    category: 'Financial Planning',
    client: 'Couple, ages 58 & 56',
    description: 'Integrated annuity ladder, Social Security optimization, and tax-efficient withdrawal strategy to generate $8,200/month in guaranteed retirement income.',
    results: ['$8,200/mo guaranteed income', 'Tax savings of $14K/yr', 'Legacy protection for heirs'],
  },
  {
    title: 'Business Owner Protection',
    category: 'Life Insurance',
    client: 'Small business owner, age 42',
    description: 'Key person insurance and buy-sell funding with indexed universal life, protecting a $2M business and ensuring smooth succession.',
    results: ['$2M key person coverage', 'Buy-sell agreement funded', 'Cash value growth potential'],
  },
  {
    title: 'Fixed Income Portfolio',
    category: 'Securities & Wholesaling',
    client: 'Financial advisor, $15M AUM',
    description: 'Wholesale fixed income distribution providing laddered municipal bonds and corporate notes with competitive yields for advisor clients.',
    results: ['4.8% avg yield', '15+ bond positions', 'Dedicated wholesaler support'],
  },
  {
    title: 'Estate Planning Integration',
    category: 'Wealth Management',
    client: 'High-net-worth family',
    description: 'Coordinated with attorney and CPA partners — trust funding, life insurance for estate liquidity, and charitable giving strategy.',
    results: ['$4M estate tax mitigation', '3-way partner referral', 'Irrevocable trust funded'],
  },
  {
    title: 'First-Time Investor Plan',
    category: 'Wealth Management',
    client: 'Young professional, age 28',
    description: 'Living balance sheet analysis, emergency fund, term life, and automated ETF investing through our custom fund builder.',
    results: ['6-month emergency fund', '$500K term coverage', 'Automated monthly investing'],
  },
  {
    title: 'Real Estate Agent Partnership',
    category: 'Referral Program',
    client: 'Top-producing realtor',
    description: 'Reciprocal referral partnership — realtor sends homebuyers for financial planning; we refer clients needing homes and rentals.',
    results: ['32 referrals in 6 months', '18 conversions', '$48K in partner fees earned'],
  },
]

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="section-label">Client Success</span>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
              Our <span className="gradient-text">Results</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
              Real outcomes for clients, partners, and team members — from retirement planning 
              to wholesale distribution and referral partnerships.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, i) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-hover flex flex-col rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden"
              >
                <div className="gradient-bg px-6 py-5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-accent-light)]">
                    {study.category}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-white">{study.title}</h3>
                  <p className="mt-1 text-xs text-white/60">{study.client}</p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-[var(--color-muted)]">{study.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {study.results.map((r) => (
                      <span key={r} className="rounded-full bg-[var(--color-primary)]/5 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                        {r}
                      </span>
                    ))}
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
            className="rounded-2xl gradient-bg p-8 text-center sm:p-12"
          >
            <h2 className="text-2xl font-bold text-white">Ready for Your Own Success Story?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Whether you&apos;re a client, partner, or future team member — let&apos;s talk about your goals.
            </p>
            <Link href="/contact" className="mt-6 inline-flex rounded-lg gradient-accent px-8 py-3.5 text-sm font-semibold text-[var(--color-primary)] transition-all hover:opacity-90">
              Schedule a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
