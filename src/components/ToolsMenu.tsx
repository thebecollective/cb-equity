"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, ShieldAlert, Search, DollarSign, ArrowRight } from 'lucide-react'

const TOOLS = [
  { 
    name: 'Wealth Gap Simulator', 
    path: '/tools/wealth-gap', 
    icon: TrendingUp, 
    color: 'text-emerald-600', 
    desc: 'Visualize your retirement shortfall.' 
  },
  { 
    name: 'Black Swan Stress Tester', 
    path: '/tools/stress-tester', 
    icon: ShieldAlert, 
    color: 'text-red-600', 
    desc: 'Test your portfolio against crashes.' 
  },
  { 
    name: 'Tax Alpha Scanner', 
    path: '/tools/tax-scanner', 
    icon: Search, 
    color: 'text-gold-600', 
    desc: 'Identify hidden tax leaks.' 
  },
  { 
    name: 'Recruitment ROI Calc', 
    path: '/careers/roi-calculator', 
    icon: DollarSign, 
    color: 'text-blue-600', 
    desc: 'See what you earn at CB Equity.' 
  },
]

export default function ToolsMenu() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {TOOLS.map((tool, i) => (
        <Link key={i} href={tool.path}>
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <div className={`p-3 rounded-xl bg-slate-50 inline-block mb-4 ${tool.color}`}>
              <tool.icon className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-900 mb-1 group-hover:text-gold-600 transition-colors">{tool.name}</h4>
            <p className="text-xs text-slate-500 mb-4">{tool.desc}</p>
            <div className="flex items-center gap-1 text-xs font-bold text-navy-900 opacity-0 group-hover:opacity-100 transition-opacity">
              Launch Tool <ArrowRight className="w-3 h-3" />
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
