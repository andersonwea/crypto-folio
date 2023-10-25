'use client'

import { ScrollArea } from '@radix-ui/themes'
import { TextInput } from './TextInput'
import { Currency } from '@/app/wallet/components/Currency'
import { useSelectCurrency } from '@/hooks/useSelectCurrency'

export function SearchBar() {
  const search = useSelectCurrency((state) => state.search)
  const setSearch = useSelectCurrency((state) => state.setSearch)
  const setCurrency = useSelectCurrency((state) => state.setCurrency)

  return (
    <div>
      <TextInput
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Procurar"
      />

      <div
        className={`absolute mt-2 left-8 right-8 shadow-3xl h-[290] bg-white ${
          search.length > 0 ? 'visible' : 'invisible'
        }`}
      >
        <ScrollArea type="auto" scrollbars="vertical" style={{ height: 290 }}>
          <menu className="p-4">
            {[1, 2, 3, 4, 5, 6, 7].map((currency) => (
              <Currency
                key={currency}
                onClick={(e) => setCurrency(e.currentTarget.id)}
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
