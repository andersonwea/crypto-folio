import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      nickname: string
      avatarUrl: string | null
      createdAt: string
      accessToken: string
      expireIn: number
    }
  }

  interface User {
    accessToken: string
    refreshToken: string
    expireIn: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
    expireIn: number
  }
}
