import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import { Transactions } from '../../components/Transactions'

export default async function currency() {
  return (
    <>
      <section className="pt-7">
        <Heading as="h2">Bitcoin</Heading>

        <div className="pt-7">
          <Text as="p" color="gray">
            Saldo atual (USD)
          </Text>

          <div className="flex items-center gap-3 pt-3">
            <div>
              <Image
                src="https://img.api.cryptorank.io/coins/60x60.bitcoin1524754012028.png"
                alt="icone do USD"
                width={32}
                height={32}
              />
            </div>
            <Heading as="h3">$ 25,888.59</Heading>
          </div>
        </div>

        <div className="pt-4 flex gap-5 flex-wrap">
          <div>
            <Text as={'p'} color="gray">
              Quantidade
            </Text>
            <Text weight={'bold'} size={'3'}>
              1 BTC
            </Text>
          </div>

          <div>
            <Text as={'p'} color="gray">
              Preço médio
            </Text>
            <Text weight={'bold'} size={'3'}>
              $ 25,888,59
            </Text>
          </div>

          <div>
            <Text as={'p'} color="gray">
              Lucro/Perda total
            </Text>
            <Text size={'3'} color="green">
              +13.38%
            </Text>
          </div>
        </div>
      </section>

      <Transactions />
    </>
  )
}
