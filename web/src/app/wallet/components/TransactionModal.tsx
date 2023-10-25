'use client'

import { Dialog } from '@radix-ui/themes'
import { ReactNode } from 'react'
import { SelectCurrency } from './SelectCurrency'
import { CreateTransaction } from './CreateTransaction'
import { useSelectCurrency } from '@/hooks/useSelectCurrency'

interface TransactionModalProps {
  children: ReactNode
}

export function TransactionModal({ children }: TransactionModalProps) {
  const currency = useSelectCurrency((state) => state.currency)
  const reset = useSelectCurrency((state) => state.reset)

  function handleOpenModal() {
    reset()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger onClick={handleOpenModal}>{children}</Dialog.Trigger>

      {currency ? <CreateTransaction /> : <SelectCurrency />}
    </Dialog.Root>
  )
}
