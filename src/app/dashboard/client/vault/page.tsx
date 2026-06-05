"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Folder, FileText, Lock, Upload, CheckCircle2, AlertCircle, ShieldCheck, Download, Eye } from 'lucide-react'

const VAULT_FOLDERS = [
  { id: 'tax', name: 'Tax Documentation', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', required: ['2023 Tax Return', '2024 Tax Return', 'W-2 Statements'] },
  { id: 'estate', name: 'Estate & Legal', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50', required: ['Last Will & Testament', 'Living Trust', 'Healthcare Proxy'] },
  { id: 'insurance', name: 'Insurance Policies', icon: Lock, color: 'text-gold-600', bg: 'bg-gold-50', required: ['Life Policy Schedule', 'LTC Policy', 'Disability Policy'] },
  { id: 'identity', name: 'Identity & KYC', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', required: ['Passport Copy', 'Driver License', 'Social Security Card'] },
]

export default function ClientVault() {
  const [activeFolder, setActiveFolder] = useState('tax')
  const [docs, setDocs] = useState([
    { id: '1', folder: 'tax', name: '2023 Tax Return.pdf', status: 'verified', size: '1.2 MB', date: '2024-03-15' },
    { id: '2', folder: 'estate', name: 'Family Trust Final.pdf', status: 'pending', size: '4.5 MB', date: '2024-01-10' },
    { id: '3', folder: 'insurance', name: 'IUL Policy Summary.pdf', status: 'verified', size: '850 KB', date: '2024-05-20' },
  ])

  const currentFolder = VAULT_FOLDERS.find(f => f.id === activeFolder)!
  const folderDocs = docs.filter(d => d.folder === activeFolder)
  
  const missingDocs = currentFolder.required.filter(req => 
    !folderDocs.some(doc => doc.name.toLowerCase().includes(req.toLowerCase()))
  )

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-600 font-bold text-sm uppercase tracking-widest mb-1">
            <Lock className="w-4 h-4" /> Secure Encryption Active
          </div>
          <h1 className="text-3xl font-bold text-navy-900">Luxury Client Vault</h1>
          <p className="text-slate-500">Your private sanctuary for sensitive financial and legal documentation.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-navy-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-navy-900/20 transition-all"
        >
          <Upload className="w-5 h-5" /> Upload Document
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Folder Navigation */}
        <div className="lg:col-span-1 space-y-3">
          {VAULT_FOLDERS.map((folder) => (
            <button 
              key={folder.id}
              onClick={() => setActiveFolder(folder.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                activeFolder === folder.id 
                ? 'bg-white border-gold-500 shadow-md ring-1 ring-gold-500' 
                : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className={`${folder.bg} p-3 rounded-xl ${folder.color}`}>
                <folder.icon className="w-6 h-6" />
              </div>
              <span className={`font-bold ${activeFolder === folder.id ? 'text-navy-900' : 'text-slate-600'}`}>
                {folder.name}
              </span>
            </button>
          ))}
        </div>

        {/* Document Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Vault Health Warning */}
          <AnimatePresence>
            {missingDocs.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-4 text-amber-800"
              >
                <AlertCircle className="w-6 h-6 shrink-0" />
                <div className="text-sm">
                  <span className="font-bold">Vault Incomplete:</span> You are missing {missingDocs.length} required documents for {currentFolder.name}.
                  <span className="ml-2 underline cursor-pointer font-bold">View Checklist</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-navy-900 flex items-center gap-2">
                <Folder className="w-5 h-5 text-slate-400" /> {currentFolder.name}
              </h3>
              <span className="text-xs text-slate-500 font-medium">{folderDocs.length} Documents Found</span>
            </div>

            <div className="divide-y divide-slate-100">
              {folderDocs.length > 0 ? (
                folderDocs.map((doc) => (
                  <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">{doc.name}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Uploaded {doc.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {doc.status === 'verified' ? (
                        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold uppercase">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-[10px] font-bold uppercase">
                          <Clock className="w-3 h-3" /> Pending Review
                        </div>
                      )}
                      <button className="p-2 text-slate-400 hover:text-navy-900 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-navy-900 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center">
                  <div className="p-6 bg-slate-50 rounded-full inline-block mb-4">
                    <Folder className="w-12 h-12 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium">No documents found in this folder.</p>
                  <p className="text-sm text-slate-400">Please upload the required documentation to secure your vault.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Clock(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  )
}
