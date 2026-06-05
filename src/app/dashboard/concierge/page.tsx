"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Calendar, FileText, PlayCircle, ArrowRight, Star, ShieldCheck } from 'lucide-react'

const ONBOARDING_STEPS = [
  { 
    id: 'welcome', 
    title: 'Personalized Welcome', 
    desc: 'Watch your custom introduction video from Brooke & Connor.',
    icon: PlayCircle,
    status: 'completed'
  },
  { 
    id: 'discovery', 
    title: 'Discovery Call', 
    desc: 'Deep dive into your goals, pain points, and financial aspirations.',
    icon: Calendar,
    status: 'in_progress'
  },
  { 
    id: 'vault', 
    title: 'Vault Setup', 
    desc: 'Securely upload your documents for our strategic analysis.',
    icon: FileText,
    status: 'pending'
  },
  { 
    id: 'blueprint', 
    title: 'Strategic Blueprint', 
    desc: 'Receive your custom AI-generated Wealth Optimization Plan.',
    icon: Star,
    status: 'pending'
  },
  { 
    id: 'implementation', 
    title: 'Execution Phase', 
    desc: 'Implementing the solutions to close your wealth gap.',
    icon: ShieldCheck,
    status: 'pending'
  },
]

export default function OnboardingConcierge() {
  const [activeStep, setActiveStep] = useState('discovery')

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-navy-900">Welcome to the Collective</h1>
        <p className="text-slate-500 text-lg">We are orchestrating your transition to financial sovereignty. Here is your roadmap.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Roadmap Timeline */}
        <div className="lg:col-span-1 space-y-6 relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 z-0" />
          {ONBOARDING_STEPS.map((step, i) => (
            <motion.div 
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`relative z-10 flex items-start gap-6 cursor-pointer group ${activeStep === step.id ? 'opacity-100' : 'opacity-60, hover:opacity-80'}`}
            >
              <div className={`p-3 rounded-full shrink-0 transition-all ${
                step.status === 'completed' ? 'bg-emerald-500 text-white' : 
                step.status === 'in_progress' ? 'bg-gold-500 text-white ring-4 ring-gold-500/20' : 
                'bg-slate-200 text-slate-500'
              }`}>
                {step.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
              </div>
              <div className={`p-4 rounded-2xl transition-all ${activeStep === step.id ? 'bg-white shadow-lg border border-slate-200' : 'bg-transparent'}`}>
                <h4 className={`font-bold ${activeStep === step.id ? 'text-navy-900' : 'text-slate-600'}`}>{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gold-50 rounded-xl text-gold-600">
                    {React.createElement(ONBOARDING_STEPS.find(s => s.id === activeStep)!.icon, { className: 'w-8 h-8' })}
                  </div>
                  <h2 className="text-2xl font-bold text-navy-900">
                    {ONBOARDING_STEPS.find(s => s.id === activeStep)!.title}
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {activeStep === 'welcome' && (
                    <div className="space-y-4">
                      <div className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                        <PlayCircle className="w-16 h-16 text-white relative z-10 cursor-pointer hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        In this video, Brooke and Connor explain the CB Equity philosophy and what to expect during your onboarding.
                      </p>
                    </div>
                  )}

                  {activeStep === 'discovery' && (
                    <div className="space-y-6">
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                        <p className="text-slate-600 mb-4">Our Discovery Call is a 45-minute deep dive. We will analyze your current structure and identify your "Wealth Gap."</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {['Mon 2pm', 'Tue 10am', 'Wed 4pm'].map(time => (
                            <button key={time} className="p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:border-gold-500 transition-all">
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-700 rounded-2xl text-sm font-medium">
                        <ShieldCheck className="w-5 h-5" />
                        Your data is encrypted and strictly confidential.
                      </div>
                    </div>
                  )}

                  {activeStep === 'vault' && (
                    <div className="space-y-6">
                      <p className="text-slate-600">To build your Strategic Blueprint, we need a clear picture of your current assets. Please upload the required documents to your Secure Vault.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['Tax Returns (2yrs)', 'Existing Life Policies', 'Estate Plan', 'Recent Statements'].map(doc => (
                          <div key={doc} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm font-medium text-slate-600">
                            <div className="w-2 h-2 bg-slate-300 rounded-full" /> {doc}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStep === 'blueprint' && (
                    <div className="space-y-6 text-center py-12">
                      <div className="p-6 bg-gold-50 rounded-full inline-block mb-4">
                        <Star className="w-12 h-12 text-gold-600 animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-bold text-navy-900">Your Blueprint is being crafted</h3>
                      <p className="text-slate-500 max-w-md mx-auto">Our strategists are currently analyzing your vault data to build your optimized wealth roadmap.</p>
                    </div>
                  )}

                  {activeStep === 'implementation' && (
                    <div className="space-y-6">
                      <p className="text-slate-600">Once the blueprint is approved, we enter the implementation phase. We handle all the paperwork and coordination with your legal and tax teams.</p>
                      <div className="p-6 bg-navy-900 text-white rounded-2xl flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold">Current Phase</p>
                          <p className="text-lg font-bold">Awaiting Blueprint Approval</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gold-400" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                <button className="text-slate-400 font-bold text-sm hover:text-navy-900 transition-colors">Support</button>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="px-6 py-3 bg-gold-500 text-navy-900 font-bold rounded-xl flex items-center gap-2 transition-all"
                >
                  Continue Journey <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </div>
  )
}
