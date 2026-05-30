import Link from 'next/link'

const footerLinks = [
  {
    title: 'Services',
    links: [
      { href: '/services', label: 'Financial Planning' },
      { href: '/services', label: 'Insurance Solutions' },
      { href: '/services', label: 'Wealth Management' },
      { href: '/services', label: 'Securities & Fixed Income' },
    ],
  },
  {
    title: 'Opportunities',
    links: [
      { href: '/careers', label: 'Internships' },
      { href: '/careers', label: '1099 Positions' },
      { href: '/pricing', label: 'Compensation Guide' },
      { href: '/education', label: 'Education Center' },
      { href: '/referrals', label: 'Referral Program' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/portfolio', label: 'Client Results' },
      { href: '/tools', label: 'Advisor Tools' },
      { href: '/contact', label: 'Contact' },
      { href: '/login', label: 'Portal Login' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="gradient-bg text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-sm font-bold text-white">
                CB
              </div>
              <div>
                <span className="text-base font-semibold">CB Equity</span>
                <span className="block text-[9px] leading-none tracking-[0.15em] uppercase text-[var(--color-accent-light)]">
                  Financial Advisory
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/65">
              Brooke Adams & Connor Savenas — financial planning, insurance, securities, 
              annuities, and wealth management with integrity.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-white/45">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/45">
          <p>&copy; {new Date().getFullYear()} CB Equity Financial Advisory. All rights reserved.</p>
          <p className="mx-auto mt-2 max-w-3xl text-xs leading-relaxed">
            Securities offered through registered representatives. Insurance products offered through licensed agents.
            This site is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy.
          </p>
        </div>
      </div>
    </footer>
  )
}
