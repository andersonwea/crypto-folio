'use client'

import { SearchBar } from '@/components/SearchBar'
import { Heading } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

export function Search() {
  const router = useRouter()

  function handleSearch(e: MouseEvent<HTMLElement>) {
    router.push(`/market/${e.currentTarget.id}`)
  }

  return (
    <div className="flex items-center gap-10 max-sm:gap-3 relative max-w-lg">
      <Heading>Criptomoedas</Heading>
      <SearchBar onClick={handleSearch} />
    </div>
  )
}
