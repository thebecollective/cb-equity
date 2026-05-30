'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Verify2FAPage() {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1f32] via-[#1e3a5f] to-[#0f1f32] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl bg-white p-8 shadow-2xl sm:p-10 text-center">
          <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">Two-Factor Authentication</h1>
          <p className="text-gray-500 mb-8">Enter the 6-digit code from your authenticator app</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input 
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              maxLength={6}
              placeholder="000000"
              className="w-full text-center text-3xl tracking-widest px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#c9a84c]/20"
              required
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1e3a5f] text-white rounded-lg font-semibold hover:bg-[#2d5a8e] transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
