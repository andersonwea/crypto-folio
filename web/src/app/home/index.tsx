import { Header } from "@/components/Header"
import { Heading, Text } from "@radix-ui/themes"

export default function Dashboard() {
  return (
    <div className="px-16 py-9 max-md:px-5 max-md:py-5">
      <Header />

      <main>
        <section className="pt-7">
          <Heading as="h2">Portifolio</Heading>

          <div className="bg-blue-300 rounded-3xl px-9 py-6 mt-6 space-y-5">
            <div>
              <Heading as="h3">$ 17,545.26</Heading>
              <Text>Valor de portfolio</Text>
            </div>
            <div>
              <Heading as="h3">$ 10,251.15</Heading>
              <Text>Valor investido</Text>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
