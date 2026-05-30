'use client'

import { useEffect, useState, useCallback } from 'react'
import DataTable from '@/components/dashboard/DataTable'
import Modal from '@/components/dashboard/Modal'
import StatsCard from '@/components/dashboard/StatsCard'

interface Commission {
  id: string
  userId: string
  clientId: string
  clientName: string
  type: string
  product: string
  premium: number
  rate: number
  amount: number
  status: string
  date: string
  paidAt: string
  createdAt: string
}

interface CommissionForm {
  clientName: string
  type: string
  product: string
  premium: string
  rate: string
  amount: string
  status: string
  date: string
}

const emptyForm: CommissionForm = {
  clientName: '',
  type: 'insurance',
  product: '',
  premium: '',
  rate: '',
  amount: '',
  status: 'pending',
  date: new Date().toISOString().split('T')[0],
}

const statusFilters = ['All', 'Pending', 'Paid', 'Chargeback']
const typeFilters = ['All', 'Insurance', 'Securities', 'Annuity', 'Mutual Fund']
const typeOptions = ['insurance', 'securities', 'annuity', 'mutual_fund']
const commissionStatusOptions = ['pending', 'paid', 'chargeback']

const typeLabelMap: Record<string, string> = {
  insurance: 'Insurance',
  securities: 'Securities',
  annuity: 'Annuity',
  mutual_fund: 'Mutual Fund',
}

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCommission, setEditingCommission] = useState<Commission | null>(null)
  const [form, setForm] = useState<CommissionForm>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchCommissions = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'All') params.set('status', statusFilter.toLowerCase())
      const query = params.toString()
      const res = await fetch(`/api/commissions${query ? `?${query}` : ''}`)
      const data = await res.json()
      setCommissions(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch commissions', err)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchCommissions()
  }, [fetchCommissions])

  useEffect(() => {
    const premium = parseFloat(form.premium) || 0
    const rate = parseFloat(form.rate) || 0
    const calculated = (premium * rate) / 100
    setForm((prev) => ({ ...prev, amount: calculated.toFixed(2) }))
  }, [form.premium, form.rate])

  const openAddModal = () => {
    setEditingCommission(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEditModal = (commission: Commission) => {
    setEditingCommission(commission)
    setForm({
      clientName: commission.clientName || '',
      type: commission.type || 'insurance',
      product: commission.product || '',
      premium: commission.premium ? String(commission.premium) : '',
      rate: commission.rate ? String(commission.rate) : '',
      amount: commission.amount ? String(commission.amount) : '',
      status: commission.status || 'pending',
      date: commission.date ? new Date(commission.date).toISOString().split('T')[0] : '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const body = {
      clientName: form.clientName,
      type: form.type,
      product: form.product,
      premium: form.premium ? Number(form.premium) : 0,
      rate: form.rate ? Number(form.rate) : 0,
      amount: form.amount ? Number(form.amount) : 0,
      status: form.status,
      date: form.date,
    }

    try {
      if (editingCommission) {
        const res = await fetch(`/api/commissions/${editingCommission.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Failed to update commission')
      } else {
        const res = await fetch('/api/commissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Failed to create commission')
      }

      setModalOpen(false)
      await fetchCommissions()
    } catch (err) {
      console.error('Error saving commission', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this commission?')) return

    try {
      const res = await fetch(`/api/commissions/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete commission')
      await fetchCommissions()
    } catch (err) {
      console.error('Error deleting commission', err)
    }
  }

  const displayCommissions =
    typeFilter === 'All'
      ? commissions
      : commissions.filter((c) => {
          const typeKey = typeFilter.toLowerCase().replace(' ', '_')
          return c.type === typeKey
        })

  const totals = {
    pending: commissions
      .filter((c) => c.status === 'pending')
      .reduce((sum, c) => sum + c.amount, 0),
    paid: commissions
      .filter((c) => c.status === 'paid')
      .reduce((sum, c) => sum + c.amount, 0),
    chargeback: commissions
      .filter((c) => c.status === 'chargeback')
      .reduce((sum, c) => sum + c.amount, 0),
  }
  const net = totals.paid - totals.chargeback

  const statusStyles: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700',
    paid: 'bg-green-50 text-green-700',
    chargeback: 'bg-red-50 text-red-700',
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Commissions</h1>
          <p className="text-sm text-gray-500 mt-1">{commissions.length} total commissions</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 transition-colors"
        >
          Add Commission
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Pending"
          value={`$${totals.pending.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<span>⏳</span>}
          color="#eab308"
        />
        <StatsCard
          title="Total Paid"
          value={`$${totals.paid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<span>✓</span>}
          color="#22c55e"
        />
        <StatsCard
          title="Total Chargebacks"
          value={`$${totals.chargeback.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<span>↩</span>}
          color="#ef4444"
        />
        <StatsCard
          title="Net"
          value={`$${net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<span>📊</span>}
          color="#1e3a5f"
        />
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">
          Status:
        </span>
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              statusFilter === s
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {s}
          </button>
        ))}
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-4 mr-1">
          Type:
        </span>
        {typeFilters.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              typeFilter === t
                ? 'bg-[#c9a84c] text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <DataTable
        columns={[
          { key: 'clientName', label: 'Client' },
          {
            key: 'type',
            label: 'Type',
            render: (c: Commission) => (
              <span className="text-sm capitalize">
                {typeLabelMap[c.type] || c.type.replace('_', ' ')}
              </span>
            ),
          },
          { key: 'product', label: 'Product' },
          {
            key: 'premium',
            label: 'Premium ($)',
            render: (c: Commission) => (
              <span className="text-sm font-medium text-gray-900">
                ${c.premium.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            ),
          },
          {
            key: 'rate',
            label: 'Rate (%)',
            render: (c: Commission) => (
              <span className="text-sm">{c.rate}%</span>
            ),
          },
          {
            key: 'amount',
            label: 'Amount ($)',
            render: (c: Commission) => (
              <span className="text-sm font-semibold text-gray-900">
                ${c.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (c: Commission) => (
              <span
                className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                  statusStyles[c.status] || 'bg-gray-50 text-gray-600'
                }`}
              >
                {c.status}
              </span>
            ),
          },
          {
            key: 'date',
            label: 'Date',
            render: (c: Commission) => new Date(c.date).toLocaleDateString(),
          },
          {
            key: 'paidAt',
            label: 'Paid Date',
            render: (c: Commission) =>
              c.paidAt ? new Date(c.paidAt).toLocaleDateString() : <span className="text-gray-400">—</span>,
          },
        ]}
        data={displayCommissions}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCommission ? 'Edit Commission' : 'Add Commission'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            >
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  {typeLabelMap[t] || t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <input
              type="text"
              required
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Premium ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={form.premium}
              onChange={(e) => setForm({ ...form, premium: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rate (%)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={form.rate}
              onChange={(e) => setForm({ ...form, rate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($) <span className="text-gray-400 font-normal">(auto-calculated)</span>
            </label>
            <input
              type="text"
              readOnly
              value={
                form.premium && form.rate
                  ? `$${((parseFloat(form.premium) * parseFloat(form.rate)) / 100).toFixed(2)}`
                  : '$0.00'
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            >
              {commissionStatusOptions.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
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
              {saving ? 'Saving...' : editingCommission ? 'Update Commission' : 'Add Commission'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
