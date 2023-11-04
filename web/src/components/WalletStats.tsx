import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import usdIcon from '@/assets/usd.svg'

export function WalletStats() {
  return (
    <>
      <div>
        <Text as="p" color="gray">
          Saldo atual (USD)
        </Text>

        <div className="flex gap-3 pt-1">
          <div>
            <Image src={usdIcon} alt="icone do USD" />
          </div>
          <Heading as="h3">$25,888.59</Heading>
        </div>
      </div>

      <div className="space-y-1">
        <Text as="p" color="gray">
          Lucro/Perda
        </Text>
        <Text className="block" color="green">
          +13.38%
        </Text>
      </div>

      <div>
        <Text as="p" color="gray">
          Total investido (USD)
        </Text>

        <div className="flex gap-3 pt-1">
          <div>
            <Image src={usdIcon} alt="icone do USD" />
          </div>
          <Heading as="h3">$25,888.59</Heading>
        </div>
      </div>
    </>
  )
}
