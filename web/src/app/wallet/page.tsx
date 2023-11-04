import { Heading } from '@radix-ui/themes'
import { Transactions } from './components/Transactions'
import { WalletStats } from '@/components/WalletStats'

export default function WalletPage() {
  return (
    <>
      <section className="pt-7">
        <Heading as="h2">Análise do portfolio</Heading>

        <div className="flex gap-x-10 gap-y-3 flex-wrap pt-7">
          <WalletStats />
        </div>
      </section>

      <Transactions />
    </>
  )
}
