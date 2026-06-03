"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, UserPlus, TrendingUp, CheckCircle2, Clock, ArrowRight, ShieldCheck } from 'lucide-react'

export default function PartnerDashboard() {
  const [referrals, setReferrals] = useState([
    { id: '1', name: 'John Anderson', status: 'Analysis Complete', date: '2026-05-12', value: 'HNW' },
    { id: '2', name: 'Sarah Jenkins', status: 'Contacted', date: '2026-05-15', value: 'UHNW' },
    { id: '3', name: 'Robert Chen', status: 'Onboarded', date: '2026-05-01', value: 'HNW' },
  ])

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">Partner Command Center</h1>
          <p className="text-slate-500">Manage your referrals and track client outcomes.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gold-600 hover:bg-gold-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-gold-600/20 transition-all"
        >
          <UserPlus className="w-5 h-5" /> Submit New Referral
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Referrals', value: '24', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Analysis', value: '8', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Successfully Onboarded', value: '16', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`${stat.bg} p-3 rounded-xl`}>
              <stat.icon className={`${stat.color} w-6 h-6`} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-navy-900">Referral Pipeline</h3>
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Last updated: Just now
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Client Name</th>
                <th className="px-6 py-4 font-semibold">Segment</th>
                <th className="px-6 py-4 font-semibold">Date Submitted</th>
                <th className="px-6 py-4 font-semibold">Current Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {referrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-navy-900">{ref.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">
                      {ref.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{ref.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      ref.status === 'Onboarded' ? 'bg-emerald-100 text-emerald-700' : 
                      ref.status === 'Analysis Complete' ? 'bg-blue-100 text-blue-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {ref.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gold-600 hover:text-gold-700 font-bold text-sm flex items-center gap-1 ml-auto">
                      View Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Partner Value Section */}
      <div className="bg-navy-900 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
        <div className="relative z-10 flex-1">
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <ShieldCheck className="text-gold-400" /> The CB Equity Partnership Standard
          </h3>
          <p className="text-slate-400 leading-relaxed">
            We provide your clients with a fiduciary-first approach to wealth management, ensuring that the trust you've built with them is amplified, not compromised.
          </p>
        </div>
        <div className="relative z-10 flex gap-4">
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[120px]">
            <p className="text-gold-400 font-bold text-xl">100%</p>
            <p className="text-xs text-slate-300 uppercase">Compliance</p>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[120px]">
            <p className="text-gold-400 font-bold text-xl">24hr</p>
            <p className="text-xs text-slate-300 uppercase">Response</p>
          </div>
        </div>
      </div>
    </div>
  )
}
