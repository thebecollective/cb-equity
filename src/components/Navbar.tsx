'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/careers', label: 'Careers' },
  { href: '/saas', label: 'EquityOS' },
  { href: '/education', label: 'Education' },
  { href: '/referrals', label: 'Partners' },
  { href: '/tools', label: 'Tools' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-nav shadow-sm border-b border-[var(--color-border)]' : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.25rem] items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105">
              CB
            </div>
            <div>
              <span className="text-[15px] font-semibold tracking-tight text-[var(--color-primary)]">
                CB Equity
              </span>
              <span className="block text-[9px] leading-none tracking-[0.15em] uppercase text-[var(--color-accent)]">
                Financial Advisory
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-[13px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="ml-4 rounded-lg border border-[var(--color-border)] px-4 py-2 text-[13px] font-medium text-[var(--color-primary)] transition-all hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-surface-alt)]"
            >
              Portal Login
            </Link>
            <Link
              href="/contact"
              className="ml-2 rounded-lg gradient-bg px-4 py-2 text-[13px] font-medium text-white transition-all hover:opacity-90 glow"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 bg-[var(--color-primary)]"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-5 bg-[var(--color-primary)]"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 bg-[var(--color-primary)]"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-white lg:hidden"
          >
            <div className="space-y-0.5 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-muted)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-primary)]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-center text-sm font-medium text-[var(--color-primary)]"
                >
                  Portal Login
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-lg gradient-bg px-4 py-2.5 text-center text-sm font-medium text-white"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
