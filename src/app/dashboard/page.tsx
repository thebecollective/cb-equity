'use client'

import { useEffect, useState } from 'react'
import StatsCard from '@/components/dashboard/StatsCard'

interface Client {
  id: string
  name: string
  email: string
  createdAt: string
}

interface Lead {
  id: string
  name: string
  status: string
  createdAt: string
}

interface Commission {
  id: string
  amount: number
  status: string
}

interface Referral {
  id: string
  status: string
}

interface DashboardData {
  clients: Client[]
  leads: Lead[]
  commissions: Commission[]
  referrals: Referral[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [clientsRes, leadsRes, commissionsRes, referralsRes] = await Promise.all([
          fetch('/api/clients'),
          fetch('/api/leads'),
          fetch('/api/commissions'),
          fetch('/api/referrals'),
        ])

        const [clients, leads, commissions, referrals] = await Promise.all([
          clientsRes.json(),
          leadsRes.json(),
          commissionsRes.json(),
          referralsRes.json(),
        ])

        setData({ clients, leads, commissions, referrals })
      } catch (err) {
        console.error('Failed to load dashboard data', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const totalClients = data?.clients?.length ?? 0
  const activeLeads = data?.leads?.filter((l) => l.status !== 'lost').length ?? 0
  const pendingCommissions =
    data?.commissions
      ?.filter((c) => c.status === 'pending')
      .reduce((sum, c) => sum + c.amount, 0) ?? 0
  const openReferrals = data?.referrals?.filter((r) => r.status !== 'closed').length ?? 0
  const totalRevenue =
    data?.commissions
      ?.filter((c) => c.status === 'paid')
      .reduce((sum, c) => sum + c.amount, 0) ?? 0

  const recentLeads = [...(data?.leads ?? [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const recentClients = [...(data?.clients ?? [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <StatsCard
          title="Total Clients"
          value={totalClients}
          icon="👥"
          color="#1e3a5f"
        />
        <StatsCard
          title="Active Leads"
          value={activeLeads}
          icon="📋"
          color="#059669"
        />
        <StatsCard
          title="Pending Commissions"
          value={`$${pendingCommissions.toLocaleString()}`}
          icon="💰"
          color="#c9a84c"
        />
        <StatsCard
          title="Open Referrals"
          value={openReferrals}
          icon="🔗"
          color="#2d5a8e"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon="📈"
          color="#059669"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h2>
          {recentLeads.length === 0 ? (
            <p className="text-sm text-gray-400">No leads yet</p>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      lead.status === 'new'
                        ? 'bg-blue-50 text-blue-700'
                        : lead.status === 'contacted'
                        ? 'bg-yellow-50 text-yellow-700'
                        : lead.status === 'qualified'
                        ? 'bg-green-50 text-green-700'
                        : lead.status === 'lost'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Clients</h2>
          {recentClients.length === 0 ? (
            <p className="text-sm text-gray-400">No clients yet</p>
          ) : (
            <div className="space-y-3">
              {recentClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{client.name}</p>
                    <p className="text-xs text-gray-500">{client.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
