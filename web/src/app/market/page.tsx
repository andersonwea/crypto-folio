'use client'

import { Header } from '@/components/Header'
import { Search } from './components/Search'
import { CryptoList } from '@/components/CryptoList'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { useCallback, useEffect } from 'react'

interface MarketProps {
  searchParams: {
    page: string
  }
}

export default function Market({ searchParams }: MarketProps) {
  const { page } = searchParams
  const totalPages = 791

  const marketCurrencies = useCurrencyStore(
    useCallback((state) => state.marketCurrencies, [page]),
  )
  const fetchMarketCurrencies = useCurrencyStore(
    useCallback((state) => state.fetchMarketCurrencies, []),
  )

  useEffect(() => {
    fetchMarketCurrencies(page)
  }, [page])

  return (
    <div>
      <Header title="Mercado" />

      <main className="pt-4 grid grid-cols-1 gap-4">
        <Search />

        <CryptoList
          page={page}
          totalPages={totalPages}
          currencies={marketCurrencies}
        />
      </main>
    </div>
  )
}
