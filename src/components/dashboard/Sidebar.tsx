'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/performance', label: 'My Performance', icon: '🏆' },
  { href: '/dashboard/clients', label: 'Clients', icon: '👥' },
  { href: '/dashboard/leads', label: 'Leads', icon: '📋' },
  { href: '/dashboard/wholesale', label: 'Wholesale Hub', icon: '📦' },
  { href: '/dashboard/partnerships', label: 'B2B Partners', icon: '🏢' },
  { href: '/dashboard/commissions', label: 'Commissions', icon: '💰' },
  { href: '/dashboard/referrals', label: 'Referrals', icon: '🔗' },
  { href: '/dashboard/orders', label: 'Orders', icon: '📝' },
  { href: '/dashboard/education', label: 'Education', icon: '📚' },
  { href: '/dashboard/intern', label: 'Intern Hub', icon: '🌱' },
  { href: '/dashboard/marketing', label: 'Marketing Hub', icon: '📣' },
  { href: '/dashboard/finance', label: 'Finance Hub', icon: '🏦' },
  { href: '/dashboard/planning', label: 'Financial Planning', icon: '📈' },
  { href: '/dashboard/ai-bot', label: 'AI Assistant', icon: '🤖' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-[#1e3a5f] text-white flex flex-col z-50">
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-[#c9a84c] tracking-tight">CB Equity</h1>
        <p className="text-xs text-white/50 mt-1">Dashboard</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/15 text-[#c9a84c]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 w-full transition-colors"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
