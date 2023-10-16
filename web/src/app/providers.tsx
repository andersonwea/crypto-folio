'use client'

import { ReactNode } from 'react'
import { Theme } from '@radix-ui/themes'

interface RadixProviderProps {
  children: ReactNode
}

export function RadixProvider({ children }: RadixProviderProps) {
  return <Theme>{children}</Theme>
}
