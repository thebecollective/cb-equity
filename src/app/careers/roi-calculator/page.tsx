"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, DollarSign, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ROICalculator() {
  const [production, setProduction] = useState(500000)
  const [currentSplit, setCurrentSplit] = useState(70)
  const [overhead, setOverhead] = useState(20000)
  const [result, setResult] = useState<{ current: number; cbEquity: number; gain: number } | null>(null)

  // CB Equity Competitive Offer: 90% split (Example)
  const CB_EQUITY_SPLIT = 90

  useEffect(() => {
    const currentNet = (production * (currentSplit / 100)) - overhead
    const cbNet = (production * (CB_EQUITY_SPLIT / 100)) - (overhead * 0.5) // Assume CB Equity absorbs some overhead
    setResult({
      current: currentNet,
      cbEquity: cbNet,
      gain: cbNet - currentNet,
    })
  }, [production, currentSplit, overhead])

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-navy-900 mb-4"
          >
            Stop Leaving <span className="text-gold-600">Money on the Table</span>
          </motion.h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Enter your current production and split to see exactly how much more you earn as a CB Equity Partner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200"
          >
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Annual Production ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="number" 
                    value={production}
                    onChange={(e) => setProduction(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all outline-none text-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Contract Split (%)
                </label>
                <div className="relative">
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={currentSplit}
                    onChange={(e) => setCurrentSplit(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-600"
                  />
                  <div className="text-right text-lg font-bold text-gold-600 mt-2">{currentSplit}%</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Annual Overhead Costs ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="number" 
                    value={overhead}
                    onChange={(e) => setOverhead(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all outline-none text-lg font-medium"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-navy-900 text-white p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Decorative background glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
                <TrendingUp className="text-gold-400" /> Your Potential Growth
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-slate-400">Current Net Income</span>
                  <span className="text-xl font-medium">${result?.current.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gold-500/10 rounded-2xl border border-gold-500/20">
                  <span className="text-gold-400 font-semibold">CB Equity Net Income</span>
                  <span className="text-2xl font-bold text-gold-400">${result?.cbEquity.toLocaleString()}</span>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3 text-red-400 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-wider">Annual Loss by Staying</span>
                  </div>
                  <div className="text-5xl font-black text-white">
                    ${result?.gain.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-12 w-full py-4 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-lg"
            >
              Claim Your Increase <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { title: 'Higher Splits', desc: 'Industry-leading compensation models designed for producers.' },
            { title: 'Lower Overhead', desc: 'Leverage our operational infrastructure to cut your costs.' },
            { title: 'Elite Support', desc: 'Direct access to Brooke & Connor’s closing systems.' },
          ].map((prop, i) => (
            <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200">
              <CheckCircle2 className="text-gold-600 w-6 h-6 shrink-0" />
              <div>
                <h4 className="font-bold text-navy-900 mb-1">{prop.title}</h4>
                <p className="text-slate-600 text-sm">{prop.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
