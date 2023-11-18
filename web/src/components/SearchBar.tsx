'use client'

import { ScrollArea } from '@radix-ui/themes'
import { TextInput } from './TextInput'
import { CurrencyItem } from '@/app/wallet/components/CurrencyItem'
import { useStore } from '@/store/useStore'
import { ChangeEvent, useCallback, useState } from 'react'
import debounce from 'lodash/debounce'
import { MarketCurrency } from '@/@types'
import { api } from '@/libs/api'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

export function SearchBar() {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState<MarketCurrency[]>([])
  const setSelectedMarketCurrency = useStore(
    (state) => state.setSelectedMarketCurrency,
  )

  const pathName = usePathname()

  const router = useRouter()

  const { data: session, update } = useSession()

  async function searchMarketCurrencies(search: string) {
    if (search.length < 2) {
      return
    }
    console.log('procurou')
    console.log(session)
    if (session && Date.now() > session.user.expireIn) {
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

  function handleClickSearchItem(marketCurrency: MarketCurrency) {
    if (pathName === '/wallet') {
      setSelectedMarketCurrency(marketCurrency)
    } else {
      router.push(`/market/currency/${marketCurrency.id}`)
    }
  }

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
                onClick={() => handleClickSearchItem(marketCurrency)}
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
