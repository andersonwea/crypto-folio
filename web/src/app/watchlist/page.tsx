import { CryptoList } from '@/components/CryptoList'
import { Header } from '@/components/Header'
import { Heading } from '@radix-ui/themes'

interface WatchlistProps {
  searchParams: {
    page: string
  }
}

export default function Watchlist({ searchParams }: WatchlistProps) {
  const { page } = searchParams
  const totalPages = 3

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

        <CryptoList page={page} totalPages={totalPages} />
      </main>
    </div>
  )
}
