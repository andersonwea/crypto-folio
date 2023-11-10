import { Heading } from '@radix-ui/themes'
import { Transactions } from './components/Transactions'
import { WalletStats } from '@/components/WalletStats'

interface WalletPageProps {
  searchParams: {
    page: string
  }
}

export default function WalletPage({ searchParams }: WalletPageProps) {
  const { page } = searchParams

  return (
    <>
      <section className="pt-7">
        <Heading as="h2">Análise do portfolio</Heading>

        <div className="flex gap-x-10 gap-y-3 flex-wrap pt-7 shadow-md max-sm:p-2 p-5 rounded-lg bg-white">
          <WalletStats />
        </div>
      </section>

      <Transactions page={page} />
    </>
  )
}
