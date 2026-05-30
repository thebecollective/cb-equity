'use client'

import { useEffect, useState, useCallback } from 'react'
import DataTable from '@/components/dashboard/DataTable'
import Modal from '@/components/dashboard/Modal'
import StatsCard from '@/components/dashboard/StatsCard'

interface Referral {
  id: string
  userId: string
  partnerName: string
  partnerType: 'real_estate' | 'cpa' | 'attorney'
  partnerEmail: string
  partnerPhone: string
  clientName: string
  clientEmail: string
  clientPhone: string
  status: 'pending' | 'contacted' | 'converted' | 'closed'
  commission: number
  createdAt: string
  updatedAt: string
}

interface ReferralForm {
  partnerName: string
  partnerType: 'real_estate' | 'cpa' | 'attorney'
  partnerEmail: string
  partnerPhone: string
  clientName: string
  clientEmail: string
  clientPhone: string
  status: 'pending' | 'contacted' | 'converted' | 'closed'
  commission: number
}

const emptyForm: ReferralForm = {
  partnerName: '',
  partnerType: 'real_estate',
  partnerEmail: '',
  partnerPhone: '',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  status: 'pending',
  commission: 0,
}

const statusTabs = ['All', 'Pending', 'Contacted', 'Converted', 'Closed'] as const
const partnerTypeTabs = ['All', 'Real Estate', 'CPA', 'Attorney'] as const

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  contacted: 'bg-blue-50 text-blue-700',
  converted: 'bg-green-50 text-green-700',
  closed: 'bg-gray-50 text-gray-600',
}

const partnerTypeLabels: Record<string, string> = {
  real_estate: 'Real Estate',
  cpa: 'CPA',
  attorney: 'Attorney',
}

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [statusTab, setStatusTab] = useState('All')
  const [typeTab, setTypeTab] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null)
  const [form, setForm] = useState<ReferralForm>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchReferrals = useCallback(async () => {
    try {
      const res = await fetch('/api/referrals')
      const data = await res.json()
      setReferrals(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch referrals', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReferrals()
  }, [fetchReferrals])

  const openAddModal = () => {
    setEditingReferral(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEditModal = (referral: Referral) => {
    setEditingReferral(referral)
    setForm({
      partnerName: referral.partnerName,
      partnerType: referral.partnerType,
      partnerEmail: referral.partnerEmail,
      partnerPhone: referral.partnerPhone || '',
      clientName: referral.clientName,
      clientEmail: referral.clientEmail,
      clientPhone: referral.clientPhone || '',
      status: referral.status,
      commission: referral.commission,
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingReferral) {
        const res = await fetch(`/api/referrals/${editingReferral.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Failed to update referral')
      } else {
        const res = await fetch('/api/referrals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Failed to create referral')
      }

      setModalOpen(false)
      await fetchReferrals()
    } catch (err) {
      console.error('Error saving referral', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this referral?')) return

    try {
      const res = await fetch(`/api/referrals/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete referral')
      await fetchReferrals()
    } catch (err) {
      console.error('Error deleting referral', err)
    }
  }

  const filteredReferrals = referrals.filter((r) => {
    if (statusTab !== 'All' && r.status !== statusTab.toLowerCase()) return false
    if (typeTab !== 'All') {
      const typeMap: Record<string, string> = {
        'Real Estate': 'real_estate',
        'CPA': 'cpa',
        'Attorney': 'attorney',
      }
      if (r.partnerType !== typeMap[typeTab]) return false
    }
    return true
  })

  const totalReferrals = referrals.length
  const activeReferrals = referrals.filter((r) => r.status === 'pending' || r.status === 'contacted').length
  const totalCommissionProjected = referrals
    .filter((r) => r.status !== 'closed')
    .reduce((sum, r) => sum + r.commission, 0)

  const payouts = referrals.filter((r) => r.status === 'converted' || r.status === 'closed')

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
          <p className="text-sm text-gray-500 mt-1">{totalReferrals} total referrals</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 transition-colors"
        >
          Add Referral
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Total Referrals"
          value={totalReferrals}
          icon={<span>📋</span>}
        />
        <StatsCard
          title="Active Referrals"
          value={activeReferrals}
          icon={<span>🔄</span>}
        />
        <StatsCard
          title="Total Commission Projected"
          value={`$${totalCommissionProjected.toLocaleString()}`}
          icon={<span>💰</span>}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Status</span>
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                statusTab === tab
                  ? 'bg-[#1e3a5f] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Partner Type</span>
          {partnerTypeTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setTypeTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                typeTab === tab
                  ? 'bg-[#1e3a5f] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'partnerName', label: 'Partner Name' },
          {
            key: 'partnerType',
            label: 'Partner Type',
            render: (referral: Referral) => (
              <span className="text-sm">{partnerTypeLabels[referral.partnerType] || referral.partnerType}</span>
            ),
          },
          { key: 'partnerEmail', label: 'Partner Email' },
          { key: 'clientName', label: 'Client Name' },
          {
            key: 'status',
            label: 'Status',
            render: (referral: Referral) => (
              <span
                className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                  statusColors[referral.status] || 'bg-gray-50 text-gray-600'
                }`}
              >
                {referral.status}
              </span>
            ),
          },
          {
            key: 'commission',
            label: 'Commission ($)',
            render: (referral: Referral) => (
              <span className="font-medium">${referral.commission.toLocaleString()}</span>
            ),
          },
          {
            key: 'createdAt',
            label: 'Created',
            render: (referral: Referral) =>
              new Date(referral.createdAt).toLocaleDateString(),
          },
        ]}
        data={filteredReferrals}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {payouts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Referral Payouts</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
            {payouts.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{p.partnerName}</p>
                  <p className="text-xs text-gray-500">{p.clientName} &middot; {new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">${p.commission.toLocaleString()}</p>
                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${
                      statusColors[p.status] || 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingReferral ? 'Edit Referral' : 'Add Referral'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset>
            <legend className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100 w-full">Partner Information</legend>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name</label>
                <input
                  type="text"
                  required
                  value={form.partnerName}
                  onChange={(e) => setForm({ ...form, partnerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Type</label>
                <select
                  value={form.partnerType}
                  onChange={(e) => setForm({ ...form, partnerType: e.target.value as ReferralForm['partnerType'] })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                >
                  <option value="real_estate">Real Estate</option>
                  <option value="cpa">CPA</option>
                  <option value="attorney">Attorney</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Email</label>
                <input
                  type="email"
                  required
                  value={form.partnerEmail}
                  onChange={(e) => setForm({ ...form, partnerEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Phone</label>
                <input
                  type="tel"
                  value={form.partnerPhone}
                  onChange={(e) => setForm({ ...form, partnerPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100 w-full">Client Information</legend>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
                <input
                  type="email"
                  required
                  value={form.clientEmail}
                  onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Phone</label>
                <input
                  type="tel"
                  value={form.clientPhone}
                  onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100 w-full">Details</legend>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as ReferralForm['status'] })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Commission ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={form.commission}
                  onChange={(e) => setForm({ ...form, commission: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
            </div>
          </fieldset>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving...' : editingReferral ? 'Update Referral' : 'Add Referral'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
