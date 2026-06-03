'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import StatsCard from '@/components/dashboard/StatsCard'
import DataTable from '@/components/dashboard/DataTable'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ClientProfile() {
  const { id } = useParams()
  const [client, setClient] = useState<any>(null)
  const [planning, setPlanning] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClientData() {
      try {
        const [clientRes, planningRes, ordersRes] = await Promise.all([
          fetch(`/api/clients/${id}`),
          fetch('/api/planning'),
          fetch('/api/orders')
        ])

        const clientData = await clientRes.json()
        const planningData = await planningRes.json()
        const ordersData = await ordersRes.json()

        setClient(clientData)
        setPlanning(planningData.filter((p: any) => p.userId === id))
        setOrders(ordersData.filter((o: any) => o.client_id === id))
      } catch (err) {
        console.error("Error fetching client 360 data:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchClientData()
  }, [id])

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Client 360 Profile...</div>
  if (!client) return <div className="p-8 text-center text-red-500">Client not found.</div>

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard/clients" className="text-sm text-[#1e3a5f] hover:underline flex items-center gap-1 mb-2">
            ← Back to Clients
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
          <p className="text-gray-500">{client.email} • {client.phone || 'No phone'} • {client.status}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Edit Profile</button>
          <button className="px-4 py-2 gradient-bg text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors">Schedule Call</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Client Status" value={client.status.toUpperCase()} icon={<span>👤</span>} color="#1e3a5f" />
        <StatsCard title="Total Orders" value={orders.length} icon={<span>📦</span>} color="#c9a84c" />
        <StatsCard title="Planning Goals" value={planning.length} icon={<span>🎯</span>} color="#059669" />
        <StatsCard title="Relationship" value={client.tags?.length ? client.tags.join(', ') : 'Standard'} icon={<span>🤝</span>} color="#1e3a5f" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Planning Summary</h3>
            {planning.length > 0 ? (
              <div className="space-y-4">
                {planning.map((p, i) => (
                  <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{p.type} strategy</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {p.data.netWorth ? `$${p.data.netWorth.toLocaleString()}` : 
                         p.data.projectedSavings ? `$${p.data.projectedSavings.toLocaleString()}` : 
                         p.data.taxSavings ? `Saved: $${p.data.taxSavings.toLocaleString()}` : 
                         'Active'}
                      </p>
                      <Link href="/dashboard/planning" className="text-xs text-[#1e3a5f] font-bold hover:underline">View Detail →</Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400 text-sm">No financial plans on file.</div>
            )}
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order History</h3>
            {orders.length > 0 ? (
              <DataTable 
                columns={[
                  { key: 'product_id', label: 'Product' },
                  { key: 'amount', label: 'Amount', render: v => `$${Number(v).toLocaleString()}` },
                  { key: 'status', label: 'Status' },
                  { key: 'created_at', label: 'Date' },
                ]}
                data={orders}
              />
            ) : (
              <div className="py-8 text-center text-gray-400 text-sm">No orders placed.</div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Client Notes</h3>
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-sm text-yellow-800 leading-relaxed">
              {client.notes || "No internal notes for this client."}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors">Add Note</button>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <button className="w-full py-2 px-4 text-left text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">📧 Send Email</button>
              <button className="w-full py-2 px-4 text-left text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">📞 Log Call</button>
              <button className="w-full py-2 px-4 text-left text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">📁 Upload Document</button>
              <button className="w-full py-2 px-4 text-left text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">🚩 Mark as At-Risk</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
