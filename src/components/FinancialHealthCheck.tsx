'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FinancialHealthCheck() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '', email: '', age: '', savings: '', debt: '', income: '', goals: 'retirement'
  })
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const calculateScore = () => {
    let score = 20
    const savings = parseInt(formData.savings) || 0
    const debt = parseInt(formData.debt) || 0
    const income = parseInt(formData.income) || 0

    // Savings vs Income Ratio (Ideally 20%+)
    if (savings > 10000) score += 20
    if (savings > 50000) score += 10

    // Debt vs Income Ratio (Low debt = high score)
    if (debt < 5000) score += 25
    else if (debt < 25000) score += 15

    // Income Level
    if (income > 100000) score += 15
    else if (income > 50000) score += 10

    return Math.min(score, 100)
  }

  const getFeedback = (score: number) => {
    if (score >= 80) return { text: 'Elite', color: 'text-green-600', desc: 'You have a very strong foundation. We can focus on advanced tax optimization and estate legacy.' }
    if (score >= 50) return { text: 'Stable', color: 'text-yellow-600', desc: 'You are doing well, but there are gaps in your protection and growth strategies.' }
    return { text: 'At Risk', color: 'text-red-600', desc: 'Your current financial structure is vulnerable. Immediate optimization is recommended.' }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'health-check-tool',
          status: 'new',
          interest: ['Financial Planning', 'General Inquiry'],
          value: 0,
        }),
      })
      setResult(calculateScore())
      setStep(3)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-[#1e3a5f] p-8 text-center text-white">
            <h2 className="text-3xl font-bold">Free Financial Health Check-up</h2>
            <p className="mt-2 text-white/70">Get your personalized Wealth Score and a custom gap analysis.</p>
          </div>
          
          <div className="p-8">
            {step === 1 && (
              <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)} className="w-full py-3 bg-[#1e3a5f] text-white rounded-xl font-bold hover:bg-[#2d5a8e] transition-all">Next Step →</button>
              </motion.form>
            )}
            
            {step === 2 && (
              <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Savings ($)</label>
                    <input type="number" required value={formData.savings} onChange={e => setFormData({...formData, savings: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Debt ($)</label>
                    <input type="number" required value={formData.debt} onChange={e => setFormData({...formData, debt: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Household Income ($)</label>
                    <input type="number" required value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-600">Back</button>
                  <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#1e3a5f] text-white rounded-xl font-bold hover:bg-[#2d5a8e] disabled:opacity-50">
                    {loading ? 'Calculating...' : 'Get My Score'}
                  </button>
                </div>
              </motion.form>
            )}
            
            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32">
                    <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                    <circle className="text-[#c9a84c]" strokeWidth="10" strokeDasharray={364.4} strokeDashoffset={364.4 * (1 - (result || 0)/100)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                  </svg>
                  <span className="absolute text-3xl font-bold">{result}%</span>
                </div>
                <div>
                  <h3 className={`text-3xl font-bold ${getFeedback(result || 0).color}`}>
                    {getFeedback(result || 0).text}
                  </h3>
                  <p className="mt-2 text-gray-500 max-w-md mx-auto">
                    {getFeedback(result || 0).desc}
                  </p>
                </div>
                <Link href="/contact" className="inline-block px-8 py-3 bg-[#1e3a5f] text-white rounded-xl font-bold hover:bg-[#2d5a8e]">Book Full Consultation</Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
