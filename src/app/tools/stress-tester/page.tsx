"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, ShieldAlert, Zap, ArrowRight, TrendingDown, Lock } from 'lucide-react'

const SCENARIOS = {
  '2008_CRASH': {
    name: '2008 Global Financial Crisis',
    description: 'Systemic collapse of housing and banking sectors.',
    drops: { stocks: -0.50, bonds: 0.05, cash: 0.01, realestate: -0.30 },
    color: '#ef4444'
  },
  '2020_FLASH': {
    name: '2020 COVID Flash Crash',
    description: 'Rapid, unexpected global shutdown.',
    drops: { stocks: -0.35, bonds: -0.05, cash: 0.02, realestate: -0.10 },
    color: '#f97316'
  },
  'HYPER_INFLATION': {
    name: 'Hypothetical Hyper-Inflation',
    description: 'Currency devaluation and purchasing power collapse.',
    drops: { stocks: -0.20, bonds: -0.40, cash: -0.60, realestate: 0.20 },
    color: '#8b5cf6'
  }
}

export default function StressTester() {
  const [allocation, setAllocation] = useState({
    stocks: 60,
    bonds: 20,
    cash: 10,
    realestate: 10,
  })
  const [totalValue, setTotalValue] = useState(1000000)
  const [selectedScenario, setSelectedScenario] = useState('2008_CRASH')
  const [isSimulating, setIsSimulating] = useState(false)
  const [result, setResult] = useState<{ current: number; crashed: number; loss: number } | null>(null)

  const runSimulation = () => {
    setIsSimulating(true)
    setTimeout(() => {
      const scenario = SCENARIOS[selectedScenario as keyof typeof SCENARIOS]
      const drops = scenario.drops
      
      const stockLoss = (totalValue * (allocation.stocks / 100)) * drops.stocks
      const bondLoss = (totalValue * (allocation.bonds / 100)) * drops.bonds
      const cashLoss = (totalValue * (allocation.cash / 100)) * drops.cash
      const reLoss = (totalValue * (allocation.realestate / 100)) * drops.realestate
      
      const totalLoss = stockLoss + bondLoss + cashLoss + reLoss
      const crashedValue = totalValue + totalLoss

      setResult({
        current: totalValue,
        crashed: crashedValue,
        loss: Math.abs(totalLoss),
      })
      setIsSimulating(false)
    }, 1500)
  }

  // Mock data for the crash chart
  const generateChartData = () => {
    if (!result) return []
    const data = []
    const steps = 10
    for (let i = 0; i <= steps; i++) {
      data.push({
        time: `T+${i}`,
        value: result.current - ((result.current - result.crashed) * (i / steps))
      })
    }
    return data
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-bold mb-6 flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" /> Risk Analysis Engine
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-4">
            The <span className="text-red-600">Black Swan</span> Stress Tester
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Most advisors show you a "straight line" to retirement. We show you the crashes. Discover how exposed your wealth is to the next systemic event.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Inputs */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
              <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                <Lock className="text-gold-600" /> Current Allocation
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Total Portfolio Value ($)</label>
                  <input 
                    type="number" 
                    value={totalValue}
                    onChange={(e) => setTotalValue(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all font-bold"
                  />
                </div>

                {['stocks', 'bonds', 'cash', 'realestate'].map((asset) => (
                  <div key={asset}>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase mb-1">
                      <span>{asset}</span>
                      <span className="text-navy-900">{allocation[asset as keyof typeof allocation]}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={allocation[asset as keyof typeof allocation]}
                      onChange={(e) => setAllocation({...allocation, [asset]: Number(e.target.value)})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-600"
                    />
                  </div>
                ))}
                <div className="pt-4 text-center text-sm text-slate-400 font-medium">
                  Total Allocation: {Object.values(allocation).reduce((a, b) => a + b, 0)}%
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Select Scenario</h3>
              <div className="space-y-3">
                {Object.entries(SCENARIOS).map(([key, scenario]) => (
                  <div 
                    key={key}
                    onClick={() => setSelectedScenario(key)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedScenario === key 
                      ? 'border-red-500 bg-red-50 shadow-md' 
                      : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <div className="font-bold text-navy-900 mb-1">{scenario.name}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{scenario.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Simulation Result */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-navy-900">Simulation Result</h3>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                    isSimulating ? 'bg-slate-200 text-slate-500' : 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20'
                  }`}
                >
                  {isSimulating ? 'Simulating...' : <><Zap className="w-5 h-5" /> Run Stress Test</>}
                </motion.button>
              </div>

              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  {!result && !isSimulating && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center p-12"
                    >
                      <div className="p-6 bg-slate-50 rounded-full mb-4">
                        <TrendingDown className="w-12 h-12 text-slate-300" />
                      </div>
                      <p className="text-slate-500 max-w-sm">Adjust your portfolio and select a scenario to see your exposure.</p>
                    </motion.div>
                  )}

                  {isSimulating && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                        <p className="text-red-600 font-bold animate-pulse">Calculating Systemic Exposure...</p>
                      </div>
                    </motion.div>
                  )}

                  {result && !isSimulating && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                          <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Value After Crash</p>
                          <p className="text-3xl font-bold text-navy-900">${result.crashed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
                          <p className="text-xs font-semibold text-red-500 uppercase mb-1">Total Wealth Destroyed</p>
                          <p className="text-3xl font-bold text-red-600">-${result.loss.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>
                      </div>

                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={generateChartData()}>
                            <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="time" hide />
                            <YAxis 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fontSize: 12 }} 
                              tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} 
                            />
                            <Tooltip formatter={(v) => [`$${(v || 0).toLocaleString()}`, 'Value']} />
                            <Area type="monotone" dataKey="value" stroke="#ef4444" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="bg-navy-900 text-white p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-gold-400 mb-2">
                              <AlertTriangle className="w-5 h-5" />
                              <span className="text-sm font-bold uppercase tracking-widest">Exposure Alert</span>
                            </div>
                            <h4 className="text-2xl font-bold mb-2">Your portfolio is vulnerable.</h4>
                            <p className="text-slate-400">
                              A ${result.loss.toLocaleString(undefined, { maximumFractionDigits: 0 })} loss is a systemic failure. We can hedge this exposure using 
                              <span className="text-white font-bold"> Cash-Value Life Insurance</span> and <span className="text-white font-bold">Alternative Assets</span>.
                            </p>
                          </div>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full md:w-auto py-4 px-8 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all text-lg"
                          >
                            Hedge Your Wealth <ArrowRight className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
