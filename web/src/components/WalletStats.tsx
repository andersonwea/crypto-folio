import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import usdIcon from '@/assets/usd.svg'
import { api } from '@/libs/api'
import { priceFormatter } from '@/utils/priceFormatter'

type WalletMetrics = {
  profitOrLoss: number
  totalBalance: number
  totalInvested: number
}

export async function WalletStats() {
  const { data: metrics } = await api<WalletMetrics>('/me/metrics')

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
          <Heading as="h3">
            {metrics && priceFormatter.format(metrics.totalBalance)}
          </Heading>
        </div>
      </div>

      <div className="space-y-1">
        <Text as="p" color="gray">
          Lucro/Perda
        </Text>
        <Text
          className="block"
          color={metrics && metrics.profitOrLoss < 0 ? 'red' : 'green'}
        >
          {metrics?.profitOrLoss}%
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
          <Heading as="h3">
            {metrics && priceFormatter.format(metrics.totalInvested)}
          </Heading>
        </div>
      </div>
    </>
  )
}
