'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'bot'
  content: string
}

interface NewsItem {
  title: string
  summary: string
  source: string
  date: string
}

const botResponses: Record<string, string> = {
  banking:
    'Our banking solutions focus on optimizing your liquidity and credit:\\n\\n• **Private Banking** — Tailored services for high-net-worth individuals\\n• **Treasury Management** — Cash flow and liquidity optimization for businesses\\n• **Loan Advisory** — Expert guidance on mortgages, commercial loans, and credit lines\\n• **Custom Credit Facilities** — Strategic borrowing for growth and investment\\n\\nWe partner with leading institutions to secure the best rates and terms for our clients.',
  insurance:

    'We offer a comprehensive range of insurance products to meet your needs:\n\n• **Term Life Insurance** — Affordable coverage for a specific period\n• **Whole Life Insurance** — Lifetime coverage with cash value accumulation\n• **Universal Life Insurance** — Flexible premiums and death benefits\n• **Variable Life Insurance** — Investment-linked cash value growth\n• **Indexed Universal Life (IUL)** — Cash value tied to market index performance\n\nWould you like more details on any specific product?',
  annuity:
    'Our annuity offerings help secure your retirement income:\n\n• **Fixed Annuities** — Guaranteed interest rates and predictable income\n• **Variable Annuities** — Investment options with growth potential\n• **Indexed Annuities** — Returns linked to market indexes with downside protection\n\nI can help you compare these options based on your goals.',
  securities:
    'Through our securities services, we provide access to:\n\n• **Stocks** — Equity investments in public companies\n• **Bonds** — Fixed-income securities for steady returns\n• **ETFs** — Diversified, low-cost fund investments\n• **Mutual Funds** — Professionally managed investment portfolios\n\nOur registered representatives can help build a portfolio aligned with your risk tolerance.',
  financial:
    'Our financial planning process includes:\n\n1. **Discovery** — Understanding your goals, assets, and risk tolerance\n2. **Analysis** — Evaluating your current financial situation\n3. **Strategy** — Creating a personalized financial plan\n4. **Implementation** — Putting the plan into action\n5. **Review** — Regular monitoring and adjustments\n\nWe take a holistic approach to help you achieve your financial objectives.',
  wholesale:
    'Our wholesale distribution services connect financial professionals with top-tier products:\n\n• Access to leading insurance carriers and investment platforms\n• Dedicated support for advisors and broker-dealers\n• Marketing and sales resources\n• Training and continuing education\n\nWe partner with financial professionals to grow their business.',
  referral:
    'Our partner referral program offers:\n\n• Competitive referral fees for qualified leads\n• Simple online referral submission process\n• Real-time tracking of referral status\n• Dedicated partner support team\n\nRefer a client and earn rewards — ask me for the details!',
  career:
    'CB Equity offers exciting career opportunities:\n\n• **Financial Advisors** — Build your practice with our support\n• **Wholesalers** — Join our distribution team\n• **Internships** — Gain hands-on experience in financial services\n• **Operations & Support** — Careers in our home office\n\nWe provide training, mentorship, and competitive compensation. Would you like to know more about a specific role?',
  lead:
    'Our lead generation services include:\n\n• Targeted marketing campaigns for financial products\n• Qualification and scoring of inbound leads\n• CRM integration for seamless follow-up\n• Analytics and reporting on lead performance\n\nWe help you find and convert high-quality prospects efficiently.',
  commission:
    'Our commission structures are designed to reward performance:\n\n• Competitive payout rates on life insurance and annuity products\n• Tiered commission levels based on production volume\n• Renewal commissions and bonuses\n• Transparent reporting through our dashboard\n\nContact our compensation team for a detailed schedule.',
}

const defaultResponse =
  "I'd be happy to help you with that. Could you provide more details? I specialize in financial services including insurance, securities, annuities, financial planning, wealth management, and career opportunities at CB Equity."

const welcomeMessage: Message = {
  role: 'bot',
  content:
    "Hello! I'm your CB Equity AI assistant. How can I help you today? I can answer questions about financial planning, insurance, investments, and our services.",
}

const suggestedQuestions = [
  'What insurance products do you offer?',
  'How do commissions work?',
  'Tell me about career opportunities',
  'What is the referral program?',
]

function getBotResponse(input: string): string {
  const lower = input.toLowerCase()
  const keywords: Record<string, string> = {
    'life insurance': 'insurance',
    insurance: 'insurance',
    annuity: 'annuity',
    annuities: 'annuity',
    securities: 'securities',
    invest: 'securities',
    investment: 'securities',
    retirement: 'financial',
    'financial planning': 'financial',
    wholesale: 'wholesale',
    distribution: 'wholesale',
    referral: 'referral',
    career: 'career',
    job: 'career',
    intern: 'career',
    lead: 'lead',
    commission: 'commission',
    banking: 'banking',
    bank: 'banking',
    loan: 'banking',
    mortgage: 'banking',
  }

  for (const [keyword, category] of Object.entries(keywords)) {
    if (lower.includes(keyword)) {
      return botResponses[category] || defaultResponse
    }
  }

  return defaultResponse
}

export default function AiBotPage() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState<NewsItem[]>([])
  const [newsLoading, setNewsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/stock-news')
      .then((res) => res.json())
      .then((data) => {
        setNews(Array.isArray(data) ? data.slice(0, 3) : [])
      })
      .catch(() => setNews([]))
      .finally(() => setNewsLoading(false))
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (content: string) => {
    const trimmed = content.trim()
    if (!trimmed || loading) return

    const userMsg: Message = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const botMsg: Message = { role: 'bot', content: getBotResponse(trimmed) }
      setMessages((prev) => [...prev, botMsg])
      setLoading(false)
    }, 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggested = (question: string) => {
    sendMessage(question)
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">AI Assistant</h1>
          <p className="text-sm text-gray-500">Powered by CB Equity Intelligence</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-[#1e3a5f] text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-gray-500">
                <span className="inline-flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about our services..."
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-2.5 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 disabled:opacity-50 transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Right Column */}
      <div className="w-80 flex flex-col gap-6 overflow-y-auto">
        {/* Suggested Questions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Suggested Questions</h2>
          <div className="space-y-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSuggested(q)}
                className="w-full text-left px-3 py-2.5 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-[#1e3a5f]/5 hover:text-[#1e3a5f] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
