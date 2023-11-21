import { Header } from '@/components/Header'
import { CryptoList } from '@/components/CryptoList'
import { Wallet } from '@/app/wallet/components/Wallet'
import { Heading } from '@radix-ui/themes'
import { WalletStats } from '@/components/WalletStats'
import { getWatchlist } from '@/actions/watchlist/getWatchlist'
import { getMarketCurrencies } from '@/actions/currencies/getMarketCurrencies'
import { getWalletCurrencies } from '@/actions/currencies/getWalletCurrencies'
import { getWalletStats } from '@/actions/getWalletStats'

interface DashboardProps {
  searchParams: {
    page: string
  }
}

export const revalidate = 60 * 5 // 5 Minutes

export default async function Dashboard({ searchParams }: DashboardProps) {
  const { page } = searchParams
  const totalPages = 791

  const { watchlist } = await getWatchlist()
  const { marketCurrencies } = await getMarketCurrencies(page)
  const { walletCurrencies } = await getWalletCurrencies()
  const { metrics } = await getWalletStats()

  return (
    <div>
      <Header title="Dashboard" />

      <main className="grid grid-cols-[0.6fr_minmax(0,_1fr)] max-md:grid-cols-1 sm:space-x-7">
        <section className="mt-[26px]">
          <Heading as="h2">Portifolio</Heading>
          <div className="bg-blue-300 h-[222px] rounded-3xl px-9 py-6 mt-4 flex flex-wrap justify-between">
            {metrics && <WalletStats metrics={metrics} />}
          </div>
        </section>

        {walletCurrencies && (
          <Wallet maxWidth={630} walletCurrencies={walletCurrencies} />
        )}

        <div className="mt-7 md:col-span-2 max-h-[350px]">
          {watchlist && marketCurrencies && (
            <CryptoList
              page={page}
              totalPages={totalPages}
              watchlist={watchlist}
              marketCurrencies={marketCurrencies}
            />
          )}
        </div>
      </main>
    </div>
  )
}
