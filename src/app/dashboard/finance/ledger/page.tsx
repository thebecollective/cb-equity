'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/dashboard/DataTable'
import Modal from '@/components/dashboard/Modal'

export default function FinanceLedger() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ amount: '', type: 'income', category: 'commission', description: '', date: new Date().toISOString().split('T')[0] })

  useEffect(() => {
    async function fetchLedger() {
      const res = await fetch('/api/finance/transactions')
      const data = await res.json()
      setTransactions(data)
    }
    fetchLedger()
  }, [])

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/finance/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setModalOpen(false)
    // refresh data
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Firm Ledger</h1>
        <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg text-sm font-medium">Add Transaction</button>
      </div>

      <DataTable 
        columns={[
          { key: 'date', label: 'Date' },
          { key: 'category', label: 'Category' },
          { key: 'description', label: 'Description' },
          { key: 'amount', label: 'Amount', render: (t) => (
            <span className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
              {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
            </span>
          )},
          { key: 'type', label: 'Type' },
        ]}
        data={transactions}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="New Ledger Entry">
        <form onSubmit={handleAddTransaction} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Amount ($)</label>
            <input type="number" required value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
            <input type="text" required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" placeholder="e.g. Marketing, Rent, Commission" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
          </div>
          <button type="submit" className="w-full py-2 bg-[#1e3a5f] text-white rounded-lg font-medium">Record Transaction</button>
        </form>
      </Modal>
    </div>
  )
}
