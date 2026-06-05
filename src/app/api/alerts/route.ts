import { NextResponse } from 'next/server'
import { getAll } from '@/lib/db'

interface Alert {
  id: string
  clientId: string
  clientName: string
  type: string
  priority: string
  message: string
  action: string
  category: string
}

export async function GET() {
  try {
    const clients = await getAll('clients')
    const planningData = await getAll('planning')
    
    const alerts: Alert[] = []

    // Intelligence Logic: Cross-reference clients with their planning data
    clients.forEach(client => {
      const planning = planningData.find(p => p.userId === client.id || p.clientId === client.id)
      
      if (!planning) return

      // 1. Tax Leakage Alert (High Income + No IUL)
      if (planning.annualIncome > 200000 && !planning.hasIUL) {
        alerts.push({
          id: `alert-tax-${client.id}`,
          clientId: client.id,
          clientName: client.name,
          type: 'Tax Leakage',
          priority: 'Critical',
          message: `${client.name}'s income of $${planning.annualIncome.toLocaleString()} puts them in a high tax bracket. They are losing wealth to annual taxes that could be sheltered in a Max-Funded IUL.`,
          action: 'Propose IUL Shield',
          category: 'Tax Strategy'
        })
      }

      // 2. Market Exposure Alert (High Stock % + Low Cash)
      if (planning.assetAllocation?.stocks > 70 && planning.assetAllocation?.cash < 10) {
        alerts.push({
          id: `alert-risk-${client.id}`,
          clientId: client.id,
          clientName: client.name,
          type: 'Market Risk',
          priority: 'High',
          message: `${client.name} is heavily over-weighted in equities (${planning.assetAllocation.stocks}%). A market correction could trigger a significant drawdown.`,
          action: 'Run Stress Test',
          category: 'Risk Management'
        })
      }

      // 3. Estate Tax Alert (High Net Worth + No Trust)
      if (planning.netWorth > 10000000 && !planning.hasTrust) {
        alerts.push({
          id: `alert-estate-${client.id}`,
          clientId: client.id,
          clientName: client.name,
          type: 'Estate Exposure',
          priority: 'High',
          message: `${client.name} has a net worth exceeding $10M without a structured trust. Significant estate tax leakage is likely upon transfer.`,
          action: 'Design Dynasty Trust',
          category: 'Estate Planning'
        })
      }
    })

    // If no real alerts found, provide a few "Strategic Suggestions" for the demo/initial state
    if (alerts.length === 0) {
      return NextResponse.json([
        {
          id: 'demo-1',
          clientId: 'demo',
          clientName: 'System Notice',
          type: 'Strategic Suggestion',
          priority: 'Medium',
          message: 'No critical leaks detected. Try adding clients with high income or high net worth to see the AI Intelligence Hub in action.',
          action: 'Add Test Client',
          category: 'System'
        }
      ])
    }

    return NextResponse.json(alerts)
  } catch (error) {
    console.error('Alerts Error:', error)
    return NextResponse.json({ error: 'Failed to fetch intelligence alerts' }, { status: 500 })
  }
}

