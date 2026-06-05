"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ShieldCheck, ArrowRight, Lock, Download, Target } from 'lucide-react'
import { useBrand } from '@/context/BrandContext'

export default function ClientBlueprintPage() {
  const { brand } = useBrand()
  
  // In a real app, this would be fetched from /api/blueprints/[id]
  const blueprint = {
    clientName: 'The Miller Family',
    firmName: brand.firmName,
    title: 'Strategic Wealth Optimization Blueprint',
    summary: 'By transitioning from a traditional brokerage-heavy portfolio to a Max-Funded IUL structure, we achieve immediate tax shielding and a guaranteed floor against market volatility.',
    before: {
      taxExposure: 'High',
      riskProfile: 'Exposed to systemic crashes',
      liquidity: 'Tax-restricted',
      gap: 'Significant'
    },
    after: {
      taxExposure: 'Near Zero (Tax-Free)',
      riskProfile: 'Hedged & Protected',
      liquidity: 'High (Tax-Free Access)',
      gap: 'Closed'
    },
    impact: {
      taxSavings: '$42,000 / yr',
      growth: '7-9% Guaranteed Floor',
      legacy: '+$1.2M'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dynamic Header */}
      <header className="bg-navy-900 text-white py-12 px-6 relative overflow-hidden" style={{ backgroundColor: brand.primaryColor }}>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{blueprint.title}</h1>
            <p className="text-gold-400 font-medium uppercase tracking-widest">Prepared for {blueprint.clientName}</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-slate-400 uppercase font-bold">Presented by</p>
            <p className="text-xl font-bold">{blueprint.firmName}</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-16 px-6 space-y-16">
        {/* Summary */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="inline-block p-3 bg-gold-100 text-gold-600 rounded-full mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-navy-900">The Strategic Objective</h2>
          <p className="text-xl text-slate-600 italic leading-relaxed max-w-3xl mx-auto">
            "{blueprint.summary}"
          </p>
        </motion.section>

        {/* The Transformation */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-red-600 font-bold uppercase text-xs tracking-widest">
              <ShieldAlert className="w-4 h-4" /> Current Exposure
            </div>
            <div className="space-y-4">
              {Object.entries(blueprint.before).map(([key, value]) => (
                <div key={key} className="flex justify-between p-4 bg-slate-50 rounded-xl">
                  <span className="text-sm text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-sm font-bold text-slate-700">{value as string}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border-2 border-gold-500 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 bg-gold-500 text-white text-[10px] font-bold uppercase rounded-bl-lg">
              Optimized
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase text-xs tracking-widest">
              <TrendingUp className="w-4 h-4" /> Strategic Future
            </div>
            <div className="space-y-4">
              {Object.entries(blueprint.after).map(([key, value]) => (
                <div key={key} className="flex justify-between p-4 bg-emerald-50 rounded-xl">
                  <span className="text-sm text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-sm font-bold text-emerald-700">{value as string}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Alpha */}
        <section className="bg-navy-900 text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden" style={{ backgroundColor: brand.primaryColor }}>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
          <div className="relative z-10 text-center space-y-8">
            <h3 className="text-2xl font-bold">Projected Financial Alpha</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(blueprint.impact).map(([key, value]) => (
                <div key={key} className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                  <p className="text-xs text-slate-400 uppercase font-medium mb-2">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-3xl font-black text-gold-400">{value as string}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 pt-8">
              <button className="px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-2xl flex items-center gap-2 hover:bg-gold-400 transition-all text-lg">
                Book Implementation Call <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-white/20 transition-all text-lg">
                <Download className="w-5 h-5" /> PDF Copy
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 text-center text-slate-400 text-xs font-medium">
        {brand.isWhiteLabeled ? `${brand.firmName} © 2026` : `Powered by EquityOS for ${brand.firmName} © 2026`}
      </footer>
    </div>
  )
}

function ShieldAlert(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
  )
}
