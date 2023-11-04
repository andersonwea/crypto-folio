'use client'

import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import usdIcon from '@/assets/usd.svg'
import { api } from '@/libs/api'
import { useEffect, useState } from 'react'

type WalletMetrics = {
  profitOrLoss: number
  totalBalance: number
  totalInvested: number
}

export function WalletStats() {
  const [metrics, setMetrics] = useState<WalletMetrics | null>(null)

  useEffect(() => {
    async function getMetrics() {
      try {
        const response = await api('/me/metrics')

        setMetrics(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getMetrics()
  }, [])

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
          <Heading as="h3">{metrics?.totalBalance}</Heading>
        </div>
      </div>

      <div className="space-y-1">
        <Text as="p" color="gray">
          Lucro/Perda
        </Text>
        <Text className="block" color="green">
          {metrics?.profitOrLoss}
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
          <Heading as="h3">{metrics?.totalInvested}</Heading>
        </div>
      </div>
    </>
  )
}
