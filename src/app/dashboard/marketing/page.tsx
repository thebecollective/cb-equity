'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/dashboard/DataTable'
import StatsCard from '@/components/dashboard/StatsCard'

export default function MarketingHub() {
  const campaigns = [
    { id: 'c1', name: 'Facebook Retargeting', spend: 1200, leads: 45, costPerLead: 26.6, status: 'Active' },
    { id: 'c2', name: 'LinkedIn Advisor Outreach', spend: 3000, leads: 12, costPerLead: 250, status: 'Active' },
    { id: 'c3', name: 'Google Search - "Life Insurance"', spend: 500, leads: 80, costPerLead: 6.25, status: 'Paused' },
  ]

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Marketing Command Center</h1>
        <p className="text-gray-500">Track campaigns, lead acquisition cost, and content performance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Ad Spend" value="$4,700" icon={<span>💸</span>} color="#dc2626" />
        <StatsCard title="Avg Cost Per Lead" value="$45.12" icon={<span>🎯</span>} color="#1e3a5f" />
        <StatsCard title="Total New Leads" value="137" icon={<span>👥</span>} color="#059669" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Active Campaigns</h2>
          <DataTable 
            columns={[
              { key: 'name', label: 'Campaign' },
              { key: 'spend', label: 'Spend', render: v => `$${v}` },
              { key: 'leads', label: 'Leads' },
              { key: 'costPerLead', label: 'CPL', render: v => `$${v}` },
              { key: 'status', label: 'Status' },
            ]}
            data={campaigns}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Content Calendar</h2>
          <div className="space-y-3">
            {[
              { date: 'May 31', title: 'Blog: Top 5 Estate Planning Tips', platform: 'Website', status: 'Scheduled' },
              { date: 'June 1', title: 'Video: How IUL Works', platform: 'Instagram', status: 'Draft' },
              { date: 'June 3', title: 'LinkedIn: Case Study - High Net Worth', platform: 'LinkedIn', status: 'Ready' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.date} • {item.platform}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
