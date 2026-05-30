'use client'

import { motion } from 'framer-motion'

interface CaseStudy {
  client: string
  challenge: string
  solution: string
  result: string
  metric: string
  icon: string
}

const caseStudies: CaseStudy[] = [
  {
    client: 'High-Net-Worth Executive',
    challenge: 'Facing a $250k annual tax liability and fragmented investment portfolios across four different firms.',
    solution: 'Implemented a consolidated wealth strategy and a strategic tax-loss harvesting plan.',
    result: 'Reduced annual tax liability by $45k and increased overall portfolio yield by 2.1%.',
    metric: '$45k Saved/Year',
    icon: '📉',
  },
  {
    client: 'Multi-Generational Family',
    challenge: 'Lacked a formal estate plan, risking high probate costs and family disputes over assets.',
    solution: 'Established a series of irrevocable trusts and a comprehensive family governance charter.',
    result: 'Secured a $12M legacy with zero probate risk and a clear 3-generation transfer plan.',
    metric: 'Zero Probate Risk',
    icon: '📜',
  },
  {
    client: 'Small Business Owner',
    challenge: 'Business growth was rapid, but personal wealth was tied up entirely in the company with no exit strategy.',
    solution: 'Developed a key-person insurance strategy and a structured 5-year business succession plan.',
    result: 'Created a guaranteed $3M liquidity event for retirement regardless of market conditions.',
    metric: '$3M Guaranteed',
    icon: '💼',
  },
]

export default function CaseStudies() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Proven Results</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">Real Transformations, <span className="gradient-text">Real Results</span></h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--color-muted)]">
            We don't just plan; we execute. See how our strategic approach has changed the financial trajectories of our clients.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-3xl border border-[var(--color-border)] bg-gray-50 p-8 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-[#c9a84c]/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {study.icon}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-4">{study.client}</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1">The Challenge</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{study.challenge}</p>
                </div>
                
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1e3a5f] mb-1">Our Solution</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{study.solution}</p>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-xs font-bold uppercase tracking-wider text-green-600 mb-1">The Outcome</p>
                  <p className="text-sm font-medium text-gray-900 italic">"{study.result}"</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white rounded-2xl border border-gray-100 text-center shadow-sm">
                <span className="text-2xl font-bold text-[#1e3a5f]">{study.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
