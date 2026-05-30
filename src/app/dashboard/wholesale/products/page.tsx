'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/dashboard/DataTable'
import Modal from '@/components/dashboard/Modal'

export default function WholesaleProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ productName: '', carrier: '', productType: 'Fixed Annuity', commissionRate: '', targetMarket: '' })

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/wholesale/products')
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/wholesale/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Wholesale Product Catalog</h1>
        <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg text-sm font-medium">Add Product</button>
      </div>

      <DataTable 
        columns={[
          { key: 'product_name', label: 'Product' },
          { key: 'carrier', label: 'Carrier' },
          { key: 'product_type', label: 'Type' },
          { key: 'commission_rate', label: 'Advisor Rate', render: v => `${v}%` },
          { key: 'target_market', label: 'Target' },
        ]}
        data={products}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Wholesale Product">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Product Name</label>
            <input type="text" required value={form.productName} onChange={e => setForm({...form, productName: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Carrier</label>
            <input type="text" required value={form.carrier} onChange={e => setForm({...form, carrier: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Product Type</label>
            <select value={form.productType} onChange={e => setForm({...form, productType: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none">
              <option value="Fixed Annuity">Fixed Annuity</option>
              <option value="Indexed Annuity">Indexed Annuity</option>
              <option value="Variable Annuity">Variable Annuity</option>
              <option value="Fixed Income">Fixed Income/Bonds</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Advisor Commission (%)</label>
            <input type="number" required value={form.commissionRate} onChange={e => setForm({...form, commissionRate: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none" />
          </div>
          <button type="submit" className="w-full py-2 bg-[#1e3a5f] text-white rounded-lg font-medium">Save Product</button>
        </form>
      </Modal>
    </div>
  )
}
