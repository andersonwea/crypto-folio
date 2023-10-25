import { Header } from '@/components/Header'
import { Search } from './components/Search'
import { CryptoList } from './components/CryptoList'

interface MarketProps {
  searchParams: {
    page: string
  }
}

export default function Market({ searchParams }: MarketProps) {
  const { page } = searchParams

  return (
    <div>
      <Header title="Mercado" />

      <main className="pt-4 grid grid-cols-1">
        <Search />

        <CryptoList page={page} />
      </main>
    </div>
  )
}
