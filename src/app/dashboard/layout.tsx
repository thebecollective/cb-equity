import { redirect } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'
import Sidebar from '@/components/dashboard/Sidebar'

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
        <main className="ml-64 flex-1 p-8 min-h-screen bg-gray-50">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
