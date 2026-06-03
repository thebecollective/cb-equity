'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, FileText, Sparkles, Download, Plus } from 'lucide-react'

interface CaseStudy {
  id: string
  clientName: string
  challenge: string
  strategy: string
  outcome: string
  category: string
  date: string
}

export default function CaseStudyBuilder() {
  const [studies, setStudies] = useState<CaseStudy[]>([
    {
      id: '1',
      clientName: 'The Miller Family',
      challenge: 'High taxable income with an inefficient estate structure and excessive risk in a single stock.',
      strategy: 'Implemented a diversified fixed-income ladder and established a Revocable Living Trust to minimize probate.',
      outcome: 'Reduced projected estate tax by $1.2M and increased annual passive income by 15%.',
      category: 'Estate Planning',
      date: '2024-03-12',
    },
  ])
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState({
    clientName: '',
    challenge: '',
    strategy: '',
    outcome: '',
    category: 'Tax Optimization',
  })

  const handleSave = () => {
    const newStudy: CaseStudy = {
      id: Math.random().toString(36).substr(2, 9),
      ...form,
      date: new Date().toISOString().split('T')[0],
    }
    setStudies([newStudy, ...studies])
    setIsCreating(false)
    setForm({ clientName: '', challenge: '', strategy: '', outcome: '', category: 'Tax Optimization' })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Case Study Builder</h1>
          <p className="text-gray-500">Transform complex client wins into professional marketing assets.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 gradient-bg text-white rounded-xl font-bold hover:opacity-90 transition-all"
        >
          <Plus size={18} /> Create Case Study
        </button>
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="text-[#c9a84c]" size={20} /> New Client Success Story
              </h2>
              <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Client / Alias</label>
                  <input 
                    type="text" 
                    value={form.clientName} 
                    onChange={e => setForm({...form, clientName: e.target.value})}
                    placeholder="e.g. The Smith Family"
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                  <select 
                    value={form.category} 
                    onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                  >
                    <option>Tax Optimization</option>
                    <option>Estate Planning</option>
                    <option>Retirement Income</option>
                    <option>Risk Management</option>
                    <option>Fixed Income</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">The Challenge</label>
                  <textarea 
                    rows={3}
                    value={form.challenge} 
                    onChange={e => setForm({...form, challenge: e.target.value})}
                    placeholder="Describe the client's pain points..."
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">The CB Equity Strategy</label>
                  <textarea 
                    rows={3}
                    value={form.strategy} 
                    onChange={e => setForm({...form, strategy: e.target.value})}
                    placeholder="How did you solve it?"
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">The Outcome</label>
                  <textarea 
                    rows={3}
                    value={form.outcome} 
                    onChange={e => setForm({...form, outcome: e.target.value})}
                    placeholder="Quantifiable results (e.g. $200k saved)"
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setIsCreating(false)} className="px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Cancel</button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 gradient-bg text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                <Save size={18} /> Save Case Study
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies.map((s) => (
          <motion.div 
            key={s.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded-full">
                {s.category}
              </span>
              <span className="text-xs text-gray-400">{s.date}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="text-[#c9a84c]" size={20} /> {s.clientName}
            </h3>
            <div className="space-y-4 flex-1">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Challenge</p>
                <p className="text-sm text-gray-600 leading-relaxed">{s.challenge}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Solution</p>
                <p className="text-sm text-gray-800 leading-relaxed font-medium">{s.strategy}</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Outcome</p>
                <p className="text-sm text-emerald-800 font-bold">{s.outcome}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t flex justify-end">
              <button className="flex items-center gap-2 text-xs font-bold text-[#1e3a5f] hover:text-[#c9a84c] transition-colors">
                <Download size={14} /> Export PDF
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
