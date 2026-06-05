"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle2, Zap, ShieldCheck, ArrowRight } from 'lucide-react'

const PLANS = [
  { 
    name: 'Standard', 
    price: '199', 
    features: ['3 Case Studies/mo', 'Basic CRM', 'Wealth Gap Tool', 'Email Support'],
    color: 'text-slate-600', 
    bg: 'bg-white/50',
    border: 'border-slate-200'
  },
  { 
    name: 'Professional', 
    price: '499', 
    features: ['Unlimited Case Studies', 'Advanced CRM', 'Stress Tester', 'Priority Support'],
    color: 'text-navy-900', 
    bg: 'bg-white shadow-2xl',
    border: 'border-gold-500 ring-4 ring-gold-500/10',
    highlight: true 
  },
  { 
    name: 'Platinum', 
    price: '999', 
    features: ['Full White-Labeling', 'Agency Command Center', 'AI Opportunity Hub', 'Dedicated Strategist'],
    color: 'text-gold-600', 
    bg: 'bg-gold-50/50',
    border: 'border-gold-200'
  },
]

export default function PricingPage() {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (planName: string) => {
    setLoading(true)
    setTimeout(() => {
      alert(`Redirecting to Stripe for ${planName} subscription...`)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 rounded-full text-sm font-bold mb-6"
          >
            Elite Pricing
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-navy-900"
          >
            Choose Your <span className="text-gold-600">Edge</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            Scale your production with the most powerful AI toolset in the financial services industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-3xl border-2 transition-all flex flex-col ${plan.bg} ${plan.border}`}
            >
              <div className="mb-8 text-center">
                <h3 className={`text-2xl font-bold mb-2 ${plan.color}`}>{plan.name}</h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-5xl font-black text-navy-900">${plan.price}</span>
                  <span className="text-slate-500 font-medium">/mo</span>
                </div>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSubscribe(plan.name)}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.highlight 
                  ? 'bg-navy-900 text-white hover:bg-navy-800 shadow-lg shadow-navy-900/20' 
                  : 'bg-white text-navy-900 border border-slate-200 hover:border-gold-500'
                }`}
              >
                {loading ? 'Processing...' : 'Get Started'} <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 bg-navy-900 text-white p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm uppercase mb-2">
              <Zap className="w-4 h-4" /> Enterprise & Agency
            </div>
            <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-slate-400 leading-relaxed">
              We offer custom deployment for large agencies and institutional firms. Get a tailored package with dedicated onboarding and custom AI training.
            </p>
          </div>
          <button className="relative z-10 px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-2xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20">
            Contact Enterprise Sales
          </button>
        </motion.div>
      </div>
    </div>
  )
}


  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 rounded-full text-sm font-bold mb-6"
          >
            Elite Pricing
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-navy-900"
          >
            Choose Your <span className="text-gold-600">Edge</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            Scale your production with the most powerful AI toolset in the financial services industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-3xl border-2 transition-all flex flex-col ${plan.bg} ${plan.border}`}
            >
              <div className="mb-8 text-center">
                <h3 className={`text-2xl font-bold mb-2 ${plan.color}`}>{plan.name}</h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-5xl font-black text-navy-900">${plan.price}</span>
                  <span className="text-slate-500 font-medium">/mo</span>
                </div>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSubscribe(plan.name)}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.highlight 
                  ? 'bg-navy-900 text-white hover:bg-navy-800 shadow-lg shadow-navy-900/20' 
                  : 'bg-white text-navy-900 border border-slate-200 hover:border-gold-500'
                }`}
              >
                {loading ? 'Processing...' : 'Get Started'} <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 bg-navy-900 text-white p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm uppercase mb-2">
              <Zap className="w-4 h-4" /> Enterprise & Agency
            </div>
            <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-slate-400 leading-relaxed">
              We offer custom deployment for large agencies and institutional firms. Get a tailored package with dedicated onboarding and custom AI training.
            </p>
          </div>
          <button className="relative z-10 px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-2xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20">
            Contact Enterprise Sales
          </button>
        </motion.div>
      </div>
    </div>
  )
}


  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 rounded-full text-sm font-bold mb-6"
          >
            Elite Pricing
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-navy-900"
          >
            Choose Your <span className="text-gold-600">Edge</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            Scale your production with the most powerful AI toolset in the financial services industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-3xl border-2 transition-all flex flex-col ${plan.bg} ${plan.border}`}
            >
              <div className="mb-8 text-center">
                <h3 className={`text-2xl font-bold mb-2 ${plan.color}`}>{plan.name}</h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-5xl font-black text-navy-900">${plan.price}</span>
                  <span className="text-slate-500 font-medium">/mo</span>
                </div>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSubscribe(plan.name)}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.highlight 
                  ? 'bg-navy-900 text-white hover:bg-navy-800 shadow-lg shadow-navy-900/20' 
                  : 'bg-white text-navy-900 border border-slate-200 hover:border-gold-500'
                }`}
              >
                {loading ? 'Processing...' : 'Get Started'} <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 bg-navy-900 text-white p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm uppercase mb-2">
              <Zap className="w-4 h-4" /> Enterprise & Agency
            </div>
            <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-slate-400 leading-relaxed">
              We offer custom deployment for large agencies and institutional firms. Get a tailored package with dedicated onboarding and custom AI training.
            </p>
          </div>
          <button className="relative z-10 px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-2xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20">
            Contact Enterprise Sales
          </button>
        </motion.div>
      </div>
    </div>
  )
}


  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-navy-900">Choose Your <span className="text-gold-600">Edge</span></h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Scale your production with the most powerful AI toolset in the financial services industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col ${plan.bg}`}
            >
              <div className="mb-8 text-center">
                <h3 className={`text-2xl font-bold mb-2 ${plan.color}`}>{plan.name}</h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-black text-navy-900">${plan.price}</span>
                  <span className="text-slate-500 font-medium">/mo</span>
                </div>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSubscribe(plan.name)}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.highlight 
                  ? 'bg-navy-900 text-white hover:bg-navy-800 shadow-lg shadow-navy-900/20' 
                  : 'bg-white text-navy-900 border border-slate-200 hover:border-gold-500'
                }`}
              >
                {loading ? 'Processing...' : 'Get Started'} <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-navy-900 text-white p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm uppercase mb-2">
              <Zap className="w-4 h-4" /> Enterprise & Agency
            </div>
            <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-slate-400 leading-relaxed">
              We offer custom deployment for large agencies and institutional firms. Get a tailored package with dedicated onboarding and custom AI training.
            </p>
          </div>
          <button className="relative z-10 px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-2xl hover:bg-gold-400 transition-all">
            Contact Enterprise Sales
          </button>
        </div>
      </div>
    </div>
  )
}
