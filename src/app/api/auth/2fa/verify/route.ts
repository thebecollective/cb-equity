import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { authenticator } = (await import('otplib')) as any
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { token } = await req.json()
    if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 })

    const { data: user } = await supabase
      .from('users')
      .select('two_factor_secret')
      .eq('id', session.user!.id)
      .single()

    if (!user?.two_factor_secret) {
      return NextResponse.json({ error: '2FA not initiated' }, { status: 400 })
    }

    const isValid = authenticator.check(token, user.two_factor_secret)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }

    await supabase
      .from('users')
      .update({ two_factor_enabled: true })
      .eq('id', session.user!.id)

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
