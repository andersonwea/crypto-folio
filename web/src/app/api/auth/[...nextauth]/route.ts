import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { Session, User } from 'next-auth'

async function refreshToken(refreshToken: string) {
  console.log('atualizando token...')
  const res = await fetch('http://localhost:3333/token/refresh', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })

  const data = await res.json()

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

      async authorize(credentials, req) {
        const res = await fetch('http://localhost:3333/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(credentials),
        })

        if (!res.ok) {
          return null
        }

        const user = await res.json()

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
        const response = await fetch('http://localhost:3333/me', {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })

        if (response.ok) {
          const { user } = await response.json()

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
