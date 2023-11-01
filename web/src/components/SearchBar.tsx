'use client'

import { ScrollArea } from '@radix-ui/themes'
import { TextInput } from './TextInput'
import { Currency } from '@/app/wallet/components/Currency'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { MouseEvent } from 'react'

interface SearchBarProps {
  onClick: (e: MouseEvent<HTMLElement>) => void
}

export function SearchBar({ onClick }: SearchBarProps) {
  const search = useCurrencyStore((state) => state.search)
  const setSearch = useCurrencyStore((state) => state.setSearch)

  return (
    <div className="relative w-full">
      <TextInput
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Procurar"
      />

      <div
        className={`absolute z-50 mt-2 left-0 right-0 shadow-3xl h-[290] bg-white ${
          search.length > 0 ? 'visible' : 'invisible'
        }`}
      >
        <ScrollArea type="auto" scrollbars="vertical" style={{ height: 290 }}>
          <menu className="p-4">
            {[1, 2, 3, 4, 5, 6, 7].map((currency) => (
              <Currency
                key={currency}
                onClick={onClick}
                value={`bitcoin${currency}`}
                id={`bitcoin${currency}`}
              />
            ))}
          </menu>
        </ScrollArea>
      </div>
    </div>
  )
}
