import { Header } from "@/components/Header"
import { Wallet } from "@/components/Wallet"
import { Heading, Text } from "@radix-ui/themes"

export default function Dashboard() {
  return (
    <div className="px-16 py-9 max-md:px-5 max-md:py-5">
      <Header />

      <main className="grid grid-cols-[0.6fr_minmax(0,_1fr)] max-sm:grid-cols-1 sm:space-x-7">
        <section className="pt-7">
          <Heading as="h2">Portifolio</Heading>

          <div className="bg-blue-300 h-[222px] rounded-3xl px-9 py-6 mt-6 flex gap-10 flex-wrap">
            <div>
              <Heading as="h3">$ 17,545.26</Heading>
              <Text as="span">Valor de portfolio</Text>
              <Text className="block" as="span" color="green">+15.15%</Text>
            </div>

            <div>
              <Heading as="h3">$ 10,251.15</Heading>
              <Text as="span">Valor investido</Text>
            </div>
            
          </div>
        </section>

        <Wallet />
      </main>
    </div>
  )
}