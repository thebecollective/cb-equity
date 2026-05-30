'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [name, setName] = useState('John Doe')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profileMessage, setProfileMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [exporting, setExporting] = useState(false)
  const [exportMessage, setExportMessage] = useState('')
  const [widgets, setWidgets] = useState({
    stats: true,
    recentActivity: true,
    upcomingTasks: true,
    marketOverview: true,
  })

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setProfileMessage('Name cannot be empty.')
      return
    }
    setProfileMessage('Profile updated successfully!')
    setTimeout(() => setProfileMessage(''), 3000)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage('All password fields are required.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage('New passwords do not match.')
      return
    }
    if (newPassword.length < 8) {
      setPasswordMessage('Password must be at least 8 characters.')
      return
    }
    setPasswordMessage('Password changed successfully!')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setPasswordMessage(''), 3000)
  }

  const handleExport = async () => {
    setExporting(true)
    setExportMessage('')
    try {
      const endpoints = [
        '/api/clients',
        '/api/leads',
        '/api/commissions',
        '/api/referrals',
        '/api/orders',
        '/api/planning',
      ]
      const results = await Promise.all(
        endpoints.map(async (url) => {
          try {
            const res = await fetch(url)
            const data = await res.json()
            return { endpoint: url, data }
          } catch {
            return { endpoint: url, data: null }
          }
        })
      )

      const exportData = {
        exportedAt: new Date().toISOString(),
        data: Object.fromEntries(results.map((r) => [r.endpoint.replace('/api/', ''), r.data])),
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cb-equity-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setExportMessage('Data exported successfully!')
    } catch {
      setExportMessage('Export failed. Please try again.')
    } finally {
      setExporting(false)
      setTimeout(() => setExportMessage(''), 3000)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Profile</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value="john.doe@cb-equity.com"
              disabled
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value="Financial Advisor"
              disabled
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
            >
              Update Profile
            </button>
            {profileMessage && (
              <span className="text-sm text-green-600 font-medium">{profileMessage}</span>
            )}
          </div>
        </form>
      </div>

      {/* Account Security */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Account Security</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
            >
              Change Password
            </button>
            {passwordMessage && (
              <span
                className={`text-sm font-medium ${
                  passwordMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {passwordMessage}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Import/Export Data */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Import / Export Data</h2>
        <p className="text-sm text-gray-500 mb-4">
          Download all your data as a JSON file including clients, leads, commissions, referrals,
          orders, and planning data.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light disabled:opacity-50 transition-colors"
          >
            {exporting ? 'Exporting...' : 'Export All Data'}
          </button>
          {exportMessage && (
            <span className="text-sm text-green-600 font-medium">{exportMessage}</span>
          )}
        </div>
      </div>

      {/* Dashboard Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Dashboard Preferences</h2>
        <div className="space-y-3">
          <label className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Show Statistics Widgets</span>
            <button
              type="button"
              role="switch"
              aria-checked={widgets.stats}
              onClick={() => setWidgets({ ...widgets, stats: !widgets.stats })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                widgets.stats ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  widgets.stats ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
          <label className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Show Recent Activity</span>
            <button
              type="button"
              role="switch"
              aria-checked={widgets.recentActivity}
              onClick={() => setWidgets({ ...widgets, recentActivity: !widgets.recentActivity })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                widgets.recentActivity ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  widgets.recentActivity ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
          <label className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Show Upcoming Tasks</span>
            <button
              type="button"
              role="switch"
              aria-checked={widgets.upcomingTasks}
              onClick={() => setWidgets({ ...widgets, upcomingTasks: !widgets.upcomingTasks })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                widgets.upcomingTasks ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  widgets.upcomingTasks ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
          <label className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Show Market Overview</span>
            <button
              type="button"
              role="switch"
              aria-checked={widgets.marketOverview}
              onClick={() => setWidgets({ ...widgets, marketOverview: !widgets.marketOverview })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                widgets.marketOverview ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  widgets.marketOverview ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-2">Theme</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary border-2 border-primary" />
            <span className="text-sm text-gray-600">Dark Navy (current)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
