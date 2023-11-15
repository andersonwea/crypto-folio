export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/wallet/:path*',
    '/me/:path*',
    '/market/:path*',
    '/dashboard/:path*',
    '/watchlist/:path*',
  ],
}
