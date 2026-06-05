"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Zap, TrendingUp, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react'

export default function AIIntelligenceHub() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch('/api/alerts')
        const data = await res.json()
        setAlerts(data)
      } catch (e) {
        console.error('Error fetching alerts')
      } finally {
        setLoading(false)
      }
    }
    fetchAlerts()
  }, [])

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-600 font-bold text-sm uppercase tracking-widest mb-1">
            <Zap className="w-4 h-4" /> Predictive Intelligence
          </div>
          <h1 className="text-3xl font-bold text-navy-900">Opportunity Hub</h1>
          <p className="text-slate-500">AI-driven alerts based on market shifts and client profiles.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          System Live: Scanning 1,200+ Data Points
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            alerts.map((alert: any) => (
              <motion.div 
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-6 rounded-3xl border-2 transition-all hover:shadow-lg ${
                  alert.priority === 'Critical' ? 'border-red-200 bg-red-50/30' : 
                  alert.priority === 'High' ? 'border-amber-200 bg-amber-50/30' : 
                  'border-slate-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      alert.priority === 'Critical' ? 'bg-red-500 text-white' : 
                      alert.priority === 'High' ? 'bg-amber-500 text-white' : 
                      'bg-slate-500 text-white'
                    }`}>
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900">{alert.clientName}</h4>
                      <p className="text-xs text-slate-500">{alert.category} • {alert.type}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                    alert.priority === 'Critical' ? 'bg-red-100 text-red-700' : 
                    alert.priority === 'High' ? 'bg-amber-100 text-amber-700' : 
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {alert.priority} Priority
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {alert.message}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <TrendingUp className="w-3 h-3" /> Est. Value Add: $15k - $50k
                  </div>
                  <button className="px-4 py-2 bg-navy-900 text-white text-xs font-bold rounded-xl hover:bg-navy-800 transition-all flex items-center gap-2">
                    {alert.action} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-navy-900 text-white p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
            <div className="relative z-10">
              <ShieldAlert className="text-gold-400 w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Market Volatility Alert</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                The S&P 500 is showing signs of a corrective phase. Your "Black Swan" exposed clients are currently at risk.
              </p>
              <button className="w-full py-3 bg-gold-500 text-navy-900 font-bold rounded-xl hover:bg-gold-400 transition-all text-sm">
                Run Portfolio Stress Tests
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
            <h4 className="font-bold text-navy-900 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-600 w-5 h-5" /> AI Efficiency
            </h4>
            <div className="space-y-4">
              {[
                { label: 'Leads Scanned', value: '1,402' },
                { label: 'Opp. Identified', value: '84' },
                { label: 'Est. Alpha Found', value: '$2.1M' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{stat.label}</span>
                  <span className="font-bold text-navy-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
