import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { Session, User } from 'next-auth'
import { api } from '@/libs/api'

async function refreshToken(refreshToken: string) {
  const response = await api.patch('/token/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })

  const data = response.data

  return data
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',

      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'seu email' },
        password: { label: 'Senha', type: 'password' },
      },

      async authorize(credentials) {
        const response = await api.post('/sessions', credentials)

        const { user } = response.data

        if (!user) {
          return null
        }

        return user
      },
    }),
  ],

  pages: {
    signIn: '/',
    signOut: '/',
  },

  callbacks: {
    async jwt({
      token,
      user,
      trigger,
    }: {
      token: JWT
      user: User
      trigger?: 'signIn' | 'signUp' | 'update' | undefined
    }) {
      if (user) {
        console.log('tem user')
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.expireIn = user.expireIn
      }

      const twoMinutesInMilliseconds = 1000 * 60 * 2

      if (Date.now() < token.expireIn - twoMinutesInMilliseconds) {
        return token
      }

      const refreshedToken = await refreshToken(token.refreshToken)

      token.accessToken = refreshedToken.accessToken
      token.refreshToken = refreshedToken.refreshToken
      token.expireIn = refreshedToken.expireIn

      if (trigger === 'update') {
        return { ...token }
      }

      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.accessToken = token.accessToken
      session.user.expireIn = token.expireIn

      if (session.user.accessToken ?? false) {
        const response = await api('/me', {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        const { user } = response.data

        if (user) {
          session.user = {
            ...user,
            accessToken: token.accessToken,
            expireIn: token.expireIn,
          }
        }
      }

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
