'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'The level of detail in our retirement plan was eye-opening. Brooke and Connor helped us realize we could retire two years earlier than planned.',
    author: 'Marcus Thorne',
    role: 'Retired Executive',
    rating: 5,
    type: 'client',
  },
  {
    quote: 'Finding a firm that handles everything from life insurance to savings for our kids was a relief. The process was seamless and transparent.',
    author: 'Sarah & David L.',
    role: 'Parents',
    rating: 5,
    type: 'client',
  },
  {
    quote: 'Their succession planning strategy saved my business during a critical transition. Professional, sharp, and truly invested in my success.',
    author: 'Elena Rossi',
    role: 'Boutique Owner',
    rating: 5,
    type: 'client',
  },
  {
    quote: 'I trust CB Equity with my highest-value clients. The reciprocity is great, and my clients always come back thanking me for the referral.',
    author: 'Jordan Smith',
    role: 'Luxury RE Broker',
    rating: 5,
    type: 'partner',
  },
  {
    quote: 'Coordination between tax and financial planning is where most firms fail. CB Equity gets it right. My clients\' portfolios are now perfectly optimized.',
    author: 'Linda Zhang',
    role: 'CPA',
    rating: 5,
    type: 'partner',
  },
  {
    quote: 'Their approach to estate planning liquidity is institutional grade. A reliable partner for my high-net-worth clients\' legal needs.',
    author: 'Robert Vance',
    role: 'Estate Attorney',
    rating: 5,
    type: 'partner',
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-4 py-1.5 text-xs font-medium text-[var(--color-primary)]">
            Client & Partner Feedback
          </span>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Trusted by <span className="gradient-text">Families & Professionals</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border border-[var(--color-border)] p-8 transition-all hover:shadow-lg ${
                t.type === 'partner' ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-[var(--color-primary)]">★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-muted)] italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                  t.type === 'partner' ? 'bg-gradient-to-br from-gray-600 to-gray-800' : 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]'
                }`}>
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.author}</div>
                  <div className="text-xs text-[var(--color-muted)]">{t.role} {t.type === 'partner' ? ' (Strategic Partner)' : ''}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
