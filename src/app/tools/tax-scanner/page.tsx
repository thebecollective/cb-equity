"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Calculator, Zap, ShieldCheck, ArrowRight, Search, AlertTriangle, TrendingUp } from 'lucide-react'

const TAX_BRACKETS = [
  { label: 'Low (<$50k)', rate: 0.12, risk: 'low' },
  { label: 'Mid ($50k - $180k)', rate: 0.24, risk: 'medium' },
  { label: 'High ($180k - $600k)', rate: 0.35, risk: 'high' },
  { label: 'Elite (>$600k)', rate: 0.37, risk: 'critical' },
]

export default function TaxAlphaScanner() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    income: 250000,
    filingStatus: 'single',
    assets: {
      taxable: 500000,
      taxDeferred: 300000,
      taxFree: 50000,
    },
    hasTrust: false,
    hasIUL: false,
  })
  const [analysis, setAnalysis] = useState<{ score: number; leaks: any[] } | null>(null)

  const runScan = () => {
    // Logic for identifying "Tax Leaks" (Alpha Opportunities)
    const leaks = []
    let score = 100

    if (data.income > 180000 && !data.hasIUL) {
      leaks.push({
        title: 'High-Income Tax Leak',
        impact: 'Critical',
        desc: 'Your current income puts you in a high bracket. You are losing significant wealth to annual taxes that could be sheltered in a Max-Funded IUL.',
        benefit: 'Tax-Free Growth & Income',
        scoreLoss: 30,
      })
    }

    if (data.assets.taxable > data.assets.taxFree * 5) {
      leaks.push({
        title: 'Asset Location Imbalance',
        impact: 'Medium',
        desc: 'Too much of your wealth is in taxable brokerage accounts, creating a drag on your long-term net return.',
        benefit: 'Diversified Tax Buckets',
        scoreLoss: 20,
      })
    }

    if (data.income > 500000 && !data.hasTrust) {
      leaks.push({
        title: 'Estate Tax Exposure',
        impact: 'High',
        desc: 'At your wealth level, a lack of structured trusts could result in significant estate tax leakage upon transfer.',
        benefit: 'Generational Wealth Protection',
        scoreLoss: 25,
      })
    }

    const finalScore = Math.max(0, 100 - leaks.reduce((acc, leak) => acc + leak.scoreLoss, 0))
    setAnalysis({ score: finalScore, leaks })
    setStep(3)
  }

  const chartData = [
    { name: 'Taxable', value: data.assets.taxable, color: '#ef4444' },
    { name: 'Tax-Deferred', value: data.assets.taxDeferred, color: '#f97316' },
    { name: 'Tax-Free', value: data.assets.taxFree, color: '#10b981' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 rounded-full text-sm font-bold mb-6 flex items-center gap-2"
          >
            <Search className="w-4 h-4" /> AI-Powered Analysis
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-4">
            Tax <span className="text-gold-600">Alpha</span> Scanner
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            We don't just manage money; we optimize taxes. Scan your current wealth structure to find "tax leaks" and reclaim your Alpha.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Step Indicator */}
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-2 w-16 rounded-full transition-all ${step >= s ? 'bg-gold-500' : 'bg-slate-200'}`} />
            ))}
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
                    <Calculator className="text-gold-600" /> Income & Status
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Annual Household Income ($)</label>
                      <input 
                        type="number" 
                        value={data.income}
                        onChange={(e) => setData({...data, income: Number(e.target.value)})}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all font-bold text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Filing Status</label>
                      <select 
                        value={data.filingStatus}
                        onChange={(e) => setData({...data, filingStatus: e.target.value})}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all font-medium"
                      >
                        <option value="single">Single</option>
                        <option value="married">Married Filing Jointly</option>
                        <option value="head_of_household">Head of Household</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => setStep(2)}
                      className="px-8 py-3 bg-navy-900 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-navy-800 transition-all"
                    >
                      Next Step <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
                    <TrendingUp className="text-gold-600" /> Asset Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-red-500 uppercase mb-1">Taxable Assets ($)</label>
                      <input 
                        type="number" 
                        value={data.assets.taxable}
                        onChange={(e) => setData({...data, assets: {...data.assets, taxable: Number(e.target.value)}})}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all font-bold"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Brokerage, Savings, Cash</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-orange-500 uppercase mb-1">Tax-Deferred ($)</label>
                      <input 
                        type="number" 
                        value={data.assets.taxDeferred}
                        onChange={(e) => setData({...data, assets: {...data.assets, taxDeferred: Number(e.target.value)}})}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">401k, Traditional IRA</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-emerald-500 uppercase mb-1">Tax-Free Assets ($)</label>
                      <input 
                        type="number" 
                        value={data.assets.taxFree}
                        onChange={(e) => setData({...data, assets: {...data.assets, taxFree: Number(e.target.value)}})}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Roth IRA, Life Insurance</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-all">
                      <input type="checkbox" checked={data.hasTrust} onChange={(e) => setData({...data, hasTrust: e.target.checked})} className="w-5 h-5 accent-gold-600" />
                      <span className="text-sm font-medium text-slate-700">I have an established Trust</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-all">
                      <input type="checkbox" checked={data.hasIUL} onChange={(e) => setData({...data, hasIUL: e.target.checked})} className="w-5 h-5 accent-gold-600" />
                      <span className="text-sm font-medium text-slate-700">I have a Max-Funded IUL</span>
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <button onClick={() => setStep(1)} className="px-8 py-3 text-slate-500 font-bold rounded-xl hover:bg-slate-100 transition-all">Back</button>
                    <button 
                      onClick={runScan}
                      className="px-8 py-3 bg-gold-600 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-gold-500 transition-all shadow-lg shadow-gold-600/20"
                    >
                      Scan for Alpha <Zap className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && analysis && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie 
                              data={chartData} 
                              innerRadius={80} 
                              outerRadius={110} 
                              paddingAngle={5} 
                              dataKey="value"
                            >
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-slate-400 text-xs font-bold uppercase">Efficiency Score</span>
                        <span className="text-5xl font-black text-navy-900">{analysis.score}%</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-3xl font-bold text-navy-900">Analysis Complete</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Your current structure is <span className="font-bold text-navy-900">{analysis.score < 70 ? 'inefficient' : 'moderately efficient'}</span>. 
                        We have identified <span className="font-bold text-gold-600">{analysis.leaks.length} primary tax leaks</span> that are eroding your long-term wealth.
                      </p>
                      <div className="p-6 bg-gold-50 border border-gold-200 rounded-2xl flex items-center gap-4">
                        <ShieldCheck className="text-gold-600 w-8 h-8 shrink-0" />
                        <p className="text-sm text-gold-800 font-medium">
                          CB Equity can potentially recover <span className="font-bold">15-30% of your taxable leakage</span> through advanced asset relocation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                      <AlertTriangle className="text-red-500" /> Identified Alpha Opportunities
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysis.leaks.map((leak, i) => (
                        <div key={i} className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-gold-500 transition-all group">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold uppercase px-2 py-1 bg-red-100 text-red-700 rounded-md">
                              {leak.impact} Impact
                            </span>
                            <span className="text-xs text-slate-400 font-medium">Leak Detected</span>
                          </div>
                          <h5 className="font-bold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">{leak.title}</h5>
                          <p className="text-sm text-slate-600 mb-4">{leak.desc}</p>
                          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase">
                            <TrendingUp className="w-3 h-3" /> Solution: {leak.benefit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center pt-8">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-12 py-4 bg-navy-900 text-white font-bold rounded-2xl flex items-center gap-3 text-xl shadow-xl shadow-navy-900/20 hover:bg-navy-800 transition-all"
                    >
                      Fix My Tax Leaks <ArrowRight className="w-6 h-6" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
