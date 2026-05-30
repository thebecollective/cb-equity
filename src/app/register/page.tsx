'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function validate() {
    if (!name.trim()) return 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address'
    if (password.length < 6) return 'Password must be at least 6 characters'
    if (password !== confirmPassword) return 'Passwords do not match'
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed')
      } else {
        setSuccess(true)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1f32] via-[#1e3a5f] to-[#0f1f32] px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl bg-white p-8 text-center shadow-2xl sm:p-10">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[var(--color-foreground)]">Registration successful</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Your account has been created. You can now sign in.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-lg bg-[#1e3a5f] px-6 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#2d5a8e]"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1f32] via-[#1e3a5f] to-[#0f1f32] px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl bg-white p-8 shadow-2xl sm:p-10">
          {/* Branding */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-[#1e3a5f]">
              CB <span className="text-[#c9a84c]">Equity</span>
            </h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">Create your account</p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-[var(--color-error)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--color-foreground)]">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-foreground)]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="At least 6 characters"
                className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--color-foreground)]">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-enter your password"
                className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#2d5a8e] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[#c9a84c] hover:text-[#dcc47a] transition">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
