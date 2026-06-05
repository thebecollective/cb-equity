"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Share2, ShieldAlert, TrendingUp, Lock, Info } from 'lucide-react'

const FAMILY_TREE = {
  id: 'root',
  name: 'The Patriarch/Matriarch',
  role: 'Primary Grantor',
  wealth: '$12.5M',
  structure: 'Irrevocable Life Insurance Trust (ILIT)',
  children: [
    {
      id: 'child-1',
      name: 'Eldest Son',
      role: 'Successor Trustee',
      wealth: '$2.1M (Expected)',
      structure: 'Dynasty Trust',
      children: [
        { id: 'gc-1', name: 'Grandchild A', role: 'Beneficiary', wealth: 'TBD', structure: 'Crummey Trust' },
        { id: 'gc-2', name: 'Grandchild B', role: 'Beneficiary', wealth: 'TBD', structure: 'Crummey Trust' },
      ]
    },
    {
      id: 'child-2',
      name: 'Daughter',
      role: 'Beneficiary',
      wealth: '$1.8M (Expected)',
      structure: 'Discretionary Trust',
      children: []
    }
  ]
}

// ... (keep imports)
// ... (keep FAMILY_TREE)

export default function LegacyTree() {
  const [selectedNode, setSelectedNode] = useState(FAMILY_TREE)

  return (
    <div className="p-6 lg:p-10 space-y-12 max-w-7xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-gold-600 font-bold text-sm uppercase tracking-widest mb-1">
          <Share2 className="w-4 h-4" /> Dynastic Planning
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900">Generational Legacy Tree</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Visualizing the flow of wealth, protection, and influence across generations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* The Tree Visualizer - Added overflow-x-auto for mobile */}
        <div className="lg:col-span-2 bg-slate-50 rounded-3xl border border-slate-200 p-4 md:p-12 relative overflow-x-auto overflow-y-hidden min-h-[500px]">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#c9a84c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="relative z-10 flex flex-col items-center gap-16 min-w-[600px] md:min-w-full">
            {/* Level 1 */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedNode(FAMILY_TREE)}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all text-center w-64 shadow-lg ${selectedNode.id === 'root' ? 'bg-white border-gold-500 ring-4 ring-gold-500/20' : 'bg-white border-slate-200'}`}
            >
              <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">P</div>
              <h4 className="font-bold text-navy-900">{FAMILY_TREE.name}</h4>
              <p className="text-xs text-slate-500">{FAMILY_TREE.role}</p>
            </motion.div>

            {/* Connectors */}
            <div className="w-full flex justify-center relative">
              <div className="absolute top-0 w-px h-16 bg-slate-300" />
              <div className="w-3/4 h-px bg-slate-300" />
            </div>

            {/* Level 2 */}
            <div className="flex gap-12 justify-center w-full">
              {FAMILY_TREE.children.map((child) => (
                <motion.div 
                  key={child.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedNode(child)}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all text-center w-64 shadow-md ${selectedNode.id === child.id ? 'bg-white border-gold-500 ring-4 ring-gold-500/20' : 'bg-white border-slate-200'}`}
                >
                  <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">C</div>
                  <h4 className="font-bold text-navy-900">{child.name}</h4>
                  <p className="text-xs text-slate-500">{child.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="space-y-6">
          {/* ... keep the rest of the Detail Panel as is ... */}
        </div>
      </div>
    </div>
  )
}

