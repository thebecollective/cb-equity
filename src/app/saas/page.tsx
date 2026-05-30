'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CheckoutModal from '@/components/CheckoutModal'

export default function SaaSPage() {
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null)
  
  const features = [
    { title: 'AI Lead Capture', desc: 'Automated lead magnets and health-check tools that convert visitors into clients.', icon: '🧲' },
    { title: 'Integrated CRM', desc: 'Weighted sales pipelines with automated follow-ups and probability tracking.', icon: '🎯' },
    { title: 'Finance Ledger', desc: 'Full double-entry accounting for your firm, tracking every cent of commission.', icon: '🏦' },
    { title: 'Wholesale Hub', desc: 'Manage B2B relationships and wholesale product distribution seamlessly.', icon: '📦' },
    { title: 'Education Portal', desc: 'Onboard new advisors with built-in learning modules and quiz tracking.', icon: '📚' },
    { title: 'Client Vault', desc: 'Secure, white-labeled portal for clients to view plans and upload documents.', icon: '🔐' },
  ]

  const tiers = [
    { name: 'Starter', price: '$99', desc: 'Perfect for solo advisors starting their practice.', features: ['Basic CRM', '5 Lead Magnets', 'Standard Reports', 'Email Support'], highlighted: false },
    { name: 'Professional', price: '$299', desc: 'For growing firms scaling their lead acquisition.', features: ['Advanced CRM', 'Unlimited Lead Magnets', 'AI Analysis', 'Priority Support', 'Custom Branding'], highlighted: true },
    { name: 'Enterprise', price: 'Custom', desc: 'Full-scale operation for large firms and wholesalers.', features: ['Everything in Pro', 'API Access', 'Dedicated Account Manager', 'Custom Integration', 'Onboarding Training'], highlighted: false },
  ]

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="section-label">The Future of Advising</span>
          <h1 className="mt-4 text-4xl font-bold sm:text-6xl">EquityOS <span className="gradient-text">Practice Accelerator</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
            Stop wasting time on admin. We provide the technology, the leads, and the training. 
            You focus on the clients.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-32">
          {features.map((f, i) => (
            <motion.div 
              key={f.title} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-[var(--color-border)] bg-white hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-[var(--color-muted)]">Choose the plan that fits your current scale.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className={`relative p-8 rounded-3xl border ${tier.highlighted ? 'border-[#c9a84c] shadow-2xl scale-105 bg-white' : 'border-[var(--color-border)] bg-gray-50'} transition-all`}>
              {tier.highlighted && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
              <h3 className="text-xl font-bold text-center mb-2">{tier.name}</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
              <p className="text-sm text-center text-gray-500 mb-8">{tier.desc}</p>
              <ul className="space-y-4 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setCheckoutPlan(tier.name)}
                className={`w-full block text-center py-3 rounded-xl font-bold transition-all ${tier.highlighted ? 'gradient-bg text-white hover:opacity-90' : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-100'}`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
      {checkoutPlan && <CheckoutModal plan={checkoutPlan} onClose={() => setCheckoutPlan(null)} />}
    </div>
  )
}
