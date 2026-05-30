'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/dashboard/DataTable'
import StatsCard from '@/components/dashboard/StatsCard'
import Modal from '@/components/dashboard/Modal'

export default function MarketingCampaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', budget: '', start_date: '', end_date: '' })

  useEffect(() => {
    async function fetchCampaigns() {
      const res = await fetch('/api/marketing/campaigns')
      const data = await res.json()
      setCampaigns(data)
    }
    fetchCampaigns()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/marketing/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setModalOpen(false)
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Campaign ROI Manager</h1>
          <p className="text-sm text-gray-500">Track ad spend vs. revenue generated per channel.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg text-sm font-medium">New Campaign</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Ad Spend" value="$12,400" icon={<span>💸</span>} color="#dc2626" />
        <StatsCard title="CPA (Avg)" value="$42.10" icon={<span>🎯</span>} color="#1e3a5f" />
        <StatsCard title="Marketing ROI" value="4.2x" icon={<span>📈</span>} color="#059669" />
      </div>

      <DataTable 
        columns={[
          { key: 'name', label: 'Campaign' },
          { key: 'budget', label: 'Budget', render: v => `$${v}` },
          { key: 'actual_spend', label: 'Actual Spend', render: v => `$${v}` },
          { key: 'leads_generated', label: 'Leads', render: v => v },
          { key: 'revenue_attributed', label: 'Revenue', render: v => `$${v}` },
          { key: 'status', label: 'Status', render: v => (
            <span className={`text-xs px-2 py-1 rounded-full ${v === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {v}
            </span>
          )},
        ]}
        data={campaigns}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Campaign">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Campaign Name</label>
            <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Budget ($)</label>
            <input type="number" required value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
              <input type="date" required value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
              <input type="date" required value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
            </div>
          </div>
          <button type="submit" className="w-full py-2 bg-[#1e3a5f] text-white rounded-lg font-medium">Launch Campaign</button>
        </form>
      </Modal>
    </div>
  )
}
