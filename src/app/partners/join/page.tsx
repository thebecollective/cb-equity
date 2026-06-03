"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Target } from 'lucide-react'

export default function PartnerJoinPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 rounded-full text-sm font-bold mb-6"
          >
            Strategic Alliance Program
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
            Elevate Your Clients' <br /> <span className="text-gold-600">Financial Future</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            We partner with elite CPAs, Attorneys, and Tax Professionals to provide high-net-worth clients with sophisticated wealth and protection strategies they can't find anywhere else.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              {[
                { title: 'Fiduciary-First Approach', desc: 'We act as an extension of your professional excellence, ensuring your clients receive objective, high-tier advice.', icon: ShieldCheck },
                { title: 'HNW Specialization', desc: 'From IULs to sophisticated estate funding, we handle the complex cases that standard firms avoid.', icon: Target },
                { title: 'Seamless Coordination', desc: 'We coordinate directly with you to ensure the financial plan aligns perfectly with the tax and legal strategy.', icon: Users },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="p-3 bg-gold-50 rounded-xl h-fit">
                    <item.icon className="text-gold-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-navy-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-600/20 blur-3xl rounded-full" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">Apply for Partnership</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Full Name</label>
                  <input type="text" className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Firm Name</label>
                  <input type="text" className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Doe & Associates" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Profession</label>
                  <select className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all appearance-none">
                    <option className="text-navy-900">CPA / Tax Professional</option>
                    <option className="text-navy-900">Estate Attorney</option>
                    <option className="text-navy-900">Wealth Manager</option>
                    <option className="text-navy-900">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Email Address</label>
                  <input type="email" className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="john@firm.com" />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async (e) => {
                    e.preventDefault()
                    const form = e.currentTarget.closest('form')
                    const formData = new FormData(form!)
                    const data = Object.fromEntries(formData.entries())
                    
                    try {
                      await fetch('/api/capture', {
                        method: 'POST',
                        body: JSON.stringify({
                          email: data.email,
                          name: data.name,
                          source: 'partner-application',
                          data: data
                        })
                      })
                      alert('Application submitted successfully. Our partnership team will review your firm and contact you shortly.')
                    } catch (e) {
                      alert('Something went wrong. Please try again.')
                    }
                  }}
                  className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-lg mt-6"
                >
                  Submit Application <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
