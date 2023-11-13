import { Header } from '@/components/Header'
import { CryptoList } from '@/components/CryptoList'
import { Wallet } from '@/app/wallet/components/Wallet'
import { Heading } from '@radix-ui/themes'
import { WalletStats } from '@/components/WalletStats'
import { api } from '@/libs/api'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { MarketCurrency, WatchlistResponse } from '@/@types'

interface DashboardProps {
  searchParams: {
    page: string
  }
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const session = await getServerSession(authOptions)

  const { page } = searchParams
  const totalPages = 791

  if (session) {
    api.defaults.headers.Authorization = `Bearer ${session.user.accessToken}`
  }

  async function fetchMarketCurrencies() {
    const marketCurrenciesResponse = await api<MarketCurrency[]>(
      `/market/currencies?page=${page}`,
    )
    const marketCurrencies = marketCurrenciesResponse.data

    return marketCurrencies
  }

  async function getWatchlistCurrenciesIds() {
    const response = await api<WatchlistResponse>('/me/watchlist')

    const watchlistCurrenciesIds = response.data.watchlist.map(
      (watchlist) => watchlist.id,
    )

    return watchlistCurrenciesIds
  }

  const watchlistCurrenciesIds = await getWatchlistCurrenciesIds()
  const marketCurrencies = await fetchMarketCurrencies()

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
