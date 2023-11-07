'use client'

import { CryptoList } from '@/components/CryptoList'
import { Header } from '@/components/Header'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { Heading } from '@radix-ui/themes'
import { useCallback, useEffect } from 'react'

interface WatchlistProps {
  searchParams: {
    page: string
  }
}

export default function Watchlist({ searchParams }: WatchlistProps) {
  const { page } = searchParams
  console.log({ page })

  const watchlistCurrenciesIds = useCurrencyStore(
    useCallback((state) => state.watchlistCurrenciesIds, []),
  )
  const fetchWatchlist = useCurrencyStore(
    useCallback((state) => state.fetchWatchlist, [page]),
  )
  const watchlistResponse = useCurrencyStore(
    useCallback((state) => state.watchlist, []),
  )

  const totalPages = Math.floor(watchlistResponse.totalItems / 7) + 1

  useEffect(() => {
    fetchWatchlist(page)
  }, [page])

  return (
    <div>
      <Header title="Lista de interesse" />

      <main className="pt-7 grid grid-cols-1">
        <Heading
          size={{
            initial: '5',
            sm: '6',
          }}
        >
          Suas cryptos favoritas
        </Heading>

        <CryptoList
          page={page}
          totalPages={totalPages}
          currencies={watchlistResponse.watchlist}
          watchlistCurrenciesIds={watchlistCurrenciesIds}
        />
      </main>
    </div>
  )
}
