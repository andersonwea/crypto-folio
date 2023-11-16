import { Heading } from '@radix-ui/themes'
import { Transactions } from './components/Transactions'
import { WalletStats } from '@/components/WalletStats'
import { getWalletStats } from '@/actions/getWalletStats'

interface WalletPageProps {
  searchParams: {
    page: string
  }
}

export default async function WalletPage({ searchParams }: WalletPageProps) {
  const { page } = searchParams

  const { metrics } = await getWalletStats()

  return (
    <>
      <section className="pt-7">
        <Heading as="h2">Análise do portfolio</Heading>

        <div className="flex gap-x-10 gap-y-3 flex-wrap pt-7 shadow-md max-sm:p-2 p-5 rounded-lg bg-white">
          {metrics && <WalletStats metrics={metrics} />}
        </div>
      </section>

      <Transactions page={page} />
    </>
  )
}
