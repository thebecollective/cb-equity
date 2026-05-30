'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasSeen, setHasSeen] = useState(false)

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasSeen) {
        setIsVisible(true)
        setHasSeen(true)
      }
    }
    document.addEventListener('mouseleave', handleMouseOut)
    return () => document.removeEventListener('mouseleave', handleMouseOut)
  }, [hasSeen])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">🛑</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Wait! Don't Leave Your Wealth to Chance</h2>
            <p className="text-gray-500 mb-8">Get our "Top 10 Wealth Secrets" guide and a free 15-minute strategy call before you go.</p>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsVisible(false); }}>
              <input 
                type="email" 
                required 
                placeholder="Enter your best email" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" 
              />
              <button type="submit" className="w-full py-3 bg-[#1e3a5f] text-white rounded-xl font-bold hover:bg-[#2d5a8e] transition-all glow">
                Send Me the Guide & Book Call
              </button>
            </form>
            <p className="mt-4 text-xs text-gray-400">No commitment. Just high-value insights.</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
