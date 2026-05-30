import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

async function seed() {
  const password = await bcrypt.hash('demo123', 12)
  const now = new Date().toISOString()
  const brookeId = 'usr_brooke'
  const connorId = 'usr_connor'

  const db = {
    users: [
      { id: brookeId, name: 'Brooke Adams', email: 'brooke@cb-equity.com', password, role: 'admin', createdAt: now },
      { id: connorId, name: 'Connor Savenas', email: 'connor@cb-equity.com', password, role: 'admin', createdAt: now },
    ],
    clients: [
      { id: 'cli_1', userId: brookeId, name: 'Robert & Linda Hayes', email: 'rhayes@email.com', phone: '(555) 234-8901', address: '124 Oak Lane, Austin, TX', notes: 'Retirement planning — interested in annuities', status: 'active', tags: ['retirement', 'annuity'], createdAt: now, updatedAt: now },
      { id: 'cli_2', userId: brookeId, name: 'Michael Torres', email: 'mtorres@email.com', phone: '(555) 345-6789', address: '88 Pine St, Miami, FL', notes: 'Business owner — key person insurance', status: 'active', tags: ['insurance', 'business'], createdAt: now, updatedAt: now },
      { id: 'cli_3', userId: connorId, name: 'Jennifer Walsh', email: 'jwalsh@email.com', phone: '(555) 456-1234', address: '450 Elm Ave, Chicago, IL', notes: 'Fixed income portfolio review', status: 'active', tags: ['securities', 'fixed-income'], createdAt: now, updatedAt: now },
    ],
    leads: [
      { id: 'lead_1', userId: brookeId, name: 'David Kim', email: 'dkim@email.com', phone: '(555) 111-2222', source: 'referral', interest: ['life insurance', 'financial planning'], notes: 'Referred by real estate agent', status: 'qualified', value: 15000, createdAt: now, updatedAt: now },
      { id: 'lead_2', userId: brookeId, name: 'Sarah Mitchell', email: 'smitchell@email.com', phone: '(555) 222-3333', source: 'website', interest: ['term life'], notes: 'New parent — needs coverage', status: 'new', value: 4800, createdAt: now, updatedAt: now },
      { id: 'lead_3', userId: connorId, name: 'James Cooper', email: 'jcooper@email.com', phone: '(555) 333-4444', source: 'call', interest: ['fixed income', 'annuities'], notes: 'Pre-retirement, $500K to invest', status: 'proposal', value: 500000, createdAt: now, updatedAt: now },
      { id: 'lead_4', userId: brookeId, name: 'Amanda Foster', email: 'afoster@email.com', phone: '(555) 444-5555', source: 'referral', interest: ['estate planning', 'whole life'], notes: 'Referred by attorney partner', status: 'contacted', value: 25000, createdAt: now, updatedAt: now },
    ],
    commissions: [
      { id: 'com_1', userId: brookeId, clientId: 'cli_1', clientName: 'Robert & Linda Hayes', type: 'annuity', product: 'Fixed Annuity 7yr', premium: 150000, rate: 5, amount: 7500, status: 'paid', date: '2026-05-15', paidAt: '2026-05-20', createdAt: now },
      { id: 'com_2', userId: brookeId, clientId: 'cli_2', clientName: 'Michael Torres', type: 'insurance', product: 'IUL $1M', premium: 7200, rate: 80, amount: 5760, status: 'pending', date: '2026-05-22', paidAt: null, createdAt: now },
      { id: 'com_3', userId: connorId, clientId: 'cli_3', clientName: 'Jennifer Walsh', type: 'securities', product: 'Muni Bond Ladder', premium: 320000, rate: 1.2, amount: 3840, status: 'paid', date: '2026-05-10', paidAt: '2026-05-18', createdAt: now },
    ],
    referrals: [
      { id: 'ref_1', userId: brookeId, partnerName: 'Lisa Nguyen', partnerType: 'real_estate', partnerEmail: 'lisa@premierrealty.com', partnerPhone: '(555) 777-8888', clientName: 'David Kim', clientEmail: 'dkim@email.com', clientPhone: '(555) 111-2222', status: 'converted', commission: 500, createdAt: now, updatedAt: now },
      { id: 'ref_2', userId: brookeId, partnerName: 'Mark Stevens CPA', partnerType: 'cpa', partnerEmail: 'mark@stevenscpa.com', partnerPhone: '(555) 888-9999', clientName: 'Amanda Foster', clientEmail: 'afoster@email.com', clientPhone: '(555) 444-5555', status: 'contacted', commission: 750, createdAt: now, updatedAt: now },
    ],
    referralPayouts: [],
    courses: [
      {
        id: 'course_1', title: 'Life Insurance Fundamentals', category: 'insurance', description: 'Complete guide to term, whole, and universal life products.', duration: '4 hours', difficulty: 'beginner', createdAt: now,
        modules: [
          { title: 'Introduction to Life Insurance', content: 'Overview of life insurance types and uses.', duration: '30 min' },
          { title: 'Term vs Permanent', content: 'Comparing term, whole, and universal life.', duration: '45 min' },
          { title: 'Needs Analysis', content: 'Calculating coverage amounts for clients.', duration: '40 min' },
        ],
      },
      {
        id: 'course_2', title: 'Financial Planning Process', category: 'financial_advising', description: 'The CFP-style planning process from discovery to implementation.', duration: '6 hours', difficulty: 'intermediate', createdAt: now,
        modules: [
          { title: 'Client Discovery', content: 'Gathering goals, assets, and risk tolerance.', duration: '45 min' },
          { title: 'Cash Flow Analysis', content: 'Building and analyzing client cash flows.', duration: '50 min' },
        ],
      },
      {
        id: 'course_3', title: 'Wholesale Distribution 101', category: 'wholesaling', description: 'How to wholesale fixed income and annuity products to advisors.', duration: '5 hours', difficulty: 'intermediate', createdAt: now,
        modules: [
          { title: 'Wholesale Model Overview', content: 'Understanding the wholesale distribution channel.', duration: '35 min' },
        ],
      },
    ],
    quizzes: [
      {
        id: 'quiz_1', courseId: 'course_1', title: 'Life Insurance License Prep', passingScore: 70,
        questions: [
          { question: 'Which type of life insurance provides coverage for a specific period?', options: ['Whole Life', 'Term Life', 'Universal Life', 'Variable Life'], correctIndex: 1 },
          { question: 'What is the primary purpose of a needs analysis?', options: ['Set premiums', 'Determine coverage amount', 'Choose a carrier', 'Calculate taxes'], correctIndex: 1 },
          { question: 'Which product builds cash value?', options: ['Term Life', 'Accidental Death', 'Whole Life', 'Group Term'], correctIndex: 2 },
        ],
      },
    ],
    quizAttempts: [],
    planningData: [],
    products: [
      { id: 'prod_1', type: 'insurance', name: '20-Year Term Life', description: 'Level premium term life insurance', category: 'Term Life', commissionRate: 70, minInvestment: 0, createdAt: now },
      { id: 'prod_2', type: 'insurance', name: 'Indexed Universal Life', description: 'Permanent life with index-linked cash value', category: 'Universal Life', commissionRate: 85, minInvestment: 0, createdAt: now },
      { id: 'prod_3', type: 'annuity', name: 'Fixed Annuity 7-Year', description: 'Guaranteed fixed rate annuity', category: 'Fixed Annuity', commissionRate: 5, minInvestment: 25000, createdAt: now },
      { id: 'prod_4', type: 'securities', name: 'Municipal Bond Ladder', description: 'Tax-advantaged municipal bond portfolio', category: 'Fixed Income', commissionRate: 1, minInvestment: 100000, createdAt: now },
      { id: 'prod_5', type: 'mutual_fund', name: 'CB Equity Growth ETF', description: 'Custom growth ETF managed by CB Equity', category: 'ETF', commissionRate: 0.5, minInvestment: 1000, createdAt: now },
    ],
    orders: [
      { id: 'ord_1', userId: brookeId, clientId: 'cli_1', productId: 'prod_3', productName: 'Fixed Annuity 7-Year', productType: 'annuity', amount: 150000, commission: 7500, status: 'executed', createdAt: now },
      { id: 'ord_2', userId: brookeId, clientId: 'cli_2', productId: 'prod_2', productName: 'Indexed Universal Life', productType: 'insurance', amount: 7200, commission: 5760, status: 'pending', createdAt: now },
    ],
  }

  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
  console.log('Database seeded successfully!')
  console.log('Login credentials:')
  console.log('  brooke@cb-equity.com / demo123')
  console.log('  connor@cb-equity.com / demo123')
}

seed().catch(console.error)
