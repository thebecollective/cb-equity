'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'bot' | 'user'
  content: string
  isAction?: boolean
}

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm the CB Equity AI. Looking for a financial plan, insurance, or interested in our SaaS for advisors?" }
  ])
  const [input, setInput] = useState('')
  const [step, setStep] = useState('chat') // 'chat' | 'booking'
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    if (!input.trim()) return
    const userMsg = input
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInput('')

    // Qualification Logic
    setTimeout(() => {
      let response = "I can certainly help with that. To give you the best advice, I should get you on a call with Brooke or Connor."
      if (userMsg.toLowerCase().includes('saas') || userMsg.toLowerCase().includes('software')) {
        response = "EquityOS is our practice accelerator. It's perfect for advisors. Would you like to book a demo?"
      }
      
      setMessages(prev => [...prev, { role: 'bot', content: response }])
      
      // Trigger booking suggestion after a few seconds
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', content: "Should I open the calendar for you to pick a time?", isAction: true }])
      }, 1000)
    }, 800)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen && (
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full gradient-bg shadow-2xl flex items-center justify-center text-white text-3xl animate-bounce"
        >
          💬
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            <div className="bg-[#1e3a5f] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs">🤖</div>
                <div>
                  <p className="text-sm font-bold">CB Equity AI</p>
                  <p className="text-[10px] text-white/70">Online | Instant Response</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#1e3a5f] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                    {m.content}
                    {m.isAction && (
                      <button 
                        onClick={() => setStep('booking')}
                        className="block mt-2 w-full py-1.5 bg-[#c9a84c] text-white rounded-lg text-xs font-bold hover:bg-[#b38f3a]"
                      >
                        Yes, Book Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            {step === 'chat' ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 border-t border-gray-100 flex gap-2">
                <input 
                  type="text" 
                  value={input} 
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about plans, SaaS, or booking..." 
                  className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none"
                />
                <button type="submit" className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg text-sm font-medium">Send</button>
              </form>
            ) : (
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500 mb-3">Connecting to calendar...</p>
                <button onClick={() => setStep('chat')} className="text-xs text-[#1e3a5f] font-bold">Go back to chat</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
