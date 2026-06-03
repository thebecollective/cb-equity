'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const INITIAL_TICKERS = [
  { symbol: 'S&P 500', price: '5,234.10', change: '+1.2%', color: 'text-green-500' },
  { symbol: 'NASDAQ', price: '16,382.50', change: '+0.8%', color: 'text-green-500' },
  { symbol: 'GOLD', price: '2,341.20', change: '-0.3%', color: 'text-red-500' },
  { symbol: 'BTC', price: '64,120.00', change: '+2.1%', color: 'text-green-500' },
  { symbol: 'DOW', price: '39,128.10', change: '+0.5%', color: 'text-green-500' },
  { symbol: 'OIL', price: '82.40', change: '-1.1%', color: 'text-red-500' },
]

export default function MarketTicker() {
  const [tickers, setTickers] = useState(INITIAL_TICKERS)

  // Simulate live updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(t => ({
        ...t,
        price: (parseFloat(t.price.replace(/,/g, '')) + (Math.random() * 2 - 1)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change: `${(Math.random() * 4 - 2).toFixed(2)}%`,
        color: Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'
      })))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#1e3a5f] text-white py-2 overflow-hidden whitespace-nowrap border-b border-[#c9a84c]/30">
      <div className="flex animate-marquee items-center">
        {[...tickers, ...tickers].map((t, i) => (
          <div key={i} className="flex items-center gap-2 mx-8 text-xs font-medium">
            <span className="text-white/60">{t.symbol}</span>
            <span className="font-bold">{t.price}</span>
            <span className={`${t.color} font-bold`}>{t.change}</span>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: inline-flex;
        }
      `}</style>
    </div>
  )
}
