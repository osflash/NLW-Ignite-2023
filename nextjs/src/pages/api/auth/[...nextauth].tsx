import NextAuth, { type NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { prisma } from '~/services/prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        id: user.id
      }

      return session
    }
  }
}

export default NextAuth(authOptions)
