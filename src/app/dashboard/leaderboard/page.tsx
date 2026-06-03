'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import StatsCard from '@/components/dashboard/StatsCard'
import { Trophy, Medal, TrendingUp, DollarSign, Star } from 'lucide-react'

interface Producer {
  id: string
  name: string
  totalCommission: number
  closedCount: number
  conversionRate: string
  rank: number
  avatar: string
}

const TOP_PRODUCERS: Producer[] = [
  { id: '1', name: 'Brooke Adams', totalCommission: 145000, closedCount: 42, conversionRate: '28%', rank: 1, avatar: 'BA' },
  { id: '2', name: 'Connor Savenas', totalCommission: 128000, closedCount: 38, conversionRate: '24%', rank: 2, avatar: 'CS' },
  { id: '3', name: 'Sarah Jenkins', totalCommission: 92000, closedCount: 29, conversionRate: '21%', rank: 3, avatar: 'SJ' },
  { id: '4', name: 'Michael Chen', totalCommission: 74000, closedCount: 22, conversionRate: '18%', rank: 4, avatar: 'MC' },
  { id: '5', name: 'Elena Rodriguez', totalCommission: 61000, closedCount: 19, conversionRate: '15%', rank: 5, avatar: 'ER' },
]

  const BONUS_TIERS = [
    { threshold: 5000, bonus: 500, label: 'Bronze Tier', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { threshold: 15000, bonus: 2500, label: 'Silver Tier', color: 'text-slate-500 bg-slate-50 border-slate-200' },
    { threshold: 30000, bonus: 5000, label: 'Gold Tier', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { threshold: 50000, bonus: 10000, label: 'Platinum Tier', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { threshold: 100000, bonus: 25000, label: 'Diamond Tier', color: 'text-purple-600 bg-purple-50 border-purple-200' },
  ]

export default function LeaderboardPage() {
  const [myCommission, setMyCommission] = useState(145000)

  const calculateCurrentBonus = (comm: number) => {
    const eligibleTiers = BONUS_TIERS.filter(t => comm >= t.threshold)
    return eligibleTiers.length > 0 ? eligibleTiers[eligibleTiers.length - 1] : null
  }

  const currentBonus = calculateCurrentBonus(myCommission)

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Producer Leaderboard</h1>
          <p className="text-gray-500">Real-time rankings and bonus tracking for the elite team.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">My Total</p>
            <p className="text-sm font-bold text-gray-900">${myCommission.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => {
              const val = prompt('Update your current commission total:', myCommission.toString())
              if (val) setMyCommission(parseInt(val))
            }}
            className="p-2 text-[#1e3a5f] hover:bg-gray-100 rounded-lg transition-colors"
          >
            ⚙️
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Trophy className="text-[#c9a84c]" size={20} /> Top Producers
              </h2>
              <span className="text-xs font-medium text-gray-400">Updated Hourly</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Producer</th>
                    <th className="px-6 py-4">Total Comm.</th>
                    <th className="px-6 py-4">Closed</th>
                    <th className="px-6 py-4">Conv. Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {TOP_PRODUCERS.map((p, i) => (
                    <tr key={p.id} className={`group hover:bg-gray-50 transition-colors ${p.rank === 1 ? 'bg-amber-50/30' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            p.rank === 1 ? 'bg-amber-400 text-white' : 
                            p.rank === 2 ? 'bg-slate-300 text-slate-700' : 
                            p.rank === 3 ? 'bg-orange-300 text-orange-800' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {p.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-[#1e3a5f] text-white text-[10px] font-bold flex items-center justify-center">
                            {p.avatar}
                          </div>
                          <span className="font-bold text-gray-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">${p.totalCommission.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-600">{p.closedCount}</td>
                      <td className="px-6 py-4 text-gray-600">{p.conversionRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bonus & Incentives Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign className="text-green-600" size={20} /> Bonus Tracker
            </h2>
            <div className="space-y-4">
              {BONUS_TIERS.map((tier) => (
                <div 
                  key={tier.label} 
                  className={`p-4 rounded-2xl border transition-all ${
                    myCommission >= tier.threshold 
                      ? 'border-[#c9a84c] bg-amber-50/50 ring-1 ring-[#c9a84c]' 
                      : 'border-gray-100 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-black uppercase ${tier.color}`}>
                      {tier.label}
                    </span>
                    {myCommission >= tier.threshold && (
                      <CheckCircle2 size={16} className="text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Goal: ${tier.threshold.toLocaleString()}</span>
                    <span className="text-sm font-bold text-gray-900">+${tier.bonus.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-gray-900 rounded-2xl text-center">
              <p className="text-xs text-white/50 uppercase font-bold mb-1">Estimated Bonus Total</p>
              <p className="text-2xl font-black text-[#c9a84c]">
                ${currentBonus ? currentBonus.bonus.toLocaleString() : '0'}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a73] rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-[#c9a84c]" fill="#c9a84c" size={20} />
              <h3 className="font-bold">Elite Producer Club</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Hit the <span className="text-white font-bold">Diamond Tier</span> to unlock the annual retreat in the Bahamas and priority lead allocation.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-bold">
              <span>Next Milestone: Platinum</span>
              <TrendingUp size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper for a check icon since lucide-react imports might vary
function CheckCircle2({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 //... simplified for brevity" />
      <path d="m9 11 2 2 4-4" />
    </svg>
  )
}
