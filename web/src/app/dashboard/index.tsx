'use client'

import { Header } from '@/components/Header'
import { CryptoList } from '@/components/CryptoList'
import { Wallet } from '@/app/wallet/components/Wallet'
import { Heading } from '@radix-ui/themes'
import { WalletStats } from '@/components/WalletStats'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { useCallback, useEffect } from 'react'

interface DashboardProps {
  searchParams: {
    page: string
  }
}

export default function Dashboard({ searchParams }: DashboardProps) {
  const { page } = searchParams
  const totalPages = 791

  const marketCurrencies = useCurrencyStore(
    useCallback((state) => state.marketCurrencies, [page]),
  )
  const fetchMarketCurrencies = useCurrencyStore(
    useCallback((state) => state.fetchMarketCurrencies, []),
  )
  const fetchWatchlist = useCurrencyStore(
    useCallback((state) => state.fetchWatchlist, []),
  )
  const watchlistCurrenciesIds = useCurrencyStore(
    useCallback((state) => state.watchlistCurrenciesIds, []),
  )

  useEffect(() => {
    fetchMarketCurrencies(page)
    fetchWatchlist()
  }, [page])

  console.log(marketCurrencies)

  return (
    <div>
      <Header title="Dashboard" />

      <main className="grid grid-cols-[0.6fr_minmax(0,_1fr)] max-md:grid-cols-1 sm:space-x-7">
        <section className="mt-[26px]">
          <Heading as="h2">Portifolio</Heading>
          <div className="bg-blue-300 h-[222px] rounded-3xl px-9 py-6 mt-4 flex flex-wrap justify-between">
            <WalletStats />
          </div>
        </section>

        <Wallet maxWidth={630} />

        <div className="mt-7 md:col-span-2 max-h-[350px]">
          <CryptoList
            page={page}
            totalPages={totalPages}
            currencies={marketCurrencies}
            watchlistCurrenciesIds={watchlistCurrenciesIds}
          />
        </div>
      </main>
    </div>
  )
}
