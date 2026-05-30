'use client'

import { Suspense, useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(errorParam || '')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.ok) {
      router.push('/dashboard')
    } else {
      setError(res?.error || 'Invalid email or password')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-md"
    >
      <div className="rounded-2xl bg-white p-8 shadow-2xl sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1e3a5f]">
            CB <span className="text-[#c9a84c]">Equity</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1.5 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-1.5 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20"
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
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-[#c9a84c] hover:text-[#dcc47a] transition">
            Create one
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1f32] via-[#1e3a5f] to-[#0f1f32] px-4">
      <Suspense fallback={
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      }>
        <LoginForm />
      </Suspense>
    </div>
  )
}
