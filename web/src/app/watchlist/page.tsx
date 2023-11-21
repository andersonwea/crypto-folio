import { getMarketCurrencies } from '@/actions/currencies/getMarketCurrencies'
import { getWatchlist } from '@/actions/watchlist/getWatchlist'
import { CryptoList } from '@/components/CryptoList'
import { Header } from '@/components/Header'
import { Heading } from '@radix-ui/themes'

interface WatchlistProps {
  searchParams: {
    page: string
  }
}

export const revalidate = 60 * 5 // 5 Minutes

export default async function Watchlist({ searchParams }: WatchlistProps) {
  const { page } = searchParams

  const { marketCurrencies } = await getMarketCurrencies(page)
  const { totalItems, watchlist } = await getWatchlist(page)

  const totalPages = Math.floor((totalItems ?? 0) / 7) + 1

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

        {marketCurrencies && watchlist && (
          <CryptoList
            page={page}
            totalPages={totalPages}
            marketCurrencies={watchlist}
            watchlist={watchlist}
          />
        )}
      </main>
    </div>
  )
}
