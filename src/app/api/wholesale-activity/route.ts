import { NextResponse } from 'next/server'

const activities = [
  { id: '1', advisor: 'J. Martinez', product: 'Indexed Universal Life — $500K', type: 'insurance', amount: 4800, region: 'TX', timestamp: new Date(Date.now() - 120000).toISOString() },
  { id: '2', advisor: 'S. Chen', product: 'Fixed Annuity 7yr — $250K', type: 'annuity', amount: 12500, region: 'CA', timestamp: new Date(Date.now() - 340000).toISOString() },
  { id: '3', advisor: 'R. Thompson', product: 'Municipal Bond Ladder', type: 'securities', amount: 500000, region: 'NY', timestamp: new Date(Date.now() - 580000).toISOString() },
  { id: '4', advisor: 'A. Patel', product: 'Term Life 20yr — $1M', type: 'insurance', amount: 1680, region: 'FL', timestamp: new Date(Date.now() - 920000).toISOString() },
  { id: '5', advisor: 'M. Johnson', product: 'CB Equity Growth ETF', type: 'mutual_fund', amount: 75000, region: 'IL', timestamp: new Date(Date.now() - 1200000).toISOString() },
  { id: '6', advisor: 'K. Williams', product: 'Whole Life — $250K', type: 'insurance', amount: 7500, region: 'GA', timestamp: new Date(Date.now() - 1800000).toISOString() },
  { id: '7', advisor: 'D. Garcia', product: 'Corporate Bond Portfolio', type: 'securities', amount: 320000, region: 'AZ', timestamp: new Date(Date.now() - 2400000).toISOString() },
  { id: '8', advisor: 'L. Brown', product: 'Final Expense — $25K', type: 'insurance', amount: 900, region: 'OH', timestamp: new Date(Date.now() - 3000000).toISOString() },
]

export async function GET() {
  const shuffled = [...activities].sort(() => Math.random() - 0.5)
  return NextResponse.json(shuffled)
}
