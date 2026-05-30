'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CheckoutModal({ plan, onClose }: { plan: string, onClose: () => void }) {
  const [step, setStep] = useState('payment')
  const [loading, setLoading] = useState(false)

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate Stripe API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setStep('success')
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-[#1e3a5f] p-6 text-white flex items-center justify-between">
          <h3 className="text-xl font-bold">Checkout: {plan}</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
        </div>
        
        <div className="p-8">
          {step === 'payment' ? (
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Plan</span>
                  <span className="font-bold">{plan}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Due</span>
                  <span className="text-[#1e3a5f]">$299.00</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Card Number</label>
                <input type="text" required placeholder="**** **** **** 4242" className="w-full px-4 py-2 border rounded-lg outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Expiry</label>
                  <input type="text" required placeholder="MM/YY" className="w-full px-4 py-2 border rounded-lg outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">CVC</label>
                  <input type="text" required placeholder="123" className="w-full px-4 py-2 border rounded-lg outline-none" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-[#1e3a5f] text-white rounded-xl font-bold hover:bg-[#2d5a8e] transition-all disabled:opacity-50">
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">✓</div>
              <h3 className="text-2xl font-bold">Payment Successful!</h3>
              <p className="text-gray-500">Welcome to EquityOS. Your account is now active.</p>
              <button onClick={onClose} className="w-full py-3 bg-[#1e3a5f] text-white rounded-xl font-bold">Go to Dashboard</button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
