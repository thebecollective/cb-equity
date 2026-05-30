'use client'

import { useState } from 'react'
import StatsCard from '@/components/dashboard/StatsCard'

export default function FinanceHub() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Finance & Treasury</h1>
        <p className="text-gray-500">Firm-wide P&L, commission auditing, and revenue forecasting.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Gross Firm Revenue" value="$1.2M" icon={<span>💰</span>} color="#059669" />
        <StatsCard title="Total Commissions Paid" value="$850K" icon={<span>💸</span>} color="#dc2626" />
        <StatsCard title="Net Profit Margin" value="31%" icon={<span>📈</span>} color="#1e3a5f" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue Forecast (Q3)</h2>
          <div className="space-y-4">
             {[
               { label: 'Insurance Premiums', value: '$400K', status: 'On Track' },
               { label: 'Securities AUM Fees', value: '$250K', status: 'Behind' },
               { label: 'Annuity Payouts', value: '$150K', status: 'Exceeded' },
             ].map(item => (
               <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                 <span className="text-sm font-medium">{item.label}</span>
                 <div className="flex items-center gap-3">
                   <span className="text-sm font-bold">{item.value}</span>
                   <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.status === 'Exceeded' ? 'bg-green-100 text-green-700' : item.status === 'Behind' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{item.status}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Expense Breakdown</h2>
          <div className="space-y-3">
            {[
              { category: 'Tech Stack', amount: '$1,200/mo', color: 'bg-blue-500' },
              { category: 'Marketing Spend', amount: '$3,500/mo', color: 'bg-purple-500' },
              { category: 'Compliance/Legal', amount: '$800/mo', color: 'bg-amber-500' },
            ].map(item => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-600">{item.category}</span>
                </div>
                <span className="text-sm font-bold">{item.amount}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors">Download Full P&L Statement</button>
        </div>
      </div>
    </div>
  )
}
