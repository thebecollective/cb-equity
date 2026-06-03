'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface Message {
  role: 'bot' | 'user'
  content: string
  isAction?: boolean
  actionType?: 'booking' | 'health-check' | 'services' | 'pricing'
}

const KNOWLEDGE_BASE: Record<string, string> = {
  'retirement': "Retirement planning involves estimating your future needs and creating a strategy to meet them. I recommend our Retirement Planner tool in the dashboard to get a precise estimate.",
  'taxes': "Tax optimization can significantly increase your net wealth. We specialize in loss harvesting and strategic withdrawals. Would you like to see our Tax Optimizer tool?",
  'insurance': "We provide comprehensive insurance analysis to protect your assets and family. We look at life, disability, and long-term care insurance.",
  'saas': "EquityOS is our proprietary platform for independent advisors. It streamlines CRM, lead gen, and client reporting. Would you like to see the pricing?",
  'investing': "We take a holistic approach to securities and portfolio management, focusing on risk-adjusted returns and long-term goals.",
  'estate': "Estate planning ensures your legacy is protected. We help with Wills, Trusts, and minimizing estate taxes.",
  'hello': "Hi there! I'm the CB Equity AI. I can help you find the right financial tool, explain our services, or book a call with Brooke or Connor. What's on your mind?",
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
    const userMsg = input.toLowerCase()
    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')

    setTimeout(() => {
      let response = "That's a great question. While I can give you general info, a personalized strategy from Brooke or Connor would be best. Should I book a call for you?"
      let actionType: Message['actionType'] = 'booking'

      // Search knowledge base
      for (const key in KNOWLEDGE_BASE) {
        if (userMsg.includes(key)) {
          response = KNOWLEDGE_BASE[key]
          if (key === 'saas') actionType = 'pricing'
          if (key === 'taxes') actionType = 'health-check'
          break
        }
      }

      if (userMsg.includes('book') || userMsg.includes('call') || userMsg.includes('appointment')) {
        response = "I'd be happy to help you get on the calendar!"
        actionType = 'booking'
      } else if (userMsg.includes('price') || userMsg.includes('cost')) {
        response = "Our EquityOS plans are designed to scale with your practice."
        actionType = 'pricing'
      }

      setMessages(prev => [...prev, { role: 'bot', content: response, isAction: true, actionType }])
    }, 800)
  }

  const renderAction = (type: string) => {
    switch (type) {
      case 'booking':
        return <button onClick={() => setStep('booking')} className="block mt-2 w-full py-1.5 bg-[#c9a84c] text-white rounded-lg text-xs font-bold hover:bg-[#b38f3a]">📅 Book a Call Now</button>
      case 'health-check':
        return <Link href="/tools" className="block mt-2 w-full py-1.5 bg-[#1e3a5f] text-white text-center rounded-lg text-xs font-bold hover:bg-[#162d4a]">🩺 Start Health Check</Link>
      case 'pricing':
        return <Link href="/pricing" className="block mt-2 w-full py-1.5 bg-[#1e3a5f] text-white text-center rounded-lg text-xs font-bold hover:bg-[#162d4a]">💰 View SaaS Pricing</Link>
      case 'services':
        return <Link href="/services" className="block mt-2 w-full py-1.5 bg-[#1e3a5f] text-white text-center rounded-lg text-xs font-bold hover:bg-[#162d4a]">🛠 View Services</Link>
      default:
        return null
    }
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
            className="absolute bottom-20 right-0 w-96 h-[550px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            <div className="bg-[#1e3a5f] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs">🤖</div>
                <div>
                  <p className="text-sm font-bold">CB Equity AI</p>
                  <p className="text-[10px] text-white/70">Smart Assistant | Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#1e3a5f] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                    {m.content}
                    {m.isAction && m.actionType && renderAction(m.actionType)}
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
                  placeholder="Ask about taxes, SaaS, or booking..." 
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
