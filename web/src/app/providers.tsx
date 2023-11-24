'use client'

import { ReactNode } from 'react'
import { Theme } from '@radix-ui/themes'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { NextUIProvider } from '@nextui-org/react'

interface ProvidersProps {
  children: ReactNode
  session: Session | null
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Theme>{children}</Theme>
      </NextUIProvider>
    </SessionProvider>
  )
}
