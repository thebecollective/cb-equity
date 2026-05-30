'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import FinancialHealthCheck from '@/components/FinancialHealthCheck'

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<'health' | 'tax' | 'retirement' | 'estate'>('health')

  const tools = [
    { id: 'health', label: 'Financial Health Check', icon: '🏥', desc: 'Instant score of your financial stability.' },
    { id: 'tax', label: 'Tax Optimizer', icon: '📉', desc: 'Estimate potential tax savings via harvesting.' },
    { id: 'retirement', label: 'Retirement Gap Calc', icon: '⏳', desc: 'See if you have enough to retire on your terms.' },
    { id: 'estate', label: 'Estate Tax Estimator', icon: '📜', desc: 'Calculate potential legacy taxes and exemptions.' },
  ]

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Self-Service Tools</span>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Wealth <span className="gradient-text">Intelligence</span></h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--color-muted)]">
            Use our professional-grade calculators to identify gaps in your plan. 
            Every tool captures a lead and pushes it to our advisors for review.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 space-y-4">
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as any)}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  activeTool === tool.id 
                  ? 'bg-white border-[#1e3a5f] shadow-md ring-1 ring-[#1e3a5f]' 
                  : 'bg-white/50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <h3 className={`font-bold ${activeTool === tool.id ? 'text-[#1e3a5f]' : 'text-gray-900'}`}>{tool.label}</h3>
                    <p className="text-xs text-gray-500">{tool.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:w-2/3 bg-white rounded-3xl border border-gray-200 p-8 shadow-sm min-h-[600px]">
            {activeTool === 'health' && <FinancialHealthCheck />}
            {activeTool === 'tax' && (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <div className="text-5xl mb-4">📉</div>
                  <h3 className="text-xl font-bold">Tax Optimizer</h3>
                  <p className="text-gray-500 max-w-xs mx-auto mt-2">This tool is available in the Client Portal. Login to optimize your taxes.</p>
                  <Link href="/login" className="mt-6 inline-block px-6 py-2 bg-[#1e3a5f] text-white rounded-lg font-medium">Login to Access</Link>
                </div>
              </div>
            )}
            {activeTool === 'retirement' && (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <div className="text-5xl mb-4">⏳</div>
                  <h3 className="text-xl font-bold">Retirement Gap Calculator</h3>
                  <p className="text-gray-500 max-w-xs mx-auto mt-2">See your projected shortfall and how to fix it. Available in the Client Portal.</p>
                  <Link href="/login" className="mt-6 inline-block px-6 py-2 bg-[#1e3a5f] text-white rounded-lg font-medium">Login to Access</Link>
                </div>
              </div>
            )}
            {activeTool === 'estate' && (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <div className="text-5xl mb-4">📜</div>
                  <h3 className="text-xl font-bold">Estate Tax Estimator</h3>
                  <p className="text-gray-500 max-w-xs mx-auto mt-2">Calculate potential probate and estate taxes. Available in the Client Portal.</p>
                  <Link href="/login" className="mt-6 inline-block px-6 py-2 bg-[#1e3a5f] text-white rounded-lg font-medium">Login to Access</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
