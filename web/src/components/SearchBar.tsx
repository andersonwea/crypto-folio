'use client'

import { ScrollArea } from '@radix-ui/themes'
import { TextInput } from './TextInput'
import { CurrencyItem } from '@/app/wallet/components/CurrencyItem'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { ChangeEvent, useCallback } from 'react'
import debounce from 'lodash/debounce'

export function SearchBar() {
  const search = useCurrencyStore((state) => state.search)
  const setSearch = useCurrencyStore((state) => state.setSearch)
  const searchResult = useCurrencyStore(
    useCallback((state) => state.searchResult, []),
  )
  const searchCurrencies = useCurrencyStore(
    useCallback((state) => state.searchCryptocurrencies, []),
  )
  const marketCurrencies = useCurrencyStore(
    useCallback((state) => state.marketCurrencies, []),
  )
  const setSelectedMarketCurrency = useCurrencyStore(
    (state) => state.setSelectedMarketCurrency,
  )

  const selectedMarketCurrency = useCurrencyStore(
    useCallback((state) => state.selectedMarketCurrency, []),
  )

  const debouncedHandleSearch = useCallback(
    debounce(searchCurrencies, 1000),
    [],
  )

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
    debouncedHandleSearch(event.target.value)
  }

  // const debouncedHandleSearch = debounce(handleSearch, 300)

  return (
    <div className="relative w-full">
      <TextInput
        onChange={handleSearch}
        value={search}
        placeholder="Procurar"
        autoFocus={true}
      />

      <div
        className={`absolute z-50 mt-2 left-0 right-0 shadow-3xl h-[290] bg-white
         ${search.length > 0 ? 'visible' : 'invisible'}`}
      >
        <ScrollArea
          type="auto"
          scrollbars="vertical"
          style={{ maxHeight: 290 }}
        >
          <menu className="p-4">
            {searchResult.map((marketCurrency) => (
              <CurrencyItem
                key={marketCurrency.id}
                onClick={() => setSelectedMarketCurrency(marketCurrency)}
                currency={marketCurrency}
                logoHeight={26}
                logoWidth={26}
              />
            ))}
          </menu>
        </ScrollArea>
      </div>
    </div>
  )
}
