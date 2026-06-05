"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Upload, CheckCircle2, ShieldCheck, Layout } from 'lucide-react'
import { useBrand } from '@/context/BrandContext'

export default function BrandSettings() {
  const { brand, updateBrand } = useBrand()

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-gold-600 font-bold text-sm uppercase tracking-widest mb-1">
          <Palette className="w-4 h-4" /> EquityOS Customization
        </div>
        <h1 className="text-4xl font-bold text-navy-900">Brand Identity</h1>
        <p className="text-slate-500 text-lg">Customize your client-facing tools to match your firm's unique prestige.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Firm Name</label>
              <input 
                type="text" 
                value={brand.firmName}
                onChange={(e) => updateBrand({ firmName: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Primary Brand Color</label>
                <div className="flex gap-3">
                  <input 
                    type="color" 
                    value={brand.primaryColor}
                    onChange={(e) => updateBrand({ primaryColor: e.target.value })}
                    className="w-12 h-12 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <input 
                    type="text" 
                    value={brand.primaryColor}
                    onChange={(e) => updateBrand({ primaryColor: e.target.value })}
                    className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Secondary Accent Color</label>
                <div className="flex gap-3">
                  <input 
                    type="color" 
                    value={brand.secondaryColor}
                    onChange={(e) => updateBrand({ secondaryColor: e.target.value })}
                    className="w-12 h-12 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <input 
                    type="text" 
                    value={brand.secondaryColor}
                    onChange={(e) => updateBrand({ secondaryColor: e.target.value })}
                    className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Firm Logo URL</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={brand.logoUrl}
                  onChange={(e) => updateBrand({ logoUrl: e.target.value })}
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none"
                  placeholder="https://yourfirm.com/logo.png"
                />
                <button className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all">
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-all">
              <input 
                type="checkbox" 
                checked={brand.isWhiteLabeled} 
                onChange={(e) => updateBrand({ isWhiteLabeled: e.target.checked })} 
                className="w-5 h-5 accent-gold-600" 
              />
              <div className="flex-1">
                <span className="text-sm font-bold text-navy-900">Enable Full White-Labeling</span>
                <p className="text-xs text-slate-500">Remove "Powered by EquityOS" from all client-facing blueprints and tools.</p>
              </div>
              <div className="px-2 py-1 bg-gold-100 text-gold-700 rounded-md text-[10px] font-black uppercase">
                Platinum
              </div>
            </label>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <div className="bg-navy-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                <Layout className="w-4 h-4" /> Live Preview
              </div>
              
              <div className="space-y-4">
                <div className="h-12 w-32 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold border border-white/20">
                  {brand.logoUrl ? 'Logo Loaded' : 'No Logo'}
                </div>
                <h4 className="text-xl font-bold">{brand.firmName}</h4>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full" style={{ backgroundColor: brand.primaryColor }} />
                  <div className="h-8 w-8 rounded-full" style={{ backgroundColor: brand.secondaryColor }} />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button 
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                  style={{ backgroundColor: brand.secondaryColor, color: brand.primaryColor }}
                >
                  Client Blueprint Button
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase">
              <ShieldCheck className="w-4 h-4" /> Brand Integrity
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              All changes are applied instantly across your entire EquityOS ecosystem. Your clients will see your brand identity the moment they open a link.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
