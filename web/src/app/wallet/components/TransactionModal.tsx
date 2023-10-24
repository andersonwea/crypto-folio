'use client'

import { Dialog } from '@radix-ui/themes'
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'
import { SelectCurrency } from './SelectCurrency'
import { CreateTransaction } from './CreateTransaction'

interface TransactionModalProps {
  children: ReactNode
}

export function TransactionModal({ children }: TransactionModalProps) {
  const [search, setSearch] = useState('')
  const [currency, setCurrency] = useState('')

  function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handleSelectCurrency(event: MouseEvent<HTMLLIElement>) {
    setCurrency(event.currentTarget.id)
  }
  console.log({ currency })

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      {currency ? (
        <CreateTransaction />
      ) : (
        <SelectCurrency
          search={search}
          onSearchChange={onSearchChange}
          handleSelectCurrency={handleSelectCurrency}
        />
      )}
    </Dialog.Root>
  )
}
