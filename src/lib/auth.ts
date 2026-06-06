import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const { data: users } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email as string)
        const user = users?.[0]
        if (!user) return null
        const valid = await bcrypt.compare(credentials.password as string, user.password)
        if (!valid) return null
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          firm_id: user.firm_id,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
        token.firm_id = (user as any).firm_id
        const { data } = await supabase
          .from('users')
          .select('two_factor_enabled')
          .eq('id', user.id)
          .single()
        token.requires2FA = data?.two_factor_enabled || false
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).role = token.role
        ;(session.user as any).id = token.id
        ;(session.user as any).firm_id = token.firm_id
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
})
