import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      nickname: string
      avatarUrl: string | null
      createdAt: string
    }
    token: string
  }
}
