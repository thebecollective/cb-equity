"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ShieldCheck, Zap, ArrowRight, Users, Target, Lock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import ToolsMenu from '@/components/ToolsMenu'

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-navy-900/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md border border-white/40 rounded-full text-sm font-bold text-navy-900 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-gold-600" /> The New Standard in Wealth Engineering
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-navy-900 tracking-tight leading-tight"
          >
            Secure Your <span className="text-gradient">Legacy.</span><br />
            Optimize Your <span className="text-gold-600">Alpha.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            CB Equity blends institutional-grade financial engineering with AI-driven strategy to protect, grow, and transfer generational wealth.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => window.dispatchEvent(new Event('open-booking'))}
              className="w-full sm:w-auto px-8 py-4 bg-navy-900 text-white font-bold rounded-2xl hover:bg-navy-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-navy-900/20 group"
            >
              Calculate Your Gap <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/partners/join" className="w-full sm:w-auto px-8 py-4 bg-white text-navy-900 font-bold rounded-2xl border border-slate-200 hover:border-gold-500 transition-all flex items-center justify-center gap-2">
              Partner With Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- THE ECOSYSTEM (TOOL HUB) --- */}
      <section className="py-24 px-4 bg-white/30">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900">The Intelligence Suite</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Professional-grade tools designed to uncover hidden leaks and protect your portfolio from systemic risk.
            </p>
          </div>
          
          <ToolsMenu />
        </div>
      </section>

      {/* --- TARGET AUDIENCE SECTIONS --- */}
      <section className="py-24 px-4 space-y-32">
        {/* HNW Clients */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-gold-600/20 to-navy-900/20 blur-2xl rounded-3xl" />
            <div className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gold-100 text-gold-600 rounded-2xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900">Private Wealth Protection</h3>
              </div>
              <div className="space-y-4">
                {[
                  'Dynamic Tax-Free Accumulation',
                  'Black Swan Risk Hedging',
                  'Dynastic Legacy Structuring',
                  'Concierge-Level Onboarding'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-4xl font-bold text-navy-900 leading-tight">For High-Net-Worth <br /> Families & Executives</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Your wealth is a tool for freedom, not a source of stress. We replace generic advice with surgical financial engineering, ensuring your legacy is protected from taxes, inflation, and market volatility.
            </p>
            <Link href="/tools/tax-scanner" className="inline-flex items-center gap-2 text-gold-600 font-bold hover:text-gold-700 transition-colors group">
              Scan for Tax Alpha <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Advisors */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <h3 className="text-4xl font-bold text-navy-900 leading-tight">For the <br /> Elite Producer</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Stop fighting for crumbs. Leverage EquityOS to automate your case design, professionalize your presentations, and maximize your contract split.
            </p>
            <Link href="/careers/roi-calculator" className="inline-flex items-center gap-2 text-gold-600 font-bold hover:text-gold-700 transition-colors group">
              Calculate Your ROI <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-4 bg-gradient-to-bl from-navy-900/20 to-gold-600/20 blur-2xl rounded-3xl" />
            <div className="relative bg-navy-900 p-8 rounded-3xl border border-navy-800 shadow-2xl text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/10 text-gold-400 rounded-2xl">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">EquityOS SaaS</h3>
              </div>
              <div className="space-y-4">
                {[
                  'AI Case Study Builder',
                  'Interactive Client Blueprints',
                  'White-Labeled Client Portals',
                  'Agency Command Center'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-gold-500" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto bg-navy-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-navy-800/40 blur-3xl rounded-full" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Ready to Engineer <br /> <span className="text-gold-500">Your Future?</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Whether you are a client seeking sovereignty or an advisor seeking growth, the path starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tools/wealth-gap" className="w-full sm:w-auto px-10 py-4 bg-gold-500 text-navy-900 font-bold rounded-2xl hover:bg-gold-400 transition-all text-lg shadow-lg shadow-gold-500/20">
                Start Your Analysis
              </Link>
              <Link href="/partners/join" className="w-full sm:w-auto px-10 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all text-lg backdrop-blur-md">
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CheckCircle2(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  )
}
