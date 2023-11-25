'use client'

import { Dialog } from '@radix-ui/themes'
import { useCallback } from 'react'
import { SelectCurrency } from './SelectCurrency'
import { CreateTransaction } from './CreateTransaction'
import { MarketCurrency } from '@/@types'
import { useStore } from '@/store/useStore'
import { Button } from '@nextui-org/react'

interface TransactionModalProps {
  marketCurrencies: MarketCurrency[]
}

export function TransactionModal({ marketCurrencies }: TransactionModalProps) {
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
      <Dialog.Trigger onClick={handleOpenModal}>
        <Button variant="solid" className="bg-blue-300 text-base">
          Criar transação
        </Button>
      </Dialog.Trigger>

      {selectedMarketCurrency ? (
        <CreateTransaction />
      ) : (
        <SelectCurrency marketCurrencies={marketCurrencies} />
      )}
    </Dialog.Root>
  )
}
