'use client'

import { useState, useEffect } from 'react'
import StatsCard from '@/components/dashboard/StatsCard'
import { motion } from 'framer-motion'
import Link from 'next/link'

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
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Marcus</h1>
          <p className="text-gray-500">Your wealth is growing. Here is your current financial snapshot.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-400 uppercase">Account Status</p>
            <p className="text-sm font-bold text-green-600">Premium Client</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white shadow-sm" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Net Worth" value={`$${clientData?.netWorth?.toLocaleString() || '850,000'}`} icon={<span>🏦</span>} color="#1e3a5f" />
        <StatsCard title="Investment Growth" value={clientData?.growth || '+12.4%'} icon={<span>📈</span>} color="#059669" />
        <StatsCard title="Upcoming Review" value="Oct 12" icon={<span>📅</span>} color="#c9a84c" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Your Financial Roadmap</h2>
          <div className="space-y-4">
            {[
              { goal: 'Retirement Fund', target: '$2M', current: '$850k', progress: 42, color: 'bg-blue-500' },
              { goal: 'Childs Education', target: '$200k', current: '$45k', progress: 22, color: 'bg-green-500' },
              { goal: 'Emergency Fund', target: '$50k', current: '$50k', progress: 100, color: 'bg-amber-500' },
            ].map(goal => (
              <div key={goal.goal} className="p-4 border border-gray-100 rounded-xl">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{goal.goal}</span>
                  <span className="text-xs text-gray-500">{goal.current} / {goal.target}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className={`${goal.color} h-full transition-all`} style={{ width: `${goal.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/dashboard/client/planning" className="text-sm font-semibold text-[#1e3a5f] hover:underline">Update your goals →</Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Secure Documents</h2>
            <div className="space-y-3">
              {['Annual_Review_2024.pdf', 'Estate_Plan_Draft.pdf', 'Insurance_Policy_C.pdf'].map(doc => (
                <div key={doc} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-xs font-medium text-gray-600 truncate max-w-[150px]">{doc}</span>
                  <button className="text-xs text-[#1e3a5f] font-bold hover:underline">Download</button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-400 hover:border-[#1e3a5f] hover:text-[#1e3a5f] transition-all">
              + Upload Document
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#c9a84c] to-[#b38f3a] rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold mb-2">Direct Message</h3>
            <p className="text-sm text-white/80 mb-4">Need a quick answer? Message your advisor directly.</p>
            <button className="w-full py-2 bg-white text-[#1e3a5f] rounded-lg text-sm font-bold hover:bg-gray-100 transition-all">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
