"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Sparkles, Download, Plus, CheckCircle2, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react'

export default function AICaseStudyBuilder() {
  const [step, setStep] = useState('input') // 'input' | 'generating' | 'result'
  const [caseData, setCaseData] = useState({
    clientName: '',
    currentWealth: '',
    painPoint: 'Tax Leakage',
    proposedSolution: 'Max-Funded IUL',
    expectedOutcome: '',
    industry: 'Tech Executive',
  })
  const [generatedCase, setGeneratedCase] = useState<any>(null)

  const handleGenerate = async () => {
    setStep('generating')
    try {
      const response = await fetch('/api/ai/generate-case', {
        method: 'POST',
        body: JSON.stringify({ caseData })
      })
      const result = await response.json()
      
      if (result.error && !result.mock) throw new Error(result.error)
      
      setGeneratedCase(result.generatedCase || result)
      setStep('result')
    } catch (e) {
      alert('AI Generation failed. Please check your API keys.')
      setStep('input')
    }
  }

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-600 font-bold text-sm uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" /> EquityOS Premium Feature
          </div>
          <h1 className="text-3xl font-bold text-navy-900">AI Case Study Builder</h1>
          <p className="text-slate-500">Turn raw client data into high-ticket professional proposals in seconds.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all flex items-center gap-2">
            <FileText className="w-4 h-4" /> My Library
          </button>
          <button 
            onClick={() => setStep('input')}
            className="px-4 py-2 bg-navy-900 text-white rounded-xl text-sm font-bold hover:bg-navy-800 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Case
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'input' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Inputs Form */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Client Name / Alias</label>
                  <input 
                    type="text" 
                    value={caseData.clientName}
                    onChange={(e) => setCaseData({...caseData, clientName: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none"
                    placeholder="e.g. The Miller Family"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Industry/Role</label>
                  <input 
                    type="text" 
                    value={caseData.industry}
                    onChange={(e) => setCaseData({...caseData, industry: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none"
                    placeholder="e.g. Surgeon, Tech Founder"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Current Net Worth Range</label>
                  <select 
                    value={caseData.currentWealth}
                    onChange={(e) => setCaseData({...caseData, currentWealth: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none"
                  >
                    <option value="">Select Range</option>
                    <option value="1-5M">$1M - $5M</option>
                    <option value="5-20M">$5M - $20M</option>
                    <option value="20M+">$20M+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Primary Pain Point</label>
                  <select 
                    value={caseData.painPoint}
                    onChange={(e) => setCaseData({...caseData, painPoint: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none"
                  >
                    <option value="Tax Leakage">Tax Leakage</option>
                    <option value="Market Volatility">Market Volatility</option>
                    <option value="Estate Tax">Estate Tax Exposure</option>
                    <option value="Liquidity Gap">Liquidity Gap</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Proposed Solution</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Max-Funded IUL', 'Private Placement Life', 'Family Trust', 'Direct Indexing'].map(sol => (
                    <button 
                      key={sol}
                      onClick={() => setCaseData({...caseData, proposedSolution: sol})}
                      className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                        caseData.proposedSolution === sol 
                        ? 'bg-gold-600 text-white border-gold-600 shadow-md' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-gold-500'
                      }`}
                    >
                      {sol}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Expected Outcome / Goal</label>
                <textarea 
                  value={caseData.expectedOutcome}
                  onChange={(e) => setCaseData({...caseData, expectedOutcome: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none h-24"
                  placeholder="e.g. Create $20k/mo tax-free retirement income while protecting $5M legacy..."
                />
              </div>

              <div className="flex justify-end pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerate}
                  className="px-8 py-4 bg-navy-900 text-white font-bold rounded-2xl flex items-center gap-2 shadow-xl shadow-navy-900/20 hover:bg-navy-800 transition-all"
                >
                  Generate Case Study <Sparkles className="w-5 h-5 text-gold-400" />
                </motion.button>
              </div>
            </div>

            {/* Guide Section */}
            <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200 space-y-6">
              <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
                <CheckCircle2 className="text-gold-600" /> Pro Tips
              </h3>
              <ul className="space-y-4">
                {[
                  { title: 'Specificity Wins', desc: 'The more specific the industry and pain point, the more the AI can tailor the language.' },
                  { title: 'Contrast is Key', desc: 'Ensure the proposed solution clearly solves the selected pain point for a stronger "Before/After" effect.' },
                  { title: 'Focus on Outcomes', desc: 'Describe the goal in terms of lifestyle and legacy, not just percentages.' },
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-gold-600 rounded-full mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-navy-900">{tip.title}</p>
                      <p className="text-xs text-slate-500">{tip.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {step === 'generating' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-32 space-y-6"
          >
            <div className="relative">
              <div className="w-24 h-24 border-4 border-gold-200 border-t-gold-600 rounded-full animate-spin" />
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold-600 w-8 h-8 animate-pulse" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-navy-900 mb-2">Synthesizing Strategic Narrative...</h3>
              <p className="text-slate-500">Analyzing tax codes, risk profiles, and growth projections.</p>
            </div>
          </motion.div>
        )}

        {step === 'result' && generatedCase && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
              {/* Document Header */}
              <div className="bg-navy-900 p-12 text-white relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{generatedCase.title}</h2>
                    <p className="text-gold-400 font-medium uppercase tracking-widest text-sm">Strategic Wealth Blueprint</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase font-bold">Prepared by</p>
                    <p className="text-lg font-bold">CB Equity Strategic Team</p>
                  </div>
                </div>
              </div>

              {/* Document Body */}
              <div className="p-12 space-y-12">
                <section>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Executive Summary</h4>
                  <p className="text-xl text-navy-900 leading-relaxed italic">
                    "{generatedCase.summary}"
                  </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Before */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-red-600 font-bold uppercase text-xs tracking-widest">
                      <TrendingDown className="w-4 h-4" /> Current State (The Risk)
                    </div>
                    <div className="space-y-4">
                      {Object.entries(generatedCase.before).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <span className="text-sm text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-sm font-bold text-slate-700">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* After */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase text-xs tracking-widest">
                      <TrendingUp className="w-4 h-4" /> Future State (The Solution)
                    </div>
                    <div className="space-y-4">
                      {Object.entries(generatedCase.after).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <span className="text-sm text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-sm font-bold text-emerald-700">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-gold-50 p-8 rounded-3xl border border-gold-200">
                  <h4 className="text-xs font-bold text-gold-700 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Projected Financial Alpha
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Object.entries(generatedCase.financialImpact).map(([key, value]) => (
                      <div key={key} className="text-center space-y-1">
                        <p className="text-xs text-slate-500 uppercase font-medium">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-2xl font-black text-navy-900">{value as string}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Document Footer */}
              <div className="p-8 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="text-gold-600 w-6 h-6" />
                  <span className="text-xs text-slate-500 font-medium italic">Proprietary Strategy of CB Equity © 2026</span>
                </div>
                <button className="px-6 py-3 bg-navy-900 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-navy-800 transition-all">
                  <Download className="w-4 h-4" /> Export as PDF
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => setStep('input')}
                className="px-8 py-3 text-slate-500 font-bold rounded-xl hover:bg-slate-100 transition-all"
              >
                Create Another Case
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TrendingDown(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 12-7-7-7 7"/><path d="M12 5v14"/></svg>
  )
}
