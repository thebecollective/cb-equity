"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Layout, Settings, CreditCard, Plus, Search } from 'lucide-react'

export default function AgencyCommandCenter() {
  const [advisors] = useState([
    { id: '1', name: 'Marcus Thorne', production: '$1.2M', cases: 42, status: 'Active', tier: 'Gold' },
    { id: '2', name: 'Elena Rodriguez', production: '$850k', cases: 31, status: 'Active', tier: 'Silver' },
    { id: '3', name: 'Julian Vane', production: '$400k', cases: 12, status: 'Probation', tier: 'Bronze' },
  ])

  return (
    <div className="p-6 lg:p-10 space-y-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-600 font-bold text-sm uppercase tracking-widest mb-1">
            <Layout className="w-4 h-4" /> Agency Management
          </div>
          <h1 className="text-3xl font-bold text-navy-900">EquityOS Command Center</h1>
          <p className="text-slate-500">Manage your firm's licenses, performance, and global AI settings.</p>
        </div>
        <button className="bg-navy-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-navy-900/20 transition-all">
          <Plus className="w-5 h-5" /> Add New Seat
        </button>
      </div>

      {/* Agency Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Advisors', value: '12', icon: Users, color: 'text-blue-600' },
          { label: 'Total Production', value: '$14.2M', icon: TrendingUp, color: 'text-emerald-600' },
          { label: 'Case Studies Generated', value: '482', icon: FileText, color: 'text-gold-600' },
          { label: 'SaaS MRR', value: '$4,200', icon: CreditCard, color: 'text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
            <p className="text-2xl font-black text-navy-900">{stat.value}</p>
            <p className="text-xs text-slate-500 uppercase font-bold">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Advisor Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-navy-900">Firm Roster</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input type="text" placeholder="Search advisor..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Advisor</th>
                <th className="px-6 py-4 font-semibold">Production</th>
                <th className="px-6 py-4 font-semibold">Cases</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Tier</th>
                <th className="px-6 py-4 font-semibold text-right">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {advisors.map((adv) => (
                <tr key={adv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-navy-900">{adv.name}</td>
                  <td className="px-6 py-4 text-slate-600">{adv.production}</td>
                  <td className="px-6 py-4 text-slate-600">{adv.cases}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      adv.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {adv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-500">{adv.tier}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-navy-900 transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global AI Settings */}
      <div className="bg-navy-900 text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Global AI Directives</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Set the guiding principles for all AI-generated case studies across your firm. Ensure consistent messaging and strategic alignment.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-gold-500 text-navy-900 font-bold rounded-xl hover:bg-gold-400 transition-all text-sm">
                Configure AI Persona
              </button>
              <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-sm">
                Review Compliance
              </button>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Default Lead Score</span>
              <span className="text-sm font-bold text-gold-400">Aggressive</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Preferred Product Mix</span>
              <span className="text-sm font-bold text-gold-400">IUL & Private Placement</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Tone of Voice</span>
              <span className="text-sm font-bold text-gold-400">Elite / Institutional</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FileText(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
  )
}
