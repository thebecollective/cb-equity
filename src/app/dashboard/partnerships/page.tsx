'use client'

import { useState } from 'react'
import DataTable, { Column } from '@/components/dashboard/DataTable'
import Modal from '@/components/dashboard/Modal'
import StatsCard from '@/components/dashboard/StatsCard'

interface Partner {
  id: string
  company: string
  contact: string
  type: string
  leadsProvided: number
  revenueGenerated: number
  tier: string
  status: string
}

export default function PartnershipsDashboard() {
  const [partners] = useState<Partner[]>([

    { id: 'p1', company: 'Elite Tax Group', contact: 'Sarah Jenkins', type: 'CPA', leadsProvided: 45, revenueGenerated: 120000, tier: 'Platinum', status: 'Active' },
    { id: 'p2', company: 'Prime Realty', contact: 'Mike Ross', type: 'RE Broker', leadsProvided: 22, revenueGenerated: 45000, tier: 'Gold', status: 'Active' },
    { id: 'p3', company: 'Heritage Law', contact: 'Robert Vance', type: 'Attorney', leadsProvided: 12, revenueGenerated: 80000, tier: 'Silver', status: 'Onboarding' },
  ])

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Strategic Partnership Hub</h1>
        <p className="text-gray-500">Manage B2B relationships and track corporate lead flow.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Partner Companies" value={partners.length} icon={<span>🏢</span>} color="#1e3a5f" />
        <StatsCard title="B2B Leads This Month" value="142" icon={<span>📈</span>} color="#059669" />
        <StatsCard title="Partner-Sourced Revenue" value="$245k" icon={<span>💰</span>} color="#c9a84c" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Active Company Partnerships</h2>
          <button className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg text-sm font-medium hover:bg-[#2d5a8e]">Add New Partner</button>
        </div>
      <DataTable 
        columns={[
          { key: 'company', label: 'Company' },
          { key: 'contact', label: 'Main Contact' },
          { key: 'type', label: 'Category' },
          { key: 'leadsProvided', label: 'Leads Sent', render: (v: any) => <span>{v}</span> },
          { key: 'revenueGenerated', label: 'Revenue', render: (v: any) => `$${v.toLocaleString()}` },
          { key: 'tier', label: 'Tier', render: (v: any) => (
            <span className={`text-xs px-2 py-1 rounded-full ${v === 'Platinum' ? 'bg-purple-100 text-purple-700' : v === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
              {v}
            </span>
          )},
          { key: 'status', label: 'Status' },
        ]}
        data={partners}
      />
      </div>
    </div>
  )
}
