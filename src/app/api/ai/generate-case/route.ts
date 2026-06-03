import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { caseData } = body

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ 
        error: 'AI API Key not configured. Please add OPENAI_API_KEY to your .env.local',
        mock: true,
        generatedCase: {
          title: `Strategic Wealth Optimization for ${caseData.clientName || 'High-Net-Worth Client'}`,
          summary: `By transitioning from a traditional brokerage-heavy portfolio to a ${caseData.proposedSolution} structure, the client achieves immediate tax shielding and a guaranteed floor against market volatility.`,
          before: {
            taxExposure: 'High',
            riskProfile: 'Exposed to systemic crashes',
            liquidity: 'Tax-restricted',
            gap: 'Significant'
          },
          after: {
            taxExposure: 'Near Zero (Tax-Free)',
            riskProfile: 'Hedged & Protected',
            liquidity: 'High (Tax-Free Access)',
            gap: 'Closed'
          },
          financialImpact: {
            taxSavings: '$42,000 / yr',
            projectedGrowth: '7-9% Guaranteed Floor',
            legacyValue: '+$1.2M'
          }
        }
      }, { status: 200 })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an elite financial strategist at CB Equity. You create professional wealth blueprints. Output only valid JSON matching the requested structure.'
          },
          {
            role: 'user',
            content: `Generate a wealth case study for a client named ${caseData.clientName} who is a ${caseData.industry}. 
            Wealth: ${caseData.currentWealth}. Pain: ${caseData.painPoint}. Solution: ${caseData.proposedSolution}. 
            Goal: ${caseData.expectedOutcome}.
            
            Structure:
            {
              "title": "...",
              "summary": "...",
              "before": { "taxExposure": "...", "riskProfile": "...", "liquidity": "...", "gap": "..." },
              "after": { "taxExposure": "...", "riskProfile": "...", "liquidity": "...", "gap": "..." },
              "financialImpact": { "taxSavings": "...", "projectedGrowth": "...", "legacyValue": "..." }
            }`
          }
        ],
        response_format: { type: 'json_object' }
      })
    })

    const result = await response.json()
    return NextResponse.json(JSON.parse(result.choices[0].message.content))
  } catch (error) {
    console.error('AI Error:', error)
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
  }
}
