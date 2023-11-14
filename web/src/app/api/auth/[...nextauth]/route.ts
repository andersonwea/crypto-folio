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

        const user = await res.json()

        if (!user) {
          return null
        }

        return user
      },
    }),
  ],

  pages: {
    signIn: '/',
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
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

      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.accessToken = token.accessToken

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
          }
        }
      }

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
