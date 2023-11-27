import { Heading } from '@radix-ui/themes'
import { Transactions } from './components/Transactions'
import { WalletStats } from '@/components/WalletStats'
import { getWalletStats } from '@/actions/getWalletStats'
import { getTransactions } from '@/actions/transactions/getTransactions'

interface WalletPageProps {
  searchParams: {
    page: string
  }
}

export const metadata = {
  title: 'Carteira | Crypto Folio',
}

export default async function WalletPage({ searchParams }: WalletPageProps) {
  const { page } = searchParams

  const { metrics } = await getWalletStats()
  const { totalTransactions, transactions } = await getTransactions(page)

  return (
    <>
      <section className="pt-7">
        <Heading as="h2">Análise do portfolio</Heading>

        <div className="flex gap-x-10 gap-y-3 flex-wrap pt-7 max-sm:shadow-md max-sm:px-2 max-sm:py-8 pr-4 rounded-lg bg-white">
          {metrics && <WalletStats metrics={metrics} />}
        </div>
      </section>

      {transactions && (
        <Transactions
          transactions={transactions}
          totalTransactions={totalTransactions}
        />
      )}
    </>
  )
}
