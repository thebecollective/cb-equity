import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import QRCode from 'qrcode'

export async function POST() {
  try {
    const { authenticator } = (await import('otplib')) as any
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const secret = authenticator.generateSecret()
    const otpauthUrl = authenticator.keyuri(session.user!.email!, 'CB Equity', secret)
    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl)

    await supabase
      .from('users')
      .update({ two_factor_secret: secret, two_factor_enabled: false })
      .eq('id', session.user!.id)

    return NextResponse.json({ qrCodeDataUrl, secret })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
