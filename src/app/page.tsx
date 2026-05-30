'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Testimonials from '@/components/Testimonials'
import FinancialHealthCheck from '@/components/FinancialHealthCheck'
import CaseStudies from '@/components/CaseStudies'




function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden hero-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-[var(--color-background)]" />
      <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[var(--color-primary)]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="section-label">CB Equity Financial Advisory</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]"
        >
          Your Financial Future,{' '}
          <span className="gradient-text">Built With Integrity</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]"
        >
          Brooke Adams & Connor Savenas deliver institutional-grade financial planning, 
          every type of insurance, securities, fixed income, annuities, and wealth management — 
          for individuals, families, and independent advisors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/contact" className="rounded-xl gradient-bg px-8 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 glow">
            Schedule a Consultation
          </Link>
          <Link href="/services" className="rounded-xl border border-[var(--color-border)] bg-white px-8 py-3.5 text-sm font-semibold text-[var(--color-primary)] transition-all hover:bg-[var(--color-surface-alt)]">
            Our Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function TrustBar() {
  const stats = [
    { num: '7+', label: 'Product Lines' },
    { num: '50+', label: 'Insurance Carriers' },
    { num: '15+', label: 'College Partners' },
    { num: '100%', label: 'Commission to You' },
  ]
  return (
    <section className="trust-bar py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="stat-number text-3xl font-bold text-[var(--color-primary)]">{s.num}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FoundersSection() {
  const founders = [
    {
      name: 'Brooke Adams',
      role: 'Co-Founder & Financial Advisor',
      focus: 'Financial planning, insurance, wealth management, and client education.',
      initials: 'BA',
    },
    {
      name: 'Connor Savenas',
      role: 'Co-Founder & Financial Advisor',
      focus: 'Securities, fixed income, annuity wholesaling, and advisor support.',
      initials: 'CS',
    },
  ]
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="section-label">Leadership</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Meet <span className="gradient-text">Brooke & Connor</span>
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              CB Equity was founded on a simple belief: everyone deserves honest, comprehensive 
              financial guidance without the institutional markup. We cover every aspect of your 
              financial life — and train the next generation of advisors along the way.
            </p>
            <Link href="/about" className="mt-6 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline">
              Learn more about us →
            </Link>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {founders.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-hover rounded-2xl border border-[var(--color-border)] bg-white p-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-bg text-lg font-bold text-white">
                  {f.initials}
                </div>
                <h3 className="mt-4 font-bold text-[var(--color-primary)]">{f.name}</h3>
                <p className="text-xs font-medium text-[var(--color-accent)]">{f.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{f.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl gradient-bg p-12 text-center sm:p-16"
        >
          <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              Planning for retirement, protecting your family, or building wealth — we&apos;re here to help.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="rounded-xl gradient-accent px-8 py-3.5 text-sm font-semibold text-[var(--color-primary)] transition-all hover:opacity-90">
                Free Consultation
              </Link>
              <Link href="/careers" className="rounded-xl border border-white/20 px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10">
                Join Our Team
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const services = [
  { title: 'Financial Planning', desc: 'Comprehensive strategies tailored to your goals.' },
  { title: 'Life Insurance', desc: 'Term, whole, universal, and final expense coverage.' },
  { title: 'Securities & Fixed Income', desc: 'Bonds, treasuries, and wholesale distribution.' },
  { title: 'Annuities', java: 'Retirement income and annuity wholesaling.' },
  { title: 'Banking Solutions', desc: 'Private banking, treasury management, and loan advisory.' },
  { title: 'Wealth Management', desc: 'Holistic wealth building and preservation.' },
  { title: 'Wholesaling', desc: 'Fixed income and annuity distribution to advisors.' },
]

export function ServicesPreview() {
  return (
    <section className="py-24 bg-[var(--color-surface-alt)]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="section-label">What We Do</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Comprehensive <span className="gradient-text">Financial Services</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Every type of insurance, securities, and financial solution — all under one roof.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-hover rounded-xl border border-[var(--color-border)] bg-white p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/5 text-sm font-bold text-[var(--color-primary)]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-4 text-base font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/services" className="text-sm font-semibold text-[var(--color-accent)] hover:underline">
            View all services →
          </Link>
        </div>
      </div>
    </section>
  )
}

function CareersPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="section-label">Careers</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Build Your Career in <span className="gradient-text">Financial Services</span>
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              We&apos;re hiring 1099 sales contractors and paid interns in sales, social media, 
              graphic design, computer science, finance, and accounting. Get hands-on experience, 
              real training, competitive commissions, and college credit — with full back-office support.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Sales', 'Social Media', 'Graphic Design', 'CS', 'Finance', 'Accounting'].map((role) => (
                <span key={role} className="rounded-full bg-[var(--color-primary)]/5 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                  {role}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/careers" className="rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90">
                View Opportunities
              </Link>
              <Link href="/pricing" className="rounded-xl border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-primary)] transition-all hover:bg-[var(--color-surface-alt)]">
                Compensation Guide
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            {[
              { num: '50–110%', label: 'Insurance Commission' },
              { num: '100%', label: 'Remote Flexibility' },
              { num: '$5K+', label: 'Avg Monthly Commission' },
              { num: '15+', label: 'College Partners' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-white p-6 text-center">
                <div className="stat-number text-2xl font-bold text-[var(--color-primary)]">{stat.num}</div>
                <div className="mt-1 text-xs text-[var(--color-muted)]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function EducationPreview() {
  const highlights = [
    { title: 'AI Sales Coach', desc: 'Practice objections with AI trained on our methods', badge: 'AI' },
    { title: 'Insurance Track', desc: '12 modules from fundamentals to case design', badge: '12' },
    { title: 'Exam Prep Tutor', desc: 'Adaptive practice for licensing exams', badge: 'AI' },
    { title: 'By Major', desc: '7 discipline tracks with college credit', badge: '15+' },
  ]
  return (
    <section className="py-24 bg-[var(--color-surface-alt)]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="section-label">Education</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Sleek Learning <span className="gradient-text">Modules</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            AI-powered courses, practice tests, and major-specific tracks — built for interns and 1099 partners.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <Link key={item.title} href="/education" className="card-hover group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-6">
              {item.badge === 'AI' && <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary-light)]" />}
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                item.badge === 'AI' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-[var(--color-surface-alt)] text-[var(--color-muted)]'
              }`}>{item.badge}</span>
              <h3 className="mt-3 text-base font-bold group-hover:text-[var(--color-primary)]">{item.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{item.desc}</p>
            </Link>
          ))}
        </motion.div>
        <div className="mt-8 text-center">
          <Link href="/education" className="text-sm font-semibold text-[var(--color-accent)] hover:underline">
            Explore all 42+ modules →
          </Link>
        </div>
      </div>
    </section>
  )
}

function ReferralPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="section-label">Partners</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Referral Partnerships with <span className="gradient-text">Agents, CPAs & Attorneys</span>
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              We refer clients to you for real estate; you refer clients to us for financial 
              advisory and wealth management. A seamless, reciprocal partnership that grows both practices.
            </p>
            <Link href="/referrals" className="mt-6 inline-flex rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90">
              Join the Program
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            {[
              { role: 'Real Estate Agents', desc: 'We send clients for homes; you send clients for financial planning' },
              { role: 'CPAs', desc: 'Tax expertise meets financial strategy — mutual referrals' },
              { role: 'Attorneys', desc: 'Estate planning and legal referrals in both directions' },
            ].map((p) => (
              <div key={p.role} className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-sm font-bold text-[var(--color-accent)]">
                  {p.role.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{p.role}</h3>
                  <p className="text-sm text-[var(--color-muted)]">{p.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ToolsPreview() {
  return (
    <section className="py-24 bg-[var(--color-surface-alt)]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="section-label">Platform</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Advisor & Client <span className="gradient-text">Tools</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-muted)]">
            CRM, financial planning tools, live market data, custom ETF builder, AI assistant, 
            and proprietary insurance leads — all in one portal.
          </p>
        </motion.div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {['eMoney & Balance Sheet', 'Live Stock News', 'Custom ETF Builder', 'AI Training Bot'].map((tool) => (
            <div key={tool} className="rounded-xl border border-[var(--color-border)] bg-white p-5 text-center">
              <p className="text-sm font-semibold text-[var(--color-primary)]">{tool}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/login" className="rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90">
            Access Portal
          </Link>
        </div>
      </div>
    </section>
  )
}

function SaaSPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="section-label">Technology</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Scale Your Practice with <span className="gradient-text">EquityOS</span>
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Stop juggling five different apps. EquityOS is the first all-in-one operating system 
              specifically built for independent advisors. From lead capture to commission 
              tracking and AI-powered client planning — everything is in one place.
            </p>
            <div className="mt-8 space-y-4">
              {['Automated Lead Generation', 'AI-Powered Client Analysis', 'Integrated Commission Ledger', 'White-Labeled Client Portal'].map(feat => (
                <div key={feat} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="text-green-500">✓</span> {feat}
                </div>
              ))}
            </div>
            <Link href="/saas" className="mt la-8 inline-block rounded-xl gradient-bg px-8 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 glow">
              Explore EquityOS →
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="relative rounded-3xl border border-[var(--color-border)] bg-gray-50 p-4 shadow-2xl"
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">EquityOS Dashboard</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500">Monthly Revenue</p>
                  <p className="text-xl font-bold text-green-600">$14,200</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500">Conversion Rate</p>
                  <p className="text-xl font-bold text-blue-600">28%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1e3a5f] w-3/4" />
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#c9a84c] w-1/2" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FoundersSection />
      <FinancialHealthCheck />
      <CaseStudies />
      <Testimonials />
      <ServicesPreview />
      <ToolsPreview />
      <CareersPreview />
      <EducationPreview />
      <ReferralPreview />
      <CTASection />
    </>
  )
}

