'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const serviceGroups = [
  {
    title: 'Estate & Legacy Planning',
    icon: '📜',
    description: 'Preserving your legacy through strategic planning, wills, trusts, and generational transfer.',
    items: ['Wills & Living Trusts', 'Power of Attorney', 'Healthcare Directives', 'Probate Avoidance', 'Charitable Giving', 'Family Governance'],
  },
  {
    title: 'Tax Optimization',
    icon: '📉',
    description: 'Strategic tax planning to minimize liabilities and maximize after-tax returns.',
    items: ['Tax-Loss Harvesting', 'Qualified Contribution Strategies', 'Inheritance Tax Planning', 'Corporate Tax Strategy', 'Multi-State Tax Coordination', 'Roth Conversions'],
  },
  {
    title: 'Full-Spectrum Advising',
    icon: '🌟',
    description: 'A single-point-of-contact approach integrating banking, insurance, tax, and investments.',
    items: ['Holistic Wealth Roadmap', 'Quarterly Strategy Reviews', 'Family Office Services', 'Integrated Risk Management', 'Cash Flow Optimization', 'Legacy Blueprint'],
  },
  {
    title: 'Banking Solutions',
    icon: '💳',

    description: 'Strategic banking partnerships and advisory services for optimal liquidity and capital management.',
    items: ['Private Banking', 'Treasury Management', 'Commercial Loans', 'Mortgage Advisory', 'High-Yield Savings', 'Custom Credit Facilities'],
  },
  {
    title: 'Insurance Solutions',
    icon: '🛡️',

    description: 'Every type of insurance — term life, whole life, universal life, variable life, final expense, mortgage protection, and more.',
    items: ['Term Life Insurance', 'Whole Life Insurance', 'Universal Life Insurance', 'Variable Life Insurance', 'Final Expense', 'Mortgage Protection', 'Disability Insurance', 'Long-Term Care'],
  },
  {
    title: 'Securities & Fixed Income',
    icon: '📈',
    description: 'Full-service securities and fixed income solutions for individuals and institutions.',
    items: ['Fixed Income Wholesaling', 'Corporate & Municipal Bonds', 'Treasuries & Government Securities', 'Structured Products', 'CDs & Money Markets', 'Alternative Investments'],
  },
  {
    title: 'Annuities & Retirement',
    icon: '🏦',
    description: 'Comprehensive annuity solutions and retirement income planning through wholesale distribution.',
    items: ['Fixed Annuities', 'Variable Annuities', 'Indexed Annuities', 'Immediate Annuities', 'Qualified & Non-Qualified', 'Annuity Wholesaling'],
  },
  {
    title: 'Financial Planning',
    icon: '📋',
    description: 'Holistic financial planning that integrates every aspect of your financial life.',
    items: ['Retirement Planning', 'Estate Planning', 'Tax-Efficient Strategies', 'Education Funding', 'Business Succession', 'Cash Flow Analysis'],
  },
  {
    title: 'Wealth Management',
    icon: '💎',
    description: 'Institutional-grade wealth management for individuals, families, and businesses.',
    items: ['Portfolio Management', 'Asset Allocation', 'Risk Management', 'Generational Wealth', 'Philanthropic Planning', 'Family Office Services'],
  },
  {
    title: 'Wholesale Distribution',
    icon: '🤝',
    description: 'Fixed income and annuity wholesale distribution to financial advisors and institutions.',
    items: ['Insurance Product Wholesaling', 'Fixed Income Distribution', 'Advisor Support & Training', 'Marketing & Sales Support', 'Back Office Solutions', 'Compliance Assistance'],
  },
]

export default function ServicesPage() {
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
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--color-muted)]">
              From insurance to securities, annuities to wealth management — we provide comprehensive 
              financial solutions for individuals, families, and institutions. We also offer wholesale 
              distribution for advisors and firms.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {serviceGroups.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{group.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[var(--color-primary)]">{group.title}</h2>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">{group.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-full bg-[var(--color-primary)]/5 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                          {item}
                        </span>
                      ))}
                    </div>
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
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Want to Wholesale Our Products?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              We provide back-office support, compliance assistance, and competitive commission structures 
              for independent financial advisors and wholesalers.
            </p>
            <Link
              href="/careers"
              className="mt-6 inline-flex items-center gap-2 rounded-lg gradient-accent px-6 py-3 text-sm font-medium text-[var(--color-primary)] transition-all hover:opacity-90"
            >
              Join as a 1099 Partner
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
