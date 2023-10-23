import { Header } from '@/components/Header'
import { Wallet } from './components/Wallet'
import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import usdIcon from '@/assets/usd.svg'
import { Transactions } from './components/Transactions'

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header title="Portfolio" />

      <main className="grid grid-cols-[0.6fr_minmax(0,_1fr)] max-md:grid-cols-1">
        <section className="col-span-2 max-md:col-span-1">
          <Wallet />
        </section>

        {children}
      </main>
    </div>
  )
}
