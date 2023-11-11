import { Header } from '@/components/Header'
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import bitcoinLogo from '@/assets/bitcoin.png'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { CardItem } from '../../components/CardItem'

export default function MarketCurrency() {
  return (
    <div>
      <Header title="Mercado" />

      <main className="mt-7">
        <Grid columns={'1fr 0.7fr'}>
          <section>
            <Heading>Criptotomoedas</Heading>
            <Flex justify={'between'} className="mt-5">
              <Flex gap={'2'} align={'center'}>
                <Image
                  src="https://img.api.cryptorank.io/coins/60x60.bitcoin1524754012028.png"
                  alt="bitcoin logo"
                  width={48}
                  height={48}
                />
                <Heading as="h2">Bitcoin</Heading>
                <Text color="gray">BTC</Text>
                <Star size={20} stroke="gray" />
              </Flex>

              <Flex align={'end'} gap={'2'}>
                <div>
                  <Text color="gray" className="block">
                    BTC Preço
                  </Text>
                  <Heading>$37545,25</Heading>
                </div>
                <Text color="green">+13,25%</Text>
              </Flex>
            </Flex>
          </section>

          <section>
            <div className="mx-4 p-8 rounded-[30px] bg-gray-800 text-white mt-auto">
              <Heading>BTC Estatísticas</Heading>

              <div className="mt-5">
                <CardItem title="Cap de Mercado" value="$ 501,755,298,553" />
                <CardItem
                  title="Cap. de Mercado Dil."
                  value="$ 541,755,298,553"
                />
                <CardItem title="Volume (24H)" value="$ 1,755,298,553" />
                <CardItem
                  title="Suply circulante"
                  value="19,481,612 BTC"
                  extra="92.77%"
                />
                <CardItem title="Suply Total" value="21,000,000 BTC" />
                <CardItem title="Suply Máximo" value="21,000,000 BTC" />
                <CardItem
                  title="Alta histórica"
                  value="$ 68,672"
                  extra="10 de Nov 2021"
                />
              </div>
            </div>
          </section>
        </Grid>
      </main>
    </div>
  )
}
