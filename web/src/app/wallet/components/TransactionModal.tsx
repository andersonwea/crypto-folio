'use client'

import { Dialog } from '@radix-ui/themes'
import { ReactNode, useCallback, useEffect } from 'react'
import { SelectCurrency } from './SelectCurrency'
import { CreateTransaction } from './CreateTransaction'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { useTransactionStore } from '@/store/useTransactionsStore'

interface TransactionModalProps {
  children: ReactNode
}

export function TransactionModal({ children }: TransactionModalProps) {
  const selectedMarketCurrency = useCurrencyStore(
    (state) => state.selectedMarketCurrency,
  )
  const setSelectedMarketCurrency = useCurrencyStore(
    (state) => state.setSelectedMarketCurrency,
  )
  const fetchMarketCurrencies = useCurrencyStore(
    useCallback((state) => state.fetchMarketCurrencies, []),
  )
  const setSearch = useCurrencyStore(
    useCallback((state) => state.setSearch, []),
  )
  const isTransactionModalOpen = useTransactionStore(
    (state) => state.isTransactionModalOpen,
  )
  const setIsTransactionModalOpen = useTransactionStore(
    (state) => state.setIsTransactionModalOpen,
  )

  function handleOpenModal() {
    setSelectedMarketCurrency(null)
    setSearch('')
  }

  useEffect(() => {
    fetchMarketCurrencies()
  }, [])

  return (
    <Dialog.Root
      open={isTransactionModalOpen}
      onOpenChange={setIsTransactionModalOpen}
    >
      <Dialog.Trigger onClick={handleOpenModal}>{children}</Dialog.Trigger>

      {selectedMarketCurrency ? <CreateTransaction /> : <SelectCurrency />}
    </Dialog.Root>
  )
}
