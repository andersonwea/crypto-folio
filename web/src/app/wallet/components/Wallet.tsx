'use client'

import { Heading, ScrollArea } from '@radix-ui/themes'
import { Card } from './Card'
import { TextInput } from '@/components/TextInput'
import { Button } from '@/components/Button'
import { TransactionModal } from './TransactionModal'
import { useEffect, useState } from 'react'
import { WalletCurrency } from '@/@types'
import { api } from '@/libs/api'
import { EmptyCard } from './EmptyCard'

interface WalletProps {
  maxWidth?: number
}

export function Wallet({ maxWidth }: WalletProps) {
  const [currencies, setCurrencies] = useState<WalletCurrency[] | null>(null)
  const colors = ['bg-green-300', 'bg-purple-300', 'bg-yellow-300']

  useEffect(() => {
    api('/wallet/currencies').then((response) => {
      setCurrencies(response?.data)
    })
  }, [])

  return (
    <section className="pt-4">
      <div className="flex items-center gap-10 max-sm:gap-3">
        <Heading as="h2">Seus Ativos</Heading>
        <TextInput placeholder="Filtrar ativos" />

        <TransactionModal>
          <Button>Novo ativo</Button>
        </TransactionModal>
      </div>

      <ScrollArea
        type="always"
        scrollbars="horizontal"
        style={{ maxWidth: maxWidth || '100%', maxHeight: 255 }}
      >
        <div className="flex space-x-7 py-4">
          {currencies && currencies.length < 1 ? (
            <EmptyCard />
          ) : (
            currencies &&
            currencies.map((currency, index) => (
              <Card
                key={currency.id}
                currency={currency}
                color={colors[index % colors.length]}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </section>
  )
}
