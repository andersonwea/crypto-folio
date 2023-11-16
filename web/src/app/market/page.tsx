import { Header } from '@/components/Header'
import { CryptoList } from '@/components/CryptoList'
import { getMarketCurrencies } from '@/actions/getMarketCurrencies'
import { getWatchlist } from '@/actions/getWatchlist'
import { Heading } from '@radix-ui/themes'
import { SearchBar } from '@/components/SearchBar'

interface MarketProps {
  searchParams: {
    page: string
  }
}

export default async function Market({ searchParams }: MarketProps) {
  const { page } = searchParams
  const totalPages = 791

  const { marketCurrencies } = await getMarketCurrencies(page)
  const { watchlist } = await getWatchlist()

  return (
    <div>
      <Header title="Mercado" />

      <main className="pt-4 grid grid-cols-1 gap-4">
        <div className="flex items-center gap-10 max-sm:gap-3 relative max-w-lg">
          <Heading>Criptomoedas</Heading>
          <SearchBar />
        </div>

        {marketCurrencies && watchlist && (
          <CryptoList
            page={page}
            totalPages={totalPages}
            marketCurrencies={marketCurrencies}
            watchlist={watchlist}
          />
        )}
      </main>
    </div>
  )
}
