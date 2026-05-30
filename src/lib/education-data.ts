import type { LearningModule } from '@/components/education/LearningModuleCard'

export type TrackId = 'all' | 'insurance' | 'financial' | 'wholesale' | 'business' | 'ai' | 'majors'

export const tracks: { id: TrackId; label: string; count: number }[] = [
  { id: 'all', label: 'All Modules', count: 42 },
  { id: 'ai', label: 'AI Learning', count: 8 },
  { id: 'insurance', label: 'Insurance', count: 12 },
  { id: 'financial', label: 'Financial Advising', count: 10 },
  { id: 'wholesale', label: 'Wholesaling', count: 6 },
  { id: 'business', label: 'Business Skills', count: 8 },
  { id: 'majors', label: 'By Major', count: 14 },
]

export const aiModules: LearningModule[] = [
  {
    id: 'ai-1',
    title: 'AI Sales Coach — Insurance Objections',
    description: 'Practice handling objections with our AI trained on Brooke & Connor\'s closing techniques. Real-time feedback on your responses.',
    format: 'ai',
    lessons: 24,
    duration: 'Self-paced',
    difficulty: 'intermediate',
    aiPowered: true,
    tags: ['Sales', 'Insurance', 'Role-play'],
  },
  {
    id: 'ai-2',
    title: 'Market Commentary Generator',
    description: 'Learn to interpret market moves using our proprietary AI lens. Generate client-ready commentary aligned with CB Equity philosophy.',
    format: 'ai',
    lessons: 12,
    duration: '3 hours',
    difficulty: 'advanced',
    aiPowered: true,
    tags: ['Securities', 'Markets', 'Client comms'],
  },
  {
    id: 'ai-3',
    title: 'Needs Analysis AI Assistant',
    description: 'Walk through client discovery scenarios. AI guides you through insurance and planning needs analysis step by step.',
    format: 'ai',
    lessons: 18,
    duration: '4 hours',
    difficulty: 'beginner',
    aiPowered: true,
    tags: ['Planning', 'Discovery', 'Insurance'],
  },
  {
    id: 'ai-4',
    title: 'Product Matcher — Right Fit Every Time',
    description: 'Input client profile data and learn how our AI recommends term, whole, IUL, or annuity solutions with rationale you can explain.',
    format: 'ai',
    lessons: 15,
    duration: '2.5 hours',
    difficulty: 'intermediate',
    aiPowered: true,
    tags: ['Products', 'Recommendations'],
  },
  {
    id: 'ai-5',
    title: 'Compliance Check AI',
    description: 'Submit presentation drafts and marketing copy for AI review against common compliance pitfalls before you go live.',
    format: 'ai',
    lessons: 8,
    duration: '1.5 hours',
    difficulty: 'advanced',
    aiPowered: true,
    tags: ['Compliance', 'Marketing'],
  },
  {
    id: 'ai-6',
    title: 'Wholesale Pitch Simulator',
    description: 'Practice advisor-facing pitches for fixed income and annuity products. AI plays the skeptical advisor.',
    format: 'ai',
    lessons: 10,
    duration: '2 hours',
    difficulty: 'intermediate',
    aiPowered: true,
    tags: ['Wholesaling', 'Presentation'],
  },
  {
    id: 'ai-7',
    title: 'Social Content AI for Interns',
    description: 'Generate on-brand LinkedIn and Instagram drafts for financial services. Learn what works with guided AI editing.',
    format: 'ai',
    lessons: 20,
    duration: '5 hours',
    difficulty: 'beginner',
    aiPowered: true,
    tags: ['Marketing', 'Interns', 'Social media'],
  },
  {
    id: 'ai-8',
    title: 'Exam Prep Tutor — Series & Insurance',
    description: 'Adaptive AI practice for life insurance licensing and securities essentials. Personalized weak-area drilling.',
    format: 'ai',
    lessons: 50,
    duration: '15+ hours',
    difficulty: 'intermediate',
    aiPowered: true,
    tags: ['Exam prep', 'Practice tests'],
  },
]

export const catalogModules: (LearningModule & { track: TrackId })[] = [
  { id: 'est-1', track: 'financial', title: 'Wills & Trusts 101', description: 'Understanding the difference between wills and trusts, and how to protect assets from probate.', format: 'course', lessons: 10, duration: '5 hrs', difficulty: 'beginner' },
  { id: 'est-2', track: 'financial', title: 'Estate Tax Strategies', description: 'Advanced techniques for reducing estate and inheritance taxes for high-net-worth families.', format: 'course', lessons: 8, duration: '4 hrs', difficulty: 'advanced' },
  { id: 'tax-1', track: 'financial', title: 'Tax-Efficient Investing', description: 'How to use tax-advantaged accounts and strategies to maximize long-term returns.', format: 'course', lessons: 12, duration: '6 hrs', difficulty: 'intermediate' },
  { id: 'tax-2', track: 'business', title: 'Corporate Tax Mastery', description: 'Tax planning for business owners: S-Corp vs LLC and strategic deductions.', format: 'course', lessons: 15, duration: '8 hrs', difficulty: 'advanced' },
  { id: 'ins-1', track: 'insurance', title: 'Life Insurance Fundamentals', description: 'Core concepts: death benefit, beneficiaries, insurable and policy types.', format: 'course', lessons: 12, duration: '4 hrs', difficulty: 'beginner' },
  { id: 'ins-2', track: 'insurance', title: 'Term vs Whole vs Universal', description: 'Compare permanent and temporary coverage with real client scenarios.', format: 'course', lessons: 8, duration: '3 hrs', difficulty: 'beginner' },
  { id: 'ins-3', track: 'insurance', title: 'Annuity Products Deep Dive', description: 'Fixed, variable, and indexed annuities — qualified vs non-qualified.', format: 'course', lessons: 10, duration: '5 hrs', difficulty: 'intermediate' },
  { id: 'ins-4', track: 'insurance', title: 'Final Expense Planning', description: 'Simplified issue products and senior market needs analysis.', format: 'course', lessons: 6, duration: '2 hrs', difficulty: 'beginner' },
  { id: 'ins-5', track: 'insurance', title: 'Insurance Needs Analysis Workshop', description: 'Hands-on workshop calculating human life value and coverage gaps.', format: 'workshop', lessons: 5, duration: '90 min', difficulty: 'intermediate' },
  { id: 'fin-1', track: 'financial', title: 'Financial Planning Process', description: 'CFP-style process from discovery through implementation and review.', format: 'course', lessons: 10, duration: '6 hrs', difficulty: 'intermediate' },
  { id: 'fin-2', track: 'financial', title: 'Securities & Fixed Income Basics', description: 'Bonds, treasuries, munis, and yield curve fundamentals.', format: 'course', lessons: 8, duration: '4 hrs', difficulty: 'beginner' },
  { id: 'fin-3', track: 'financial', title: 'Retirement Income Strategies', description: 'Social Security, pensions, annuities, and withdrawal sequencing.', format: 'course', lessons: 7, duration: '3.5 hrs', difficulty: 'intermediate' },
  { id: 'fin-4', track: 'financial', title: 'Estate Planning Essentials', description: 'Wills, trusts, beneficiary designations, and liquidity planning.', format: 'course', lessons: 6, duration: '3 hrs', difficulty: 'advanced' },
  { id: 'who-1', track: 'wholesale', title: 'Wholesale Distribution 101', description: 'How the wholesale channel works and your role as a wholesaler.', format: 'course', lessons: 8, duration: '4 hrs', difficulty: 'beginner' },
  { id: 'who-2', track: 'wholesale', title: 'Fixed Income Product Mastery', description: 'Ladders, barbells, and credit analysis for advisor clients.', format: 'course', lessons: 10, duration: '5 hrs', difficulty: 'advanced' },
  { id: 'bus-1', track: 'business', title: 'Effective Communication', description: 'Client meetings, presentations, and difficult conversations.', format: 'course', lessons: 6, duration: '2.5 hrs', difficulty: 'beginner' },
  { id: 'bus-2', track: 'business', title: 'Marketing Your Practice', description: 'Digital presence, referrals, and compliant marketing.', format: 'course', lessons: 8, duration: '4 hrs', difficulty: 'intermediate' },
  { id: 'bus-3', track: 'business', title: 'Accounting for Advisors', description: 'P&L, 1099 income tracking, and basic bookkeeping.', format: 'course', lessons: 7, duration: '3 hrs', difficulty: 'intermediate' },
]

export const majorTracks = [
  { major: 'Communications', modules: 6, color: 'from-blue-500/10 to-blue-600/5', icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a2.25 2.25 0 011.616-1.03 48.96 48.96 0 005.676-.227' },
  { major: 'Marketing', modules: 8, color: 'from-violet-500/10 to-violet-600/5', icon: 'M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.054 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.357 20.357 0 01-1.98-4.286' },
  { major: 'Finance', modules: 10, color: 'from-emerald-500/10 to-emerald-600/5', icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' },
  { major: 'Accounting', modules: 7, color: 'from-amber-500/10 to-amber-600/5', icon: 'M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5z' },
  { major: 'Business', modules: 9, color: 'from-rose-500/10 to-rose-600/5', icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21' },
  { major: 'Computer Science', modules: 8, color: 'from-cyan-500/10 to-cyan-600/5', icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5' },
  { major: 'Sales', modules: 6, color: 'from-indigo-500/10 to-indigo-600/5', icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941' },
]

export const resources: LearningModule[] = [
  // Books
  { id: 'res-1', title: 'The Insurance Advisor\'s Handbook', description: 'Comprehensive reference for life products, underwriting, and case design.', format: 'book', duration: 'Read', difficulty: 'intermediate', tags: ['Reference'] },
  { id: 'res-3', title: 'Wholesaling Fixed Income: A Practical Guide', description: 'Connor Savenas walks through wholesale fixed income distribution.', format: 'book', duration: 'Read', difficulty: 'advanced', tags: ['Connor Savenas'] },
  { id: 'res-7', title: 'Financial Planning for the Modern Era', description: 'Principles for long-term client success in a changing market.', format: 'book', duration: 'Read', difficulty: 'intermediate', tags: ['Planning'] },
  // Videos
  { id: 'res-2', title: 'Mastering the Financial Planning Interview', description: 'Video series by Brooke Adams on client discovery and rapport.', format: 'video', lessons: 12, duration: '3 hrs', difficulty: 'beginner', tags: ['Brooke Adams'] },
  { id: 'res-6', title: 'Client Communication Masterclass', description: 'Video series on presentations, follow-up, and retention.', format: 'video', lessons: 8, duration: '2 hrs', difficulty: 'beginner' },
  { id: 'res-8', title: 'Wholesale Presentation Tactics', description: 'Connor Savenas demonstrates high-impact advisor presentations.', format: 'video', lessons: 5, duration: '1.5 hrs', difficulty: 'intermediate', tags: ['Connor Savenas'] },
  // Practice
  { id: 'res-4', title: 'Life Insurance License Exam Prep', description: '150-question practice test with detailed explanations.', format: 'practice', lessons: 150, duration: '3 hrs', difficulty: 'intermediate' },
  { id: 'res-5', title: 'Securities Essentials Exam Simulator', description: '200-question timed simulator mirroring exam conditions.', format: 'practice', lessons: 200, duration: '4 hrs', difficulty: 'advanced' },
  { id: 'res-9', title: 'Compliance & Ethics Quiz', description: 'Test your knowledge on common compliance pitfalls in financial services.', format: 'practice', lessons: 50, duration: '1 hr', difficulty: 'beginner' },
]

export function filterModules(track: TrackId): LearningModule[] {
  if (track === 'all') return [...aiModules, ...catalogModules]
  if (track === 'ai') return aiModules
  if (track === 'majors') return []
  return catalogModules.filter((m) => {
    const map: Record<TrackId, string> = {
      insurance: 'insurance',
      financial: 'financial',
      wholesale: 'wholesale',
      business: 'business',
      all: '',
      ai: '',
      majors: '',
    }
    return m.track === map[track]
  })
}
