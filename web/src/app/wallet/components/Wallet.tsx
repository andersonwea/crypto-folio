'use client'

import { Heading, ScrollArea } from '@radix-ui/themes'
import { Card } from './Card'
import { TextInput } from '@/components/TextInput'
import { useCallback, useEffect, useState } from 'react'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { useTransactionStore } from '@/store/useTransactionsStore'

interface WalletProps {
  maxWidth?: number
}

const colors = ['bg-green-300', 'bg-purple-300', 'bg-yellow-300']

export function Wallet({ maxWidth }: WalletProps) {
  const [search, setSearch] = useState('')
  const transactions = useTransactionStore((state) => state.transactions)
  const fetchWalletCurrencies = useCurrencyStore(
    useCallback((state) => state.fetchWalletCurrencies, [transactions]),
  )
  const walletCurrencies = useCurrencyStore(
    useCallback((state) => state.walletCurrencies, []),
  )

  function onSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  useEffect(() => {
    fetchWalletCurrencies()
  }, [transactions])

  return (
    <section className="pt-4">
      <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <Heading as="h2">Seus Ativos</Heading>
        <TextInput placeholder="Filtrar ativos" onChange={onSearch} />
      </div>

      <ScrollArea
        type="always"
        scrollbars="horizontal"
        style={{ maxWidth: maxWidth || '100%', maxHeight: 255 }}
      >
        <div className="flex space-x-7 py-4">
          {walletCurrencies
            .filter((walletCurrency) =>
              walletCurrency.name.includes(search.toLocaleLowerCase()),
            )
            .map((walletCurrency, index) => (
              <Card
                key={walletCurrency.id}
                currency={walletCurrency}
                color={colors[index % colors.length]}
              />
            ))}
        </div>
      </ScrollArea>
    </section>
  )
}
