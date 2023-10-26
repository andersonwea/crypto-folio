import './globals.css'
import './theme-config.css'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import { Nav } from '@/components/Nav'
import { LogOut } from 'lucide-react'
import { RadixProvider } from './providers'
import { ScrollArea } from '@radix-ui/themes'
import Link from 'next/link'

const poppins = Poppins({
  weight: ['500', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <RadixProvider>
          <div className="bg-gray-800 rounded-[50px] p-4 max-sm:p-2 max-w-[1440px] h-[930px] max-[1920px]:h-screen m-auto grid grid-cols-[138px_1fr] max-md:rounded-none max-lg:pb-0 max-lg:grid-cols-1 max-lg:grid-rows-[1fr_100px] max-md:grid-rows-[1fr_70px]">
            <div className="flex flex-col items-center lg:mt-6 lg:mb-6 max-lg:flex-row max-lg:row-start-2 max-lg:justify-evenly max-[450px]:justify-between max-[450px]:px-4">
              <Link href={'/'} className="max-md:hidden">
                <Image src={logo} alt="crypto folio logo" />
              </Link>

              <Nav />

              <button className="h-6 w-6 text-[#A5A5A5]">
                <LogOut size={26} />
              </button>
            </div>

            {/* <div className="bg-white h-full max-w-7xl rounded-[50px] max-sm:overflow-y-auto px-16 py-9 max-lg:px-7 max-md:px-5 max-md:py-5 max-sm:px-2"> */}
            <ScrollArea
              className="bg-white max-h-full max-w-7xl rounded-[50px] px-16 py-6 max-lg:px-7 max-md:px-5 max-md:py-5 max-sm:px-2"
              type="auto"
              scrollbars="vertical"
              style={{ height: '100%' }}
            >
              {children}
            </ScrollArea>
            {/* </div> */}
          </div>
        </RadixProvider>
      </body>
    </html>
  )
}
