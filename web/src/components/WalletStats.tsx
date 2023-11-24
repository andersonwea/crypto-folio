'use client'

import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import usdIcon from '@/assets/usd.svg'
import { priceFormatter } from '@/utils/priceFormatter'
import { Metrics } from '@/@types'
import { Card } from '@nextui-org/react'

interface WalletStatsProps {
  metrics: Metrics
}

export function WalletStats({ metrics }: WalletStatsProps) {
  return (
    <Card className="bg-blue-300 h-[222px] rounded-3xl px-7 py-6 mt-4 flex flex-row flex-wrap justify-between">
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
    </Card>
  )
}
