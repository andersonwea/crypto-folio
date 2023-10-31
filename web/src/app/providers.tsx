'use client'

import { ReactNode } from 'react'
import { Theme } from '@radix-ui/themes'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <Theme>{children}</Theme>
}
