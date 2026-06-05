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
    bg: 'bg-emerald-50',
    desc: 'Visualize your retirement shortfall.' 
  },
  { 
    name: 'Black Swan Stress Tester', 
    path: '/tools/stress-tester', 
    icon: ShieldAlert, 
    color: 'text-red-600', 
    bg: 'bg-red-50',
    desc: 'Test your portfolio against crashes.' 
  },
  { 
    name: 'Tax Alpha Scanner', 
    path: '/tools/tax-scanner', 
    icon: Search, 
    color: 'text-gold-600', 
    bg: 'bg-gold-50',
    desc: 'Identify hidden tax leaks.' 
  },
  { 
    name: 'Recruitment ROI Calc', 
    path: '/careers/roi-calculator', 
    icon: DollarSign, 
    color: 'text-blue-600', 
    bg: 'bg-blue-50',
    desc: 'See what you earn at CB Equity.' 
  },
]

export default function ToolsMenu() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {TOOLS.map((tool, i) => (
        <Link key={i} href={tool.path}>
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl relative group cursor-pointer overflow-hidden transition-all"
          >
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-100 rounded-full blur-3xl group-hover:bg-gold-100 transition-colors" />
            
            <div className={`p-3 rounded-2xl inline-block mb-4 ${tool.bg} ${tool.color} shadow-sm`}>
              <tool.icon className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-900 mb-1 group-hover:text-gold-600 transition-colors text-lg">{tool.name}</h4>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">{tool.desc}</p>
            
            <div className="flex items-center gap-1 text-xs font-bold text-navy-900 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
              Launch Tool <ArrowRight className="w-3 h-3" />
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}

