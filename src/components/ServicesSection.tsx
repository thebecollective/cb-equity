'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    title: 'Social Media Strategy',
    description: 'Data-driven strategies that align with your brand goals and target audience.',
    icon: '🎯',
  },
  {
    title: 'Content Creation',
    description: 'Scroll-stopping visuals, copy, and video that tell your brand story.',
    icon: '✨',
  },
  {
    title: 'Paid Advertising',
    description: 'Targeted ad campaigns optimized for maximum ROI across all platforms.',
    icon: '📈',
  },
  {
    title: 'Community Management',
    description: 'Build and nurture engaged communities that advocate for your brand.',
    icon: '💬',
  },
  {
    title: 'Influencer Marketing',
    description: 'Connect with the right voices to amplify your brand reach authentically.',
    icon: '🌟',
  },
  {
    title: 'Analytics & Reporting',
    description: 'Deep insights and transparent reporting to track what matters.',
    icon: '📊',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-4 py-1.5 text-xs font-medium text-[var(--color-primary)]">
            What We Do
          </span>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Full-Service{' '}
            <span className="gradient-text">Social Media Marketing</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            From strategy to execution, we handle every aspect of your social media presence.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 transition-all hover:border-[var(--color-primary)]/30 hover:glow-sm"
            >
              <span className="text-3xl">{service.icon}</span>
              <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-secondary)]"
          >
            View All Services
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
