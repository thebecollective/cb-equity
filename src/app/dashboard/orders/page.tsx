'use client'

import { useEffect, useState, useCallback } from 'react'
import DataTable from '@/components/dashboard/DataTable'
import Modal from '@/components/dashboard/Modal'
import StatsCard from '@/components/dashboard/StatsCard'

interface Order {
  id: string
  userId: string
  clientId: string
  productId?: string
  productName: string
  productType: 'insurance' | 'securities' | 'annuity' | 'mutual_fund'
  amount: number
  commission: number
  status: 'pending' | 'executed' | 'cancelled'
  createdAt: string
}

interface OrderForm {
  productName: string
  productType: 'insurance' | 'securities' | 'annuity' | 'mutual_fund'
  clientId: string
  amount: number
  commissionRate: number
  commission: number
  status: 'pending' | 'executed' | 'cancelled'
}

const emptyForm: OrderForm = {
  productName: '',
  productType: 'insurance',
  clientId: '',
  amount: 0,
  commissionRate: 0,
  commission: 0,
  status: 'pending',
}

const statusTabs = ['All', 'Pending', 'Executed', 'Cancelled'] as const

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  executed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-600',
}

const productTypeLabels: Record<string, string> = {
  insurance: 'Insurance',
  securities: 'Securities',
  annuity: 'Annuity',
  mutual_fund: 'Mutual Fund',
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusTab, setStatusTab] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [form, setForm] = useState<OrderForm>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch orders', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const openAddModal = () => {
    setEditingOrder(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEditModal = (order: Order) => {
    const rate = order.amount > 0 ? (order.commission / order.amount) * 100 : 0
    setEditingOrder(order)
    setForm({
      productName: order.productName,
      productType: order.productType,
      clientId: order.clientId,
      amount: order.amount,
      commissionRate: Math.round(rate * 100) / 100,
      commission: order.commission,
      status: order.status,
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      productName: form.productName,
      productType: form.productType,
      clientId: form.clientId,
      amount: form.amount,
      commission: form.commission,
      status: form.status,
    }

    try {
      if (editingOrder) {
        const res = await fetch(`/api/orders/${editingOrder.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Failed to update order')
      } else {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Failed to create order')
      }

      setModalOpen(false)
      await fetchOrders()
    } catch (err) {
      console.error('Error saving order', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete order')
      await fetchOrders()
    } catch (err) {
      console.error('Error deleting order', err)
    }
  }

  const updateCommission = (amount: number, rate: number) => {
    setForm((prev) => ({
      ...prev,
      amount,
      commissionRate: rate,
      commission: Math.round((amount * rate) / 100 * 100) / 100,
    }))
  }

  const filteredOrders = orders.filter((o) => {
    if (statusTab !== 'All' && o.status !== statusTab.toLowerCase()) return false
    return true
  })

  const totalOrders = orders.length
  const totalVolume = orders.reduce((sum, o) => sum + o.amount, 0)
  const totalCommissions = orders.reduce((sum, o) => sum + o.commission, 0)

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
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">{totalOrders} total orders</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 transition-colors"
        >
          Place Order
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Total Orders"
          value={totalOrders}
          icon={<span>📋</span>}
        />
        <StatsCard
          title="Total Volume"
          value={`$${totalVolume.toLocaleString()}`}
          icon={<span>💵</span>}
        />
        <StatsCard
          title="Total Commissions"
          value={`$${totalCommissions.toLocaleString()}`}
          icon={<span>💰</span>}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center gap-2">
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
      </div>

      <DataTable
        columns={[
          { key: 'productName', label: 'Product Name' },
          {
            key: 'productType',
            label: 'Type',
            render: (order: Order) => (
              <span className="text-sm">{productTypeLabels[order.productType] || order.productType}</span>
            ),
          },
          { key: 'clientId', label: 'Client ID' },
          {
            key: 'amount',
            label: 'Amount ($)',
            render: (order: Order) => (
              <span className="font-medium">${order.amount.toLocaleString()}</span>
            ),
          },
          {
            key: 'commission',
            label: 'Commission ($)',
            render: (order: Order) => (
              <span className="font-medium">${order.commission.toLocaleString()}</span>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (order: Order) => (
              <span
                className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                  statusColors[order.status] || 'bg-gray-50 text-gray-600'
                }`}
              >
                {order.status}
              </span>
            ),
          },
          {
            key: 'createdAt',
            label: 'Created',
            render: (order: Order) =>
              new Date(order.createdAt).toLocaleDateString(),
          },
        ]}
        data={filteredOrders}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingOrder ? 'Edit Order' : 'Place Order'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              required
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
            <select
              value={form.productType}
              onChange={(e) => setForm({ ...form, productType: e.target.value as OrderForm['productType'] })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            >
              <option value="insurance">Insurance</option>
              <option value="securities">Securities</option>
              <option value="annuity">Annuity</option>
              <option value="mutual_fund">Mutual Fund</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
            <input
              type="text"
              required
              value={form.clientId}
              onChange={(e) => setForm({ ...form, clientId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={form.amount || ''}
              onChange={(e) => updateCommission(parseFloat(e.target.value) || 0, form.commissionRate)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commission Rate <span className="text-gray-400 font-normal">(%)</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={form.commissionRate || ''}
              onChange={(e) => updateCommission(form.amount, parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Commission ($)</label>
            <div className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-700 font-medium">
              ${form.commission.toLocaleString()}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as OrderForm['status'] })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            >
              <option value="pending">Pending</option>
              <option value="executed">Executed</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
              {saving ? 'Saving...' : editingOrder ? 'Update Order' : 'Place Order'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
