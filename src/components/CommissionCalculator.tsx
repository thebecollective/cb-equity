'use client'

import { useState } from 'react'

const productTypes = [
  { id: 'term_life', label: 'Term Life Insurance', rateMin: 50, rateMax: 90, unit: 'premium', example: 2400 },
  { id: 'whole_life', label: 'Whole Life Insurance', rateMin: 55, rateMax: 100, unit: 'premium', example: 6000 },
  { id: 'universal_life', label: 'Universal Life', rateMin: 50, rateMax: 85, unit: 'premium', example: 4800 },
  { id: 'final_expense', label: 'Final Expense', rateMin: 60, rateMax: 110, unit: 'premium', example: 1200 },
  { id: 'fixed_annuity', label: 'Fixed Annuity', rateMin: 3, rateMax: 7, unit: 'premium', example: 100000 },
  { id: 'indexed_annuity', label: 'Indexed Annuity', rateMin: 4, rateMax: 8, unit: 'premium', example: 150000 },
  { id: 'securities', label: 'Securities / Fixed Income', rateMin: 0.5, rateMax: 2, unit: 'transaction', example: 250000 },
  { id: 'mutual_fund', label: 'Mutual Fund / ETF', rateMin: 0.25, rateMax: 1, unit: 'transaction', example: 50000 },
]

export default function CommissionCalculator() {
  const [productId, setProductId] = useState('term_life')
  const [amount, setAmount] = useState('2400')
  const [rate, setRate] = useState(70)

  const product = productTypes.find((p) => p.id === productId) ?? productTypes[0]
  const numAmount = parseFloat(amount) || 0
  const commission = (numAmount * rate) / 100

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-[var(--color-primary)]">Commission Estimator</h3>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            See what you could earn as a 1099 partner. You keep 100% of your commissions — we provide back office, leads, and training at no salary cost to us.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--color-primary)]">Product Type</label>
            <select
              value={productId}
              onChange={(e) => {
                const p = productTypes.find((x) => x.id === e.target.value)!
                setProductId(e.target.value)
                setAmount(String(p.example))
                setRate(Math.round((p.rateMin + p.rateMax) / 2))
              }}
              className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
            >
              {productTypes.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-primary)]">
              {product.unit === 'premium' ? 'Annual Premium ($)' : 'Transaction Value ($)'}
            </label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[var(--color-primary)]">
                Your Commission Rate (%)
              </label>
              <span className="text-sm font-semibold text-[var(--color-accent)]">{rate}%</span>
            </div>
            <input
              type="range"
              min={product.rateMin}
              max={product.rateMax}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="mt-2 w-full accent-[var(--color-primary)]"
            />
            <div className="mt-1 flex justify-between text-xs text-[var(--color-muted)]">
              <span>{product.rateMin}%</span>
              <span>Industry range for {product.label}</span>
              <span>{product.rateMax}%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-xl gradient-bg p-8 text-white">
          <p className="text-sm font-medium text-white/70">Estimated Commission</p>
          <p className="stat-number mt-2 text-5xl font-bold">
            ${commission.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Based on ${numAmount.toLocaleString()} at {rate}%. Actual rates vary by carrier, 
            product, and production volume. Renewals and trail commissions add to long-term earnings.
          </p>
          <div className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">5 policies/month at this rate</span>
              <span className="font-semibold">${(commission * 5).toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Annual potential (5/mo)</span>
              <span className="font-semibold text-[var(--color-accent-light)]">${(commission * 5 * 12).toLocaleString()}/yr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
