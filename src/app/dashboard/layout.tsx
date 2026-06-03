import { redirect } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'
import Sidebar from '@/components/dashboard/Sidebar'
import MarketTicker from '@/components/dashboard/MarketTicker'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }
  if ((session.user as any).requires2FA) {
    redirect('/auth/verify-2fa')
  }

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
          <MarketTicker />
          <main className="p-8 flex-1">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  )
}
