'use client'

import { useState, useEffect } from 'react'
import StatsCard from '@/components/dashboard/StatsCard'
import DataTable from '@/components/dashboard/DataTable'

export default function PerformancePage() {
  const [stats, setStats] = useState({
    totalClosed: 0,
    totalCommission: 0,
    conversionRate: '0%',
    pendingPayouts: 0,
  })
  const [recentWins, setRecentWins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPerformance() {
      try {
        const [commissions, leads] = await Promise.all([
          fetch('/api/commissions').then(res => res.json()),
          fetch('/api/leads').then(res => res.json()),
        ])

        const closed = leads.filter((l: any) => l.status === 'closed').length
        const totalLeads = leads.length
        const totalComm = commissions.reduce((sum: number, c: any) => sum + (c.amount || 0), 0)
        const pendingComm = commissions.filter((c: any) => c.status === 'pending').reduce((sum: number, c: any) => sum + (c.amount || 0), 0)

        setStats({
          totalClosed: closed,
          totalCommission: totalComm,
          conversionRate: totalLeads > 0 ? `${((closed / totalLeads) * 100).toFixed(1)}%` : '0%',
          pendingPayouts: pendingComm,
        })
        
        setRecentWins(commissions.slice(0, 5))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPerformance()
  }, [])

  if (loading) return <div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">My Performance</h1>
        <p className="text-gray-500">Track your growth, earnings, and conversion metrics.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Closed" value={stats.totalClosed} icon={<span>🏆</span>} color="#1e3a5f" />
        <StatsCard title="Total Earnings" value={`$${stats.totalCommission.toLocaleString()}`} icon={<span>💰</span>} color="#059669" />
        <StatsCard title="Conversion Rate" value={stats.conversionRate} icon={<span>📈</span>} color="#c9a84c" />
        <StatsCard title="Pending Payouts" value={`$${stats.pendingPayouts.toLocaleString()}`} icon={<span>⏳</span>} color="#f59e0b" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Commissions</h2>
          <DataTable 
            columns={[
              { key: 'clientName', label: 'Client' },
              { key: 'product', label: 'Product' },
              { key: 'amount', label: 'Amount', render: (item) => `$${item.amount?.toLocaleString()}` },
              { key: 'status', label: 'Status', render: (item) => (
                <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'paid' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                  {item.status}
                </span>
              )},
            ]}
            data={recentWins}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Monthly Target</h2>
          <div className="text-center py-8">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-32 h-32">
                <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                <circle 
                  className="text-[#1e3a5f]" 
                  strokeWidth="10" 
                  strokeDasharray={364.4} 
                  strokeDashoffset={364.4 * 0.65} 
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="58" cx="64" cy="64" 
                />
              </svg>
              <span className="absolute text-2xl font-bold">65%</span>
            </div>
            <p className="mt-4 text-sm text-gray-500">You are $4,200 away from your monthly bonus!</p>
            <button className="mt-6 w-full py-2 bg-[#1e3a5f] text-white rounded-lg text-sm font-medium hover:bg-[#2d5a8e]">View Bonus Tiers</button>
          </div>
        </div>
      </div>
    </div>
  )
}
