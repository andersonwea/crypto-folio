import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('cryptofolio.token')?.value

  const homeUrl = new URL(request.url).hostname

  if (!token) {
    return NextResponse.redirect(`http://${homeUrl}:3000`, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/wallet/:path*',
    '/me/:path*',
    '/market/:path*',
    '/dashboard/:path*',
    '/watchlist/:path*',
  ],
}
