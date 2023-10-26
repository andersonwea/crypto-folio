import { Header } from '@/components/Header'
import { CryptoList } from '@/components/CryptoList'
import { Wallet } from '@/app/wallet/components/Wallet'
import { Heading, Text } from '@radix-ui/themes'

interface DashboardProps {
  searchParams: {
    page: string
  }
}

export default function Dashboard({ searchParams }: DashboardProps) {
  const { page } = searchParams

  return (
    <div>
      <Header title="Dashboard" />

      <main className="grid grid-cols-[0.6fr_minmax(0,_1fr)] max-sm:grid-cols-1 sm:space-x-7">
        <section className="pt-4">
          <Heading as="h2">Portifolio</Heading>

          <div className="bg-blue-300 h-[222px] rounded-3xl px-9 py-6 mt-4 flex gap-10 flex-wrap">
            <div>
              <Heading as="h3">$ 17,545.26</Heading>
              <Text as="span">Valor de portfolio</Text>
              <Text className="block" as="span" color="green">
                +15.15%
              </Text>
            </div>

            <div>
              <Heading as="h3">$ 10,251.15</Heading>
              <Text as="span">Valor investido</Text>
            </div>
          </div>
        </section>

        <Wallet maxWidth={630} />

        <div className="mt-7 sm:col-span-2 max-h-[350px]">
          <CryptoList page={page} />
        </div>
      </main>
    </div>
  )
}
