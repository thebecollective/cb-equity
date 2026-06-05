"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Target, TrendingUp, AlertCircle, Calendar, ArrowRight, DollarSign } from 'lucide-react'

export default function WealthGapSimulator() {
  const [inputs, setInputs] = useState({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    expectedReturn: 7,
    dreamGoal: 2000000,
  })
  const [projection, setProjection] = useState(0)
  const [gap, setGap] = useState(0)

  useEffect(() => {
    const years = inputs.retirementAge - inputs.currentAge
    const rate = inputs.expectedReturn / 100 / 12
    const months = years * 12
    
    // Future Value of Current Savings
    const fvCurrent = inputs.currentSavings * Math.pow(1 + rate, months)
    
    // Future Value of Monthly Contributions
    const fvContributions = inputs.monthlyContribution * ((Math.pow(1 + rate, months) - 1) / rate)
    
    const total = fvCurrent + fvContributions
    setProjection(total)
    setGap(Math.max(0, inputs.dreamGoal - total))
  }, [inputs])

  const chartData = [
    { name: 'Projected', value: projection, color: '#c9a84c' },
    { name: 'Dream Goal', value: inputs.dreamGoal, color: '#1e3a5f' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-navy-900 mb-4"
          >
            Visualize Your <span className="text-gold-600">Wealth Gap</span>
          </motion.h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Most people guess their retirement. We calculate it. See the exact difference between where you are headed and where you want to be.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6"
          >
            <h3 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
              <Calendar className="text-gold-600" /> Your Profile
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Current Age</label>
                <input 
                  type="number" 
                  value={inputs.currentAge}
                  onChange={(e) => setInputs({...inputs, currentAge: Number(e.target.value)})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Retirement Age</label>
                <input 
                  type="number" 
                  value={inputs.retirementAge}
                  onChange={(e) => setInputs({...inputs, retirementAge: Number(e.target.value)})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Current Savings ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="number" 
                    value={inputs.currentSavings}
                    onChange={(e) => setInputs({...inputs, currentSavings: Number(e.target.value)})}
                    className="w-full pl-9 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Monthly Contribution ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="number" 
                    value={inputs.monthlyContribution}
                    onChange={(e) => setInputs({...inputs, monthlyContribution: Number(e.target.value)})}
                    className="w-full pl-9 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Expected Return (%)</label>
                <input 
                  type="number" 
                  value={inputs.expectedReturn}
                  onChange={(e) => setInputs({...inputs, expectedReturn: Number(e.target.value)})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                />
              </div>
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-gold-600 uppercase mb-1 flex items-center gap-1">
                  <Target className="w-3 h-3" /> Dream Retirement Goal ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-600 w-4 h-4" />
                  <input 
                    type="number" 
                    value={inputs.dreamGoal}
                    onChange={(e) => setInputs({...inputs, dreamGoal: Number(e.target.value)})}
                    className="w-full pl-9 p-3 bg-gold-50 border border-gold-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all font-bold text-navy-900"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Analysis Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Visual Gap Chart */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 h-[400px]">
              <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                <TrendingUp className="text-gold-600" /> Wealth Projection
              </h3>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${(value || 0).toLocaleString()}`, '']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={80}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* The "Pain" Section */}
            <div className="bg-navy-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold-600/10 blur-3xl rounded-full" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 text-red-400 mb-2 justify-center md:justify-start">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">Critical Wealth Gap Detected</span>
                  </div>
                  <div className="text-5xl md:text-6xl font-black mb-2">
                    ${gap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-slate-400 max-w-md">
                    Based on your current trajectory, you are missing <span className="text-white font-bold">${gap.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> to reach your dream goal.
                  </p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.dispatchEvent(new Event('open-booking'))}
                  className="w-full md:w-auto py-4 px-8 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all text-lg shadow-lg shadow-gold-500/20"
                >
                  Close the Gap <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
