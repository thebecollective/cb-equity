"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar as CalendarIcon } from 'lucide-react'

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false)

  // Replace this with your real Calendly link
  const CALENDLY_URL = 'https://calendly.com/your-link-here'

  // We use a custom event to trigger the modal from anywhere in the app
  useEffect(() => {
    const handleOpenBooking = () => setIsOpen(true)
    window.addEventListener('open-booking', handleOpenBooking)
    return () => window.removeEventListener('open-booking', handleOpenBooking)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 bg-white w-full max-w-4xl h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gold-100 text-gold-600 rounded-lg">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-navy-900">Schedule Your Strategy Call</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-navy-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 bg-slate-50">
              <iframe 
                src={CALENDLY_URL} 
                width="100%" 
                height="100%" 
                frameBorder="0"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
