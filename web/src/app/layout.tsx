import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import '@radix-ui/themes/styles.css'
import './theme-config.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Providers } from './providers'
import { Grid, ScrollArea } from '@radix-ui/themes'
import { MenuNav } from '@/components/MenuNav'
import { SignIn } from '@/components/SignIn'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Notification } from '@/components/Notification'
import lines from '@/assets/lines.svg'

const poppins = Poppins({
  weight: ['500', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Dashboard | Crypto Folio',
  description: 'Gerencie suas cryptomoedas e acompanhe o mercado.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} bg-[#E5E5E5] h-screen`}
        style={{ backgroundImage: `url(${lines.src})` }}
      >
        <Providers session={session}>
          <Notification />
          <div className="bg-gray-800 rounded-[50px] max-sm:rounded-none p-4 max-sm:p-0 max-w-[1440px] h-[930px] max-[1920px]:h-screen m-auto max-md:rounded-none max-lg:pb-0">
            {session ? (
              <Grid
                className="h-full"
                columns={{
                  initial: '1',
                  md: '138px 1fr',
                }}
                rows={{
                  initial: '1fr 70px',
                  sm: '1fr 100px',
                  md: '1',
                }}
              >
                <MenuNav />

                <ScrollArea
                  className="bg-white max-h-full max-w-7xl rounded-[50px] max-sm:rounded-none px-10 py-6 max-lg:px-7 max-md:px-5 max-md:py-5 max-sm:px-2"
                  type="auto"
                  scrollbars="vertical"
                  style={{ minHeight: '100%' }}
                >
                  {children}
                </ScrollArea>
              </Grid>
            ) : (
              <SignIn />
            )}
          </div>
        </Providers>
      </body>
    </html>
  )
}
