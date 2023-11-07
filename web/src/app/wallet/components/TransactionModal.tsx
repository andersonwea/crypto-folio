'use client'

import { Dialog } from '@radix-ui/themes'
import { ReactNode, useCallback, useEffect } from 'react'
import { SelectCurrency } from './SelectCurrency'
import { CreateTransaction } from './CreateTransaction'
import { useCurrencyStore } from '@/store/useCurrencyStore'

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

  useEffect(() => {
    fetchMarketCurrencies()
  }, [])

  return (
    <Dialog.Root>
      <Dialog.Trigger onClick={() => setSelectedMarketCurrency(null)}>
        {children}
      </Dialog.Trigger>

      {selectedMarketCurrency ? <CreateTransaction /> : <SelectCurrency />}
    </Dialog.Root>
  )
}
