'use client'

import { useState, useEffect } from 'react'
import StatsCard from '@/components/dashboard/StatsCard'
import { motion } from 'framer-motion'
import Link from 'next/link'
import WealthRoadmap from '@/components/dashboard/WealthRoadmap'

export default function ClientDashboard() {
  const [loading, setLoading] = useState(true)
  const [clientData, setClientData] = useState<any>(null)

  useEffect(() => {
    async function fetchClientData() {
      try {
        const res = await fetch('/api/planning') // In a real app, this would be filtered by client_id
        const data = await res.json()
        // Take the latest net worth as example
        setClientData(data[0] || { totalAssets: 1250000, netWorth: 850000, growth: '+12.4%' })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchClientData()
  }, [])

  if (loading) return <div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Client</h1>
          <p className="text-gray-500">Your wealth strategy is currently in the <span className="text-[#c9a84c] font-bold">Analysis Phase</span></p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Upload Document</button>
          <button className="px-4 py-2 gradient-bg text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors">Book Review</button>
        </div>
      </div>

      <WealthRoadmap />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Net Worth" value="$1,240,000" icon={<span>🏦</span>} color="#1e3a5f" />
        <StatsCard title="Invested Assets" value="$850,000" icon={<span>📈</span>} color="#059669" />
        <StatsCard title="Next Milestone" value="Estate Plan" icon={<span>🎯</span>} color="#c9a84c" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Financial Goals</h3>
          {[
            { name: 'Retirement Fund', progress: 65, color: 'bg-green-500' },
            { name: 'Education Savings', progress: 40, color: 'bg-blue-500' },
            { name: 'Estate Liquidity', progress: 85, color: 'bg-purple-500' },
          ].map(goal => (
            <div key={goal.name} className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>{goal.name}</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className={`${goal.color} h-full rounded-full transition-all`} style={{ width: `${goal.progress}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Secure Document Vault</h3>
          <div className="space-y-3">
            {[
              { name: '2024 Tax Return.pdf', date: 'Oct 12', size: '1.2MB' },
              { name: 'Living Trust.pdf', date: 'Aug 05', size: '4.5MB' },
              { name: 'Insurance Policy.pdf', date: 'Jan 20', size: '890KB' },
            ].map(doc => (
              <div key={doc.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-50 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📄</span>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{doc.name}</p>
                    <p className="text-[10px] text-gray-400">{doc.date} • {doc.size}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">Download</span>
              </div>
            ))}
          </div>
          <button className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:border-[#1e3a5f] hover:text-[#1e3a5f] transition-all">
            + Upload New Document
          </button>
        </div>
      </div>
    </div>
  )
}
