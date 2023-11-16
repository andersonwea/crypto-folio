'use client'

import { ScrollArea } from '@radix-ui/themes'
import { TextInput } from './TextInput'
import { CurrencyItem } from '@/app/wallet/components/CurrencyItem'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { ChangeEvent, useCallback, useState } from 'react'
import debounce from 'lodash/debounce'
import { MarketCurrency } from '@/@types'
import { api } from '@/libs/api'
import { useSession } from 'next-auth/react'

export function SearchBar() {
  const search = useCurrencyStore((state) => state.search)
  const setSearch = useCurrencyStore((state) => state.setSearch)
  const [searchResult, setSearchResult] = useState<MarketCurrency[]>([])
  const setSelectedMarketCurrency = useCurrencyStore(
    (state) => state.setSelectedMarketCurrency,
  )

  const { data: session, update } = useSession()

  async function searchMarketCurrencies(search: string) {
    if (search.length < 2) {
      return
    }
    console.log('procurou')
    if (session && Date.now() < session.user.expireIn) {
      console.log('atualizando token...')
      update()
    }

    try {
      const response = await api(`/market/currencies/search?search=${search}`, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      })

      setSearchResult(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const debouncedHandleSearch = useCallback(
    debounce(searchMarketCurrencies, 1000),
    [],
  )

  async function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)

    debouncedHandleSearch(event.target.value)
  }
  // const debouncedHandleSearch = debounce(handleSearch, 300)
  console.log({ searchResult })
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
