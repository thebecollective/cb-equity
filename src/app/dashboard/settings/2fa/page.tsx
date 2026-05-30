'use client'

import { useState, useEffect } from 'react'
import Modal from '@/components/dashboard/Modal'

export default function TwoFactorPage() {
  const [status, setStatus] = useState<'disabled' | 'enabled' | 'setup'>('disabled')
  const [qrCode, setQrCode] = useState('')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function checkStatus() {
      const res = await fetch('/api/auth/me') // Assuming this endpoint exists or use a similar one
      const data = await res.json()
      if (data?.two_factor_enabled) setStatus('enabled')
    }
    checkStatus()
  }, [])

  async function startSetup() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/2fa/setup', { method: 'POST' })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setQrCode(data.qrCodeDataUrl)
      setStatus('setup')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function verifyAndEnable() {
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
      setStatus('enabled')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h1>
        <p className="text-gray-500 mb-6">Add an extra layer of security to your account using an authenticator app.</p>
        
        {status === 'disabled' && (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <p className="font-medium text-gray-900">2FA is currently disabled</p>
              <p className="text-sm text-gray-500">Enable it to protect your account from unauthorized access.</p>
            </div>
            <button 
              onClick={startSetup}
              disabled={loading}
              className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg text-sm font-medium hover:bg-[#2d5a8e] disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Enable 2FA'}
            </button>
          </div>
        )}

        {status === 'enabled' && (
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
            <div>
              <p className="font-medium text-green-900">2FA is active</p>
              <p className="text-sm text-green-700">Your account is protected by two-factor authentication.</p>
            </div>
            <button 
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
              onClick={() => {}} // Implement disable logic
            >
              Disable 2FA
            </button>
          </div>
        )}

        {status === 'setup' && (
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-600">Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)</p>
              <img src={qrCode} alt="2FA QR Code" className="w-48 h-48 rounded-lg border border-gray-200 p-2 bg-white" />
            </div>
            <div className="max-w-xs mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Verification Token</label>
              <input 
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="000000"
                className="w-full text-center text-2xl tracking-widest px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              <button 
                onClick={verifyAndEnable}
                disabled={loading}
                className="w-full mt-4 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg font-medium hover:bg-[#2d5a8e] disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify and Enable'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
