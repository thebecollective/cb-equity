import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock intelligence engine: In a real app, this would scan the 'clients' and 'planning' tables
    // and correlate them with current market data APIs.
    const alerts = [
      {
        id: 'alert-1',
        clientId: 'client-123',
        clientName: 'Sarah Jenkins',
        type: 'Market Opportunity',
        priority: 'High',
        message: '10-Year Treasury yields just hit 4.5%. Sarah has $200k in low-yield cash. Suggest a Treasury Ladder move.',
        action: 'Send Pivot Proposal',
        category: 'Fixed Income'
      },
      {
        id: 'alert-2',
        clientId: 'client-456',
        clientName: 'Robert Chen',
        type: 'Tax Leakage',
        priority: 'Critical',
        message: 'Robert\'s projected income for Q4 has crossed the $400k threshold. High risk of tax leakage in taxable brokerage.',
        action: 'Propose IUL Shield',
        category: 'Tax Strategy'
      },
      {
        id: 'alert-3',
        clientId: 'client-789',
        clientName: 'Michael Thorne',
        type: 'Lifecycle Event',
        priority: 'Medium',
        message: 'Michael\'s child turns 18 next month. Opportunity to discuss educational trust funding and generational transfer.',
        action: 'Schedule Legacy Review',
        category: 'Estate Planning'
      }
    ]

    return NextResponse.json(alerts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch intelligence alerts' }, { status: 500 })
  }
}
