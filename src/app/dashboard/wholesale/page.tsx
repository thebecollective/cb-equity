'use client'

import { useState } from 'react'
import Link from 'next/link'
import StatsCard from '@/components/dashboard/StatsCard'

export default function WholesaleHub() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Wholesale Distribution Hub</h1>
        <p className="text-gray-500">Manage product distribution, advisor relationships, and wholesale volume.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total AUM Distributed" value="$42.5M" icon={<span>📈</span>} color="#1e3a5f" />
        <StatsCard title="Active Advisor Network" value="128" icon={<span>👥</span>} color="#c9a84c" />
        <StatsCard title="Pending Placements" value="24" icon={<span>⏳</span>} color="#059669" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/wholesale/products" className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#1e3a5f] transition-all shadow-sm hover:shadow-md">
          <div className="text-3xl mb-4">📦</div>
          <h3 className="text-lg font-bold group-hover:text-[#1e3a5f]">Product Catalog</h3>
          <p className="text-sm text-gray-500 mt-2">Manage annuities, fixed income, and carrier laisons.</p>
        </Link>
        <Link href="/dashboard/wholesale/advisors" className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#1e3a5f] transition-all shadow-sm hover:shadow-md">
          <div className="text-3xl mb-4">🤝</div>
          <h3 className="text-lg font-bold group-hover:text-[#1e3a5f]">Advisor CRM</h3>
          <p className="text-sm text-gray-500 mt-2">Track advisor performance and licensing status.</p>
        </Link>
        <Link href="/dashboard/wholesale/orders" className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#1e3a5f] transition-all shadow-sm hover:shadow-md">
          <div className="text-3xl mb-4">📝</div>
          <h3 className="text-lg font-bold group-hover:text-[#1e3a5f]">Order Tracking</h3>
          <p className="text-sm text-gray-500 mt-2">Monitor pending and issued wholesale placements.</p>
        </Link>
      </div>
    </div>
  )
}
