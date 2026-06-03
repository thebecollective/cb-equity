'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import StatsCard from '@/components/dashboard/StatsCard'
import { Target, TrendingUp, Zap, DollarSign, FileText, MessageSquare, Star } from 'lucide-react'

export default function SuperCenter() {
  const [target, setTarget] = useState(1000000)
  const [current, setCurrent] = useState(145000)

  const progress = (current / target) * 100

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Millionaire <span className="text-[#c9a84c]">Producer Hub</span></h1>
          <p className="text-gray-500 text-lg">The high-performance engine for elite insurance and wealth production.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Current Goal</p>
            <p className="text-sm font-bold text-gray-900">${target.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => {
              const newGoal = prompt('Enter your new million-dollar target:', target.toString())
              if (newGoal) setTarget(parseInt(newGoal))
            }}
            className="p-2 text-[#1e3a5f] hover:bg-gray-100 rounded-lg transition-colors"
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* The Millionaire Progress Bar */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <Target size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Road to $1M Commissions</h2>
          </div>
          <span className="text-2xl font-black text-[#1e3a5f]">{progress.toFixed(1)}%</span>
        </div>
        <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden p-1 border border-gray-200">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full rounded-full gradient-bg shadow-inner"
          />
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-400">Start: $0</span>
          <span className="text-gray-900 font-bold">Current: ${current.toLocaleString()}</span>
          <span className="text-gray-400">Target: ${target.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: The Closing Room (Scripts & Strategy) */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
            <MessageSquare className="text-[#c9a84c]" size={20} /> The Closing Room
          </h3>
          <div className="space-y-4">
            {[
              { title: 'The High-Net-Worth Opener', desc: 'How to engage clients with $5M+ in assets.', tag: 'Discovery' },
              { title: 'Infinite Banking Pitch', desc: 'Turning life insurance into a personal bank.', tag: 'Strategy' },
              { title: 'The "Gap" Close', desc: 'Showing the client the danger of their current coverage.', tag: 'Closing' },
              { title: 'Handling the "I need to think about it" la', desc: 'Turning hesitation into a decision.', tag: 'Objections' },
            ].map((script, i) => (
              <div key={i} className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-[#c9a84c] transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{script.tag}</span>
                  <TrendingUp size={14} className="text-gray-300 group-hover:text-[#c9a84c] transition-colors" />
                </div>
                <p className="font-bold text-gray-900 mb-1">{script.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{script.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Case Design Studio (High Ticket) */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
            <FileText className="text-[#c9a84c]" size={20} /> Case Design Studio
          </h3>
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Client Asset Level</label>
                <select className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1e3a5f]/20">
                  <option>Mass Affluent ($250k - $1M)</option>
                  <option>HNW ($1M - $10M)</option>
                  <option>UHNW ($10M+)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Primary Objective</label>
                <select className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1e3a5f]/20">
                  <option>Tax-Free Retirement</option>
                  <option>Legacy/Estate Protection</option>
                  <option>Business Continuity</option>
                  <option>Immediate Cash Flow</option>
                </select>
              </div>
            </div>
            <button className="w-full py-3 gradient-bg text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
              <Zap size={18} /> Generate High-Ticket Strategy
            </button>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">Millionaire Tip</p>
              <p className="text-xs text-amber-800 italic">"Focus on the Problem, not the Product. The product is just the vehicle to solve the problem."</p>
            </div>
          </div>
        </div>

        {/* Column 3: Daily Power-Hour (Performance) */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
            <Star className="text-[#c9a84c]" size={20} /> Power-Hour Checklist
          </h3>
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
            {[
              { task: '10 High-Value Reach-outs', icon: '📞' },
              { task: '3 Discovery Call Bookings', icon: '📅' },
              { task: '2 Case Designs Completed', icon: '📐' },
              { task: '1 Referral Request Made', icon: '🔗' },
              { task: 'Review Top 5 Pipeline Leads', icon: '🎯' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#1e3a5f]">{item.task}</span>
                </div>
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#1e3a5f]" />
              </div>
            ))}
            <div className="pt-4">
              <div className="p-4 bg-[#1e3a5f] rounded-2xl text-white text-center">
                <p className="text-xs font-medium text-white/60 mb-1">Daily Momentum</p>
                <p className="text-xl font-black">Stay Hungry. Stay Humble.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
