'use client'

import { useEffect, useState, useCallback } from 'react'
import DataTable from '@/components/dashboard/DataTable'
import Modal from '@/components/dashboard/Modal'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  notes: string
  status: string
  tags: string
  createdAt: string
}

interface ClientForm {
  name: string
  email: string
  phone: string
  address: string
  notes: string
  status: string
  tags: string
}

const emptyForm: ClientForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
  status: 'active',
  tags: '',
}

const statusOptions = ['active', 'inactive', 'lead', 'prospect']

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [form, setForm] = useState<ClientForm>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch('/api/clients')
      const data = await res.json()
      setClients(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch clients', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  const openAddModal = () => {
    setEditingClient(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEditModal = (client: Client) => {
    setEditingClient(client)
    setForm({
      name: client.name,
      email: client.email,
      phone: client.phone || '',
      address: client.address || '',
      notes: client.notes || '',
      status: client.status || 'active',
      tags: client.tags || '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingClient) {
        const res = await fetch(`/api/clients/${editingClient.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Failed to update client')
      } else {
        const res = await fetch('/api/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Failed to create client')
      }

      setModalOpen(false)
      await fetchClients()
    } catch (err) {
      console.error('Error saving client', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return

    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete client')
      await fetchClients()
    } catch (err) {
      console.error('Error deleting client', err)
    }
  }

  const filteredClients = clients.filter((c) => {
    if (!search) return true
    const q = search.toLowerCase()
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  })

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
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-500 mt-1">{clients.length} total clients</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 transition-colors"
        >
          Add Client
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
        />
      </div>

      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          {
            key: 'status',
            label: 'Status',
            render: (client: Client) => (
              <span
                className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                  client.status === 'active'
                    ? 'bg-green-50 text-green-700'
                    : client.status === 'inactive'
                    ? 'bg-gray-50 text-gray-600'
                    : client.status === 'lead'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-yellow-50 text-yellow-700'
                }`}
              >
                {client.status}
              </span>
            ),
          },
          {
            key: 'tags',
            label: 'Tags',
            render: (client: Client) =>
              client.tags ? (
                <div className="flex flex-wrap gap-1">
                  {client.tags.split(',').map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 bg-[#1e3a5f]/5 text-[#1e3a5f] rounded"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              ) : null,
          },
          {
            key: 'createdAt',
            label: 'Created',
            render: (client: Client) =>
              client.createdAt ? new Date(client.createdAt).toLocaleDateString() : '',
          },
        ]}
        data={filteredClients}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingClient ? 'Edit Client' : 'Add Client'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags <span className="text-gray-400 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="e.g. vip, referral, high-net-worth"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none"
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
              {saving ? 'Saving...' : editingClient ? 'Update Client' : 'Add Client'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
