'use client'

import { useState } from 'react'
import StatsCard from '@/components/dashboard/StatsCard'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

type Tab = 'net_worth' | 'retirement' | 'cash_flow' | 'estate' | 'tax' | 'scenario'


function formatCurrency(val: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val)
}

interface NetWorthForm {
  cash: string
  investments: string
  property: string
  vehicles: string
  otherAssets: string
  mortgage: string
  loans: string
  creditCards: string
  otherLiabilities: string
}

interface RetirementForm {
  currentAge: string
  retirementAge: string
  currentSavings: string
  monthlyContribution: string
  expectedReturn: string
  annualExpenses: string
}

interface CashFlowForm {
  salary: string
  business: string
  investments: string
  otherIncome: string
  housing: string
  transportation: string
  food: string
  insurance: string
  utilities: string
  otherExpenses: string
}

interface EstateForm {
  assets: string
  exemptions: string
  stateTaxRate: string
}

interface TaxForm {
  annualIncome: string
  taxRate: string
  lossHarvestingAmount: string
}

function NetWorthCalculator({ onSave }: { onSave: () => void }) {
  const [form, setForm] = useState<NetWorthForm>({
    cash: '', investments: '', property: '', vehicles: '', otherAssets: '',
    mortgage: '', loans: '', creditCards: '', otherLiabilities: '',
  })
  const [saving, setSaving] = useState(false)

  const cash = parseFloat(form.cash) || 0
  const investments = parseFloat(form.investments) || 0
  const property = parseFloat(form.property) || 0
  const vehicles = parseFloat(form.vehicles) || 0
  const otherAssets = parseFloat(form.otherAssets) || 0
  const mortgage = parseFloat(form.mortgage) || 0
  const loans = parseFloat(form.loans) || 0
  const creditCards = parseFloat(form.creditCards) || 0
  const otherLiabilities = parseFloat(form.otherLiabilities) || 0

  const totalAssets = cash + investments + property + vehicles + otherAssets
  const totalLiabilities = mortgage + loans + creditCards + otherLiabilities
  const netWorth = totalAssets - totalLiabilities

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'net_worth',
          name: 'Net Worth Statement',
          data: { cash, investments, property, vehicles, otherAssets, mortgage, loans, creditCards, otherLiabilities, totalAssets, totalLiabilities, netWorth },
        }),
      })
      onSave()
    } catch {
      //
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Assets" value={formatCurrency(totalAssets)} icon={<span>📈</span>} color="#059669" />
        <StatsCard title="Total Liabilities" value={formatCurrency(totalLiabilities)} icon={<span>📉</span>} color="#dc2626" />
        <StatsCard
          title="Net Worth"
          value={formatCurrency(netWorth)}
          icon={<span>🏦</span>}
          color={netWorth >= 0 ? '#1e3a5f' : '#dc2626'}
          change={netWorth >= 0 ? '+ Positive' : '- Negative'}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="flex h-full">
            {totalAssets > 0 && (
              <div
                className="bg-green-500 h-full transition-all"
                style={{ width: `${Math.min((totalAssets / (totalAssets + totalLiabilities || 1)) * 100, 100)}%` }}
              />
            )}
            {totalLiabilities > 0 && (
              <div
                className="bg-red-500 h-full transition-all"
                style={{ width: `${Math.min((totalLiabilities / (totalAssets + totalLiabilities || 1)) * 100, 100)}%` }}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Assets</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Liabilities</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Assets
          </h3>
          <div className="space-y-3">
            {(['cash', 'investments', 'property', 'vehicles', 'otherAssets'] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                  {field === 'otherAssets' ? 'Other' : field}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                  <input
                    type="number"
                    min="0"
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                    placeholder="0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Liabilities
          </h3>
          <div className="space-y-3">
            {(['mortgage', 'loans', 'creditCards', 'otherLiabilities'] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                  {field === 'creditCards' ? 'Credit Cards' : field === 'otherLiabilities' ? 'Other' : field}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                  <input
                    type="number"
                    min="0"
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                    placeholder="0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Net Worth'}
        </button>
      </div>
    </div>
  )
}

function RetirementPlanner({ onSave }: { onSave: () => void }) {
  const [form, setForm] = useState<RetirementForm>({
    currentAge: '', retirementAge: '', currentSavings: '', monthlyContribution: '', expectedReturn: '', annualExpenses: '',
  })
  const [saving, setSaving] = useState(false)

  const currentAge = parseInt(form.currentAge) || 0
  const retirementAge = parseInt(form.retirementAge) || 0
  const currentSavings = parseFloat(form.currentSavings) || 0
  const monthlyContribution = parseFloat(form.monthlyContribution) || 0
  const expectedReturn = parseFloat(form.expectedReturn) || 0
  const annualExpenses = parseFloat(form.annualExpenses) || 0

  const yearsToRetirement = Math.max(0, retirementAge - currentAge)
  const monthlyRate = expectedReturn / 100 / 12
  const totalMonths = yearsToRetirement * 12
  
  const generateGrowthData = () => {
    const data = []
    let current = currentSavings
    for (let year = 0; year <= yearsToRetirement; year++) {
      data.push({
        year: currentAge + year,
        value: Math.round(current),
      })
      for (let month = 0; month < 12; month++) {
        current = (current * (1 + monthlyRate)) + monthlyContribution
      }
    }
    return data
  }

  const projectedSavings = generateGrowthData().length > 0 
    ? generateGrowthData()[generateGrowthData().length - 1].value 
    : currentSavings
    
  const annualIncome = projectedSavings * 0.04

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'retirement',
          name: 'Retirement Plan',
          data: { currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, annualExpenses, yearsToRetirement, projectedSavings, annualIncome },
        }),
      })
      onSave()
    } catch {
      //
    } finally {
      setSaving(false)
    }
  }

  const showResults = yearsToRetirement > 0 || currentSavings > 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Parameters</h3>
          {([
            { key: 'currentAge' as const, label: 'Current Age', suffix: '' as string | undefined },
            { key: 'retirementAge' as const, label: 'Retirement Age', suffix: '' as string | undefined },
            { key: 'currentSavings' as const, label: 'Current Savings', prefix: '$' as string | undefined },
            { key: 'monthlyContribution' as const, label: 'Monthly Contribution', prefix: '$' as string | undefined },
            { key: 'expectedReturn' as const, label: 'Expected Return Rate', suffix: '%' as string | undefined },
            { key: 'annualExpenses' as const, label: 'Current Annual Expenses', prefix: '$' as string | undefined },
          ]).map(({ key, label, prefix, suffix }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
              <div className="relative">
                {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">{prefix}</span>}
                <input
                  type="number"
                  min="0"
                  value={form[key as keyof RetirementForm]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className={`w-full ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-7' : ''} px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]`}
                  placeholder="0"
                />
                {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">{suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {showResults ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard
                  title="Years to Retirement"
                  value={yearsToRetirement}
                  icon={<span>⏳</span>}
                  color="#c9a84c"
                />
                <StatsCard
                  title="Projected Savings"
                  value={formatCurrency(projectedSavings)}
                  icon={<span>💰</span>}
                  color="#1e3a5f"
                />
                <StatsCard
                  title="Annual Income (4%)"
                  value={formatCurrency(annualIncome)}
                  icon={<span>📊</span>}
                  color="#059669"
                  change={
                    annualExpenses > 0
                      ? `${((annualIncome / annualExpenses) * 100).toFixed(0)}% of expenses`
                      : undefined
                  }
                />
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-64">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Savings Growth Projection</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={generateGrowthData()}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="year" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} tick={{fontSize: 12}} />
                    <YAxis tickFormatter={(val) => `$${(val/1000000).toFixed(1)}M`} tick={{fontSize: 12}} />
                    <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                    <Area type="monotone" dataKey="value" stroke="#1e3a5f" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center h-full">
              <p className="text-sm text-gray-400">Fill in your details to see retirement projections</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Retirement Plan'}
        </button>
      </div>
    </div>
  )
}

function CashFlowAnalyzer({ onSave }: { onSave: () => void }) {
  const [form, setForm] = useState<CashFlowForm>({
    salary: '', business: '', investments: '', otherIncome: '',
    housing: '', transportation: '', food: '', insurance: '', utilities: '', otherExpenses: '',
  })
  const [saving, setSaving] = useState(false)

  const salary = parseFloat(form.salary) || 0
  const business = parseFloat(form.business) || 0
  const investments = parseFloat(form.investments) || 0
  const otherIncome = parseFloat(form.otherIncome) || 0
  const housing = parseFloat(form.housing) || 0
  const transportation = parseFloat(form.transportation) || 0
  const food = parseFloat(form.food) || 0
  const insurance = parseFloat(form.insurance) || 0
  const utilities = parseFloat(form.utilities) || 0
  const otherExpenses = parseFloat(form.otherExpenses) || 0

  const totalIncome = salary + business + investments + otherIncome
  const totalExpenses = housing + transportation + food + insurance + utilities + otherExpenses
  const surplus = totalIncome - totalExpenses
  const isPositive = surplus >= 0

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'cash_flow',
          name: 'Cash Flow Analysis',
          data: { salary, business, investments, otherIncome, housing, transportation, food, insurance, utilities, otherExpenses, totalIncome, totalExpenses, surplus, isPositive },
        }),
      })
      onSave()
    } catch {
      //
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Income" value={formatCurrency(totalIncome)} icon={<span>📈</span>} color="#059669" />
        <StatsCard title="Total Expenses" value={formatCurrency(totalExpenses)} icon={<span>📉</span>} color="#dc2626" />
        <StatsCard
          title={isPositive ? 'Monthly Surplus' : 'Monthly Deficit'}
          value={formatCurrency(Math.abs(surplus))}
          icon={isPositive ? <span>✅</span> : <span>⚠️</span>}
          color={isPositive ? '#059669' : '#dc2626'}
          change={isPositive ? '+ Positive' : '- Negative'}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-500">Income: {formatCurrency(totalIncome)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-gray-500">Expenses: {formatCurrency(totalExpenses)}</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div className="flex h-full">
            <div
              className="bg-green-500 h-full transition-all"
              style={{ width: `${Math.min((totalIncome / ((totalIncome + totalExpenses) || 1)) * 100, 100)}%` }}
            />
            <div
              className="bg-red-500 h-full transition-all"
              style={{ width: `${Math.min((totalExpenses / ((totalIncome + totalExpenses) || 1)) * 100, 100)}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-3">
          {totalIncome > 0 || totalExpenses > 0 ? (
            <span
              className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}
            >
              {isPositive ? '✅ You have a surplus of ' : '⚠️ You have a deficit of '}
              {formatCurrency(Math.abs(surplus))}/month
            </span>
          ) : (
            <span className="text-sm text-gray-400">Enter your income and expenses to see analysis</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Income
          </h3>
          <div className="space-y-3">
            {([
              { key: 'salary', label: 'Salary' },
              { key: 'business', label: 'Business' },
              { key: 'investments', label: 'Investments' },
              { key: 'otherIncome', label: 'Other' },
            ] as const).map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                  <input
                    type="number"
                    min="0"
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                    placeholder="0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Expenses
          </h3>
          <div className="space-y-3">
            {([
              { key: 'housing', label: 'Housing' },
              { key: 'transportation', label: 'Transportation' },
              { key: 'food', label: 'Food' },
              { key: 'insurance', label: 'Insurance' },
              { key: 'utilities', label: 'Utilities' },
              { key: 'otherExpenses', label: 'Other' },
            ] as const).map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                  <input
                    type="number"
                    min="0"
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                    placeholder="0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Cash Flow'}
        </button>
      </div>
    </div>
  )
}

function EstateTaxCalculator({ onSave }: { onSave: () => void }) {
  const [form, setForm] = useState({
    assets: '',
    exemptions: '',
    stateTaxRate: '0',
  })
  const [saving, setSaving] = useState(false)

  const assets = parseFloat(form.assets) || 0
  const exemptions = parseFloat(form.exemptions) || 0
  const stateTaxRate = parseFloat(form.stateTaxRate) || 0

  const taxableEstate = Math.max(0, assets - exemptions)
  const estimatedTax = taxableEstate * (stateTaxRate / 100)

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'estate',
          name: 'Estate Tax Projection',
          data: { assets, exemptions, stateTaxRate, taxableEstate, estimatedTax },
        }),
      })
      onSave()
    } catch {
      //
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Taxable Estate" value={formatCurrency(taxableEstate)} icon={<span>📜</span>} color="#1e3a5f" />
        <StatsCard
          title="Estimated Estate Tax"
          value={formatCurrency(estimatedTax)}
          icon={<span>⚠️</span>}
          color="#dc2626"
        />
        <StatsCard title="After-Tax Legacy" value={formatCurrency(assets - estimatedTax)} icon={<span>💎</span>} color="#059669" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Total Estate Assets ($)</label>
          <input
            type="number"
            value={form.assets}
            onChange={(e) => setForm({ ...form, assets: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Federal/State Exemptions ($)</label>
          <input
            type="number"
            value={form.exemptions}
            onChange={(e) => setForm({ ...form, exemptions: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">State Tax Rate (%)</label>
          <input
            type="number"
            value={form.stateTaxRate}
            onChange={(e) => setForm({ ...form, stateTaxRate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Estate Plan'}
        </button>
      </div>
    </div>
  )
}

function TaxOptimizationTool({ onSave }: { onSave: () => void }) {
  const [form, setForm] = useState({
    annualIncome: '',
    taxRate: '',
    lossHarvestingAmount: '',
  })
  const [saving, setSaving] = useState(false)

  const income = parseFloat(form.annualIncome) || 0
  const rate = parseFloat(form.taxRate) || 0
  const loss = parseFloat(form.lossHarvestingAmount) || 0

  const taxSavings = loss * (rate / 100)
  const optimizedIncome = income - loss

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tax',
          name: 'Tax Optimization Strategy',
           data: { annualIncome: income, taxRate: rate, lossHarvestingAmount: loss, taxSavings, optimizedIncome },
        }),
      })
      onSave()
    } catch {
      //
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Taxable Income" value={formatCurrency(optimizedIncome)} icon={<span>📉</span>} color="#1e3a5f" />
        <StatsCard
          title="Est. Tax Savings"
          value={formatCurrency(taxSavings)}
          icon={<span>💰</span>}
          color="#059669"
        />
        <StatsCard title="New Effective Rate" value={`${rate}%`} icon={<span>📊</span>} color="#c9a84c" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Annual Taxable Income ($)</label>
          <input
            type="number"
            value={form.annualIncome}
            onChange={(e) => setForm({ ...form, annualIncome: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Marginal Tax Rate (%)</label>
          <input
            type="number"
            value={form.taxRate}
            onChange={(e) => setForm({ ...form, taxRate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Loss Harvesting Amount ($)</label>
          <input
            type="number"
            value={form.lossHarvestingAmount}
            onChange={(e) => setForm({ ...form, lossHarvestingAmount: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Tax Strategy'}
        </button>
      </div>
    </div>
  )
}

export default function PlanningPage() {
  const [tab, setTab] = useState<Tab>('net_worth')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Financial Planning & Optimization</h1>

      <div className="flex items-center gap-1 mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-1 w-fit overflow-x-auto">
        {([
          { key: 'net_worth', label: 'Net Worth' },
          { key: 'retirement', label: 'Retirement' },
          { key: 'cash_flow', label: 'Cash Flow' },
          { key: 'estate', label: 'Estate Tax' },
          { key: 'tax', label: 'Tax Optimizer' },
          { key: 'scenario', label: 'Scenario Sim' },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              tab === key ? 'bg-[#1e3a5f] text-white' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {saved && (
        <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-center gap-2">
          <span>✓</span> Saved successfully!
        </div>
      )}

      {tab === 'net_worth' && <NetWorthCalculator onSave={handleSave} />}
      {tab === 'retirement' && <RetirementPlanner onSave={handleSave} />}
      {tab === 'cash_flow' && <CashFlowAnalyzer onSave={handleSave} />}
      {tab === 'estate' && <EstateTaxCalculator onSave={handleSave} />}
      {tab === 'tax' && <TaxOptimizationTool onSave={handleSave} />}
      {tab === 'scenario' && <ScenarioSimulator onSave={handleSave} />}
    </div>
  )
}

function ScenarioSimulator({ onSave }: { onSave: () => void }) {
  const [scenario, setScenario] = useState({
    currentAssets: '1000000',
    annualGrowth: '7',
    annualWithdrawal: '40000',
    years: '30',
  })

  const assets = parseFloat(scenario.currentAssets) || 0
  const growth = (parseFloat(scenario.annualGrowth) || 0) / 100
  const withdrawal = parseFloat(scenario.annualWithdrawal) || 0
  const years = parseInt(scenario.years) || 0

  const calculateFutureValue = () => {
    let current = assets
    const history = []
    for (let i = 0; i <= years; i++) {
      history.push({
        year: i,
        value: Math.round(current),
      })
      current = (current * (1 + growth)) - withdrawal
    }
    return history
  }

  const history = calculateFutureValue()
  const finalValue = history[history.length - 1]?.value || 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Projected End Value" value={formatCurrency(finalValue)} icon={<span>🔮</span>} color={finalValue > 0 ? '#059669' : '#dc2626'} />
        <StatsCard title="Average Annual Growth" value={`${scenario.annualGrowth}%`} icon={<span>📈</span>} color="#1e3a5f" />
        <StatsCard title="Sustainability" value={finalValue > 0 ? 'Sustainable' : 'Risk of Depletion'} icon={<span>⚠️</span>} color={finalValue > 0 ? '#059669' : '#dc2626'} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 mb-2">Scenario Parameters</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Starting Assets ($)</label>
            <input type="number" value={scenario.currentAssets} onChange={e => setScenario({...scenario, currentAssets: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Expected Growth Rate (%)</label>
            <input type="number" value={scenario.annualGrowth} onChange={e => setScenario({...scenario, annualGrowth: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Annual Withdrawal ($)</label>
            <input type="number" value={scenario.annualWithdrawal} onChange={e => setScenario({...scenario, annualWithdrawal: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Time Horizon (Years)</label>
            <input type="number" value={scenario.years} onChange={e => setScenario({...scenario, years: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
          </div>
        </div>
        <div className="lg:col-span-2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} tick={{fontSize: 12}} />
              <YAxis tickFormatter={(val) => `$${(val/1000000).toFixed(1)}M`} tick={{fontSize: 12}} />
              <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
              <Line type="monotone" dataKey="value" stroke={finalValue > 0 ? '#059669' : '#dc2626'} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={onSave} className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#1e3a5f]/90 transition-colors">Save Scenario</button>
      </div>
    </div>
  )
}

