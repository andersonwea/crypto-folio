'use client'

import { Dialog } from '@radix-ui/themes'
import { ReactNode, useCallback } from 'react'
import { SelectCurrency } from './SelectCurrency'
import { CreateTransaction } from './CreateTransaction'
import { MarketCurrency } from '@/@types'
import { useStore } from '@/store/useStore'

interface TransactionModalProps {
  children: ReactNode
  marketCurrencies: MarketCurrency[]
}

export function TransactionModal({
  children,
  marketCurrencies,
}: TransactionModalProps) {
  const isTransactionModalOpen = useStore(
    useCallback((state) => state.isTransactionModalOpen, []),
  )
  const setIsTransactionModalOpen = useStore(
    useCallback((state) => state.setIsTransactionModalOpen, []),
  )

  const selectedMarketCurrency = useStore(
    (state) => state.selectedMarketCurrency,
  )
  const setSelectedMarketCurrency = useStore(
    (state) => state.setSelectedMarketCurrency,
  )

  function handleOpenModal() {
    setSelectedMarketCurrency(null)
  }

  return (
    <Dialog.Root
      open={isTransactionModalOpen}
      onOpenChange={setIsTransactionModalOpen}
    >
      <Dialog.Trigger onClick={handleOpenModal}>{children}</Dialog.Trigger>

      {selectedMarketCurrency ? (
        <CreateTransaction />
      ) : (
        <SelectCurrency marketCurrencies={marketCurrencies} />
      )}
    </Dialog.Root>
  )
}
