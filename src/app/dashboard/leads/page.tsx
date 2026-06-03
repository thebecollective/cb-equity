'use client'

import { useEffect, useState, useCallback } from 'react'
import DataTable from '@/components/dashboard/DataTable'
import Modal from '@/components/dashboard/Modal'
import StatsCard from '@/components/dashboard/StatsCard'

interface Lead {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  source: string
  interest: string[]
  notes: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost'
  value: number
  probability: number // New: 0 to 100%
  createdAt: string
  updatedAt: string
}

// AI Lead Scoring Logic
const calculateLeadScore = (lead: Lead) => {
  let score = 0
  // Value Score (Higher value = higher score)
  if (lead.value > 100000) score += 40
  else if (lead.value > 50000) score += 20
  else if (lead.value > 0) score += 10

  // Status Score (Further in pipeline = higher score)
  const statusWeights = { new: 10, contacted: 20, qualified: 40, proposal: 70, closed: 100, lost: 0 }
  score += statusWeights[lead.status] || 0

  // Source Score (Qualified sources)
  if (lead.source === 'referral') score += 30
  else if (lead.source === 'website') score += 15

  return Math.min(score, 100)
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600 bg-green-50 border-green-200'
  if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200'
  return 'text-gray-600 bg-gray-50 border-gray-200'
}

interface LeadForm {

  name: string
  email: string
  phone: string
  source: string
  interest: string
  notes: string
  status: string
  value: string
}

const emptyForm: LeadForm = {
  name: '', email: '', phone: '', source: 'website', interest: '', notes: '', status: 'new', value: '',
}

const pipelineStages = [
  { id: 'new', label: 'New Leads', color: 'bg-blue-500' },
  { id: 'contacted', label: 'Contacted', color: 'bg-yellow-500' },
  { id: 'qualified', label: 'Qualified', color: 'bg-indigo-500' },
  { id: 'proposal', label: 'Proposal', color: 'bg-purple-500' },
  { id: 'closed', label: 'Closed', color: 'bg-green-500' },
  { id: 'lost', label: 'Lost', color: 'bg-red-500' },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'table' | 'pipeline'>('pipeline')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [form, setForm] = useState<LeadForm>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      setLeads(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const body = { ...form, interest: form.interest.split(',').map(i => i.trim()) }
      const url = editingLead ? `/api/leads/${editingLead.id}` : '/api/leads'
      const method = editingLead ? 'PATCH' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed to save lead')
      setModalOpen(false)
      await fetchLeads()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      await fetchLeads()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" /></div>

  const totalPipelineValue = leads.reduce((sum, l) => sum + (l.value || 0), 0)
  const weightedPipeline = leads.reduce((sum, l) => sum + ((l.value || 0) * ((l.probability || 0) / 100)), 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard title="Total Pipeline" value={`$${totalPipelineValue.toLocaleString()}`} icon={<span>💰</span>} color="#1e3a5f" />
        <StatsCard title="Weighted Forecast" value={`$${weightedPipeline.toLocaleString()}`} icon={<span>📈</span>} color="#059669" />
        <StatsCard title="Avg. Closing Rate" value="24%" icon={<span>🎯</span>} color="#c9a84c" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Pipeline</h1>
          <p className="text-sm text-gray-500">Manage your prospective clients and track sales progress.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-gray-200 rounded-lg p-1">
            <button onClick={() => setView('table')} className={`px-3 py-1 text-xs font-medium rounded-md ${view === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'}`}>Table</button>
            <button onClick={() => setView('pipeline')} className={`px-3 py-1 text-xs font-medium rounded-md ${view === 'pipeline' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'}`}>Pipeline</button>
          </div>
          <button onClick={() => { setEditingLead(null); setForm(emptyForm); setModalOpen(true); }} className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90">Add Lead</button>
        </div>
      </div>

      {view === 'table' ? (
        <DataTable 
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { 
              key: 'score', 
              label: 'AI Score', 
              render: (l) => {
                const score = calculateLeadScore(l)
                return <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getScoreColor(score)}`}>{score}%</span>
              } 
            },
            { key: 'status', label: 'Status', render: (l) => <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">{l.status}</span> },
            { key: 'value', label: 'Value', render: (l) => `$${l.value?.toLocaleString()}` },
            { key: 'source', label: 'Source' },
          ]}
          data={leads}
          onEdit={(l) => { setEditingLead(l); setForm({
            name: l.name, email: l.email, phone: l.phone, source: l.source, interest: l.interest.join(', '), notes: l.notes, status: l.status, value: l.value.toString()
          }); setModalOpen(true); }}
          onDelete={async (id) => { if(confirm('Delete lead?')) { await fetch(`/api/leads/${id}`, { method: 'DELETE' }); fetchLeads(); }}}
        />
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {pipelineStages.map(stage => (
            <div key={stage.id} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-2">
                <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">{stage.label}</h3>
                <span className="text-xs bg-gray-200 px-1.5 rounded-full text-gray-600">{leads.filter(l => l.status === stage.id).length}</span>
              </div>
              <div className="space-y-3 min-h-[500px] bg-gray-50 rounded-xl p-2 border border-gray-100">
                {leads.filter(l => l.status === stage.id).map(lead => (
                  <div key={lead.id} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-[#1e3a5f] transition-colors group cursor-pointer">
                    <p className="text-sm font-bold text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-green-600">${lead.value?.toLocaleString()}</span>
                      <select 
                        className="text-[10px] border-none bg-transparent outline-none text-gray-400 hover:text-gray-600"
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      >
                        {pipelineStages.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingLead ? 'Edit Lead' : 'Add New Lead'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Value ($)</label>
              <input type="number" value={form.value} onChange={e => setForm({...form, value: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Interests (comma separated)</label>
            <input type="text" value={form.interest} onChange={e => setForm({...form, interest: e.target.value})} placeholder="e.g. IUL, Retirement, Wealth" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
            <textarea rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-500">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Lead'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
