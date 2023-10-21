import { Header } from '@/components/Header'
import { Wallet } from './components/Wallet'
import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import usdIcon from '@/assets/usd.svg'
import { Transactions } from './components/Transactions'

export default function WalletPage() {
  return (
    <div>
      <Header title="Portfolio" />

      <main className="grid grid-cols-[0.6fr_minmax(0,_1fr)] max-md:grid-cols-1">
        <section className="col-span-2 max-md:col-span-1">
          <Wallet />
        </section>

        <section className="pt-7">
          <Heading as="h2">Análise do portfolio</Heading>

          <div className="flex gap-10 flex-wrap pt-7">
            <div>
              <Text as="p" color="gray">
                Saldo atual (USD)
              </Text>

              <div className="flex gap-3 pt-3">
                <div>
                  <Image src={usdIcon} alt="icone do USD" />
                </div>
                <Heading as="h3">$25,888.59</Heading>
              </div>
            </div>

            <div className="space-y-2">
              <Text as="p" color="gray">
                Lucro/Perda total
              </Text>
              <Text className="block" color="green">
                +13.38%
              </Text>
            </div>

            <div>
              <Text as="p" color="gray">
                Total investido (USD)
              </Text>

              <div className="flex gap-3 pt-3">
                <div>
                  <Image src={usdIcon} alt="icone do USD" />
                </div>
                <Heading as="h3">$25,888.59</Heading>
              </div>
            </div>
          </div>
        </section>

        <Transactions />
      </main>
    </div>
  )
}
