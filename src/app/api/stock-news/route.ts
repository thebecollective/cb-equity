import { NextResponse } from 'next/server'

const articles = [
  {
    symbol: 'AAPL',
    title: 'Apple Reports Record Quarterly Revenue',
    summary: 'Apple Inc. announced record quarterly revenue driven by strong iPhone and Services performance, exceeding analyst expectations.',
    source: 'Financial Times',
    date: '2026-05-28',
    url: 'https://example.com/aapl-q3-earnings',
  },
  {
    symbol: 'MSFT',
    title: 'Microsoft Expands AI Cloud Infrastructure',
    summary: 'Microsoft is investing $10 billion in new AI data centers across North America to meet growing demand for cloud AI services.',
    source: 'Reuters',
    date: '2026-05-27',
    url: 'https://example.com/msft-ai-expansion',
  },
  {
    symbol: 'GOOGL',
    title: 'Alphabet Faces New EU Antitrust Scrutiny',
    summary: 'The European Commission has opened a formal investigation into Alphabet\'s digital advertising practices.',
    source: 'Bloomberg',
    date: '2026-05-27',
    url: 'https://example.com/googl-eu-antitrust',
  },
  {
    symbol: 'AMZN',
    title: 'Amazon Launches Same-Day Delivery in 50 New Markets',
    summary: 'Amazon continues its logistics expansion with same-day delivery now available in over 200 metropolitan areas globally.',
    source: 'CNBC',
    date: '2026-05-26',
    url: 'https://example.com/amzn-delivery',
  },
  {
    symbol: 'TSLA',
    title: 'Tesla\'s Full Self-Driving Approved in Europe',
    summary: 'Regulators have approved Tesla\'s Full Self-Driving software for select highways in Germany, France, and the Netherlands.',
    source: 'The Verge',
    date: '2026-05-26',
    url: 'https://example.com/tsla-fsd-europe',
  },
  {
    symbol: 'JPM',
    title: 'JPMorgan Chase Leads Banking Sector Rally',
    summary: 'JPMorgan\'s stock hit a 52-week high after reporting better-than-expected net interest income and investment banking fees.',
    source: 'Wall Street Journal',
    date: '2026-05-25',
    url: 'https://example.com/jpm-banking-rally',
  },
  {
    symbol: 'NVDA',
    title: 'Nvidia Unveils Next-Generation AI Chip',
    summary: 'Nvidia announced its Rubin architecture GPUs, promising a 4x performance boost for AI training workloads.',
    source: 'TechCrunch',
    date: '2026-05-25',
    url: 'https://example.com/nvda-new-chip',
  },
  {
    symbol: 'META',
    title: 'Meta Reports Strong Ad Revenue Growth',
    summary: 'Meta Platforms saw ad revenue grow 22% year-over-year as AI-driven ad targeting improves ROI for advertisers.',
    source: 'CNBC',
    date: '2026-05-24',
    url: 'https://example.com/meta-ad-revenue',
  },
]

export async function GET() {
  return NextResponse.json(articles)
}
