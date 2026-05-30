'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CommissionCalculator from '@/components/CommissionCalculator'

const positions = [
  {
    type: '1099 Independent Contractor',
    roles: ['Insurance Sales Agent', 'Securities Sales', 'Financial Services Wholesaler', 'Fixed Income Specialist'],
    description: 'Sell every type of insurance — term, whole, universal, final expense, mortgage protection — plus securities, fixed income, and annuities. We provide back office, compliance support, proprietary leads, CRM access, and full training. You sell; you keep your commissions.',
    commission: {
      'Term & Whole Life': '50–90% of first-year premium',
      'Final Expense / IUL': '60–110% of first-year premium',
      'Fixed & Indexed Annuities': '3–8% of premium',
      'Securities & Fixed Income': '0.5–2% of transaction value',
      'Mutual Funds & ETFs': '0.25–1% of AUM',
      'Wholesale Distribution': 'Negotiable by volume',
    },
    note: 'No salary — 100% commission-based. We invest in your success through leads, tools, and mentorship at no cost to you.',
  },
  {
    type: 'Paid Internships (1099 / Stipend)',
    roles: ['Social Media & Marketing', 'Graphic Design', 'Computer Science / Tech', 'Finance & Accounting', 'Sales & Business Development'],
    description: 'Hands-on experience in financial services with real responsibilities. Build your resume, earn college credit, and get paid for your work — all while learning from Brooke and Connor.',
    pay: {
      'Social Media / Marketing': '$18–25/hr or $800–1,200/mo stipend',
      'Graphic Design': '$20–28/hr or $900–1,400/mo stipend',
      'Computer Science / Tech': '$22–32/hr or $1,000–1,600/mo stipend',
      'Finance & Accounting': '$20–28/hr or $900–1,400/mo stipend',
      'Sales (with commission)': '$15–20/hr base + sales commissions',
    },
    features: ['College credit eligible (15+ partner schools)', 'Flexible remote/hybrid scheduling', 'Real client & project work', 'Resume & portfolio building', '1-on-1 mentorship', 'Path to full 1099 role'],
  },
]

const learningModules = [
  { major: 'Communications', topics: ['Client communication', 'Presentation skills', 'Digital media strategy', 'Public speaking'] },
  { major: 'Marketing', topics: ['Social media marketing', 'Brand strategy', 'Content creation', 'Lead generation', 'Email campaigns'] },
  { major: 'Finance', topics: ['Financial planning', 'Investment analysis', 'Risk management', 'Portfolio theory', 'Retirement planning'] },
  { major: 'Accounting', topics: ['Financial statements', 'Tax fundamentals', 'Audit basics', 'Managerial accounting', 'QuickBooks'] },
  { major: 'Business', topics: ['Entrepreneurship', 'Business law', 'Operations', 'Strategy', 'Negotiation'] },
  { major: 'Computer Science', topics: ['Web development', 'Data analysis', 'CRM automation', 'AI & chatbots', 'API integration'] },
  { major: 'Sales', topics: ['Prospecting', 'Needs analysis', 'Objection handling', 'Closing techniques', 'Pipeline management'] },
]

export default function CareersPage() {
  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="section-label">Join Our Team</span>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
              Build Your Career at <span className="gradient-text">CB Equity</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
              Brooke Adams and Connor Savenas are building a team of ambitious 1099 sales professionals 
              and paid interns. We don&apos;t pay salaries to sales contractors — instead we provide 
              back office, leads, CRM, training, and financial advising tools so you can earn 
              unlimited commissions. Interns are paid hourly or by stipend.
            </p>
          </motion.div>
        </div>
      </section>

      {positions.map((group, gi) => (
        <section key={group.type} className="pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.1 }}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-8 sm:p-10"
            >
              <h2 className="text-2xl font-bold text-[var(--color-primary)]">{group.type}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.roles.map((r) => (
                  <span key={r} className="rounded-full bg-[var(--color-primary)]/5 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                    {r}
                  </span>
                ))}
              </div>
              <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{group.description}</p>

              {'note' in group && group.note && (
                <p className="mt-4 rounded-lg border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-4 py-3 text-sm text-[var(--color-primary)]">
                  {group.note}
                </p>
              )}

              {'commission' in group && group.commission && (
                <div className="mt-8">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">Commission Structure</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(group.commission).map(([product, rate]) => (
                      <div key={product} className="rounded-xl bg-[var(--color-surface-alt)] p-4">
                        <div className="text-sm font-medium text-[var(--color-foreground)]">{product}</div>
                        <div className="mt-1 text-lg font-bold text-[var(--color-accent)]">{rate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {'pay' in group && group.pay && (
                <div className="mt-8">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">Intern Compensation</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {Object.entries(group.pay).map(([role, rate]) => (
                      <div key={role} className="rounded-xl bg-[var(--color-surface-alt)] p-4">
                        <div className="text-sm font-medium">{role}</div>
                        <div className="mt-1 text-base font-bold text-[var(--color-accent)]">{rate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {'features' in group && group.features && (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {group.features.map((f) => (
                    <span key={f} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-success)]/10 text-xs text-[var(--color-success)]">✓</span>
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      ))}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <CommissionCalculator />
          </motion.div>
        </div>
      </section>

      <section className="pb-24 bg-[var(--color-surface-alt)]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold">
              Learning Modules by <span className="gradient-text">Major</span>
            </h2>
            <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
              Training modules, practice tests, and college-credit-compliant curriculum across 
              every business discipline — so interns get real value and resume-worthy experience.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {learningModules.map((m) => (
                <div key={m.major} className="card-hover rounded-xl border border-[var(--color-border)] bg-white p-5">
                  <h3 className="font-semibold text-[var(--color-primary)]">{m.major}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {m.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-[var(--color-accent)]/30 bg-white p-8">
              <h3 className="text-lg font-bold text-[var(--color-primary)]">College Credit Pathway</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                Our internship program is structured to meet college credit requirements at partner 
                institutions. We provide documented hours, supervisor evaluations, learning objectives, 
                and practice assessments aligned with communications, marketing, finance, accounting, 
                business, computer science, and sales curricula. A great hands-on experience for your resume.
              </p>
              <Link href="/education" className="mt-4 inline-flex text-sm font-medium text-[var(--color-accent)] hover:underline">
                Browse education modules →
              </Link>
            </div>
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
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Apply?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              No experience required for interns. Sales contractors get full training, leads, and back-office support from day one.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="rounded-lg gradient-accent px-8 py-3.5 text-sm font-semibold text-[var(--color-primary)] transition-all hover:opacity-90">
                Apply Now
              </Link>
              <Link href="/pricing" className="rounded-lg border border-white/20 px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10">
                Full Compensation Guide
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
