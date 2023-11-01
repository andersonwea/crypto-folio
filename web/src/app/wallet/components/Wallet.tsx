'use client'

import { Heading, ScrollArea } from '@radix-ui/themes'
import { Card } from './Card'
import { TextInput } from '@/components/TextInput'
import { Button } from '@/components/Button'
import { TransactionModal } from './TransactionModal'
import { useCallback, useEffect, useState } from 'react'
import { WalletCurrency } from '@/@types'
import { api } from '@/libs/api'
import { EmptyCard } from './EmptyCard'
import { useCurrencyStore } from '@/store/useCurrencyStore'

interface WalletProps {
  maxWidth?: number
}

const colors = ['bg-green-300', 'bg-purple-300', 'bg-yellow-300']

export function Wallet({ maxWidth }: WalletProps) {
  const fetchWalletCurrencies = useCurrencyStore(
    useCallback((state) => state.fetchWalletCurrencies, []),
  )
  const walletCurrencies = useCurrencyStore(
    useCallback((state) => state.walletCurrencies, []),
  )

  useEffect(() => {
    fetchWalletCurrencies()
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
          {
            // currencies && currencies.length < 1 ? (
            //   <EmptyCard />
            // ) : (

            walletCurrencies.map((walletCurrency, index) => (
              <Card
                key={walletCurrency.id}
                currency={walletCurrency}
                color={colors[index % colors.length]}
              />
            ))
            // )
          }
        </div>
      </ScrollArea>
    </section>
  )
}
