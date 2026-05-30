import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getAll, User } from '@/lib/db'
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
          const users = await getAll('users')
          const user = users.find((u: User) => u.email === credentials.email as string)
        if (!user) return null
        const valid = await bcrypt.compare(credentials.password as string, user.password)
        if (!valid) return null
        return { id: user.id, name: user.name, email: user.email, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
        
        // Check if 2FA is enabled in Supabase
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
        (session.user as any).role = token.role
        ;(session.user as any).id = token.id
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
})
