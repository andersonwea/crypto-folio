'use client'

import { Dialog, IconButton } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { CreateTransactionForm } from './CreateTransactionForm'
import { MouseEvent, useState } from 'react'

export function CreateTransaction() {
  const [transactionType, setTransactionType] = useState('buy')

  function handleSelectTransactionType(event: MouseEvent<HTMLButtonElement>) {
    setTransactionType(event.currentTarget.value)
  }

  return (
    <Dialog.Content className="max-w-[550px] relative" size={'4'}>
      <header className="pb-5">
        <Dialog.Title className="m-0" size={'6'}>
          Add Transação
        </Dialog.Title>

        <Dialog.Close className="absolute right-8 top-8">
          <IconButton variant="ghost" color="gray">
            <X />
          </IconButton>
        </Dialog.Close>
      </header>

      <div>
        <div className="flex gap-3 bg-gray-300 p-1 rounded-md">
          <button
            className={`w-full py-1 px-2 rounded-xl ${
              transactionType === 'buy' ? 'bg-white' : ''
            }`}
            value={'buy'}
            onClick={handleSelectTransactionType}
          >
            Comprar
          </button>
          <button
            className={`w-full py-1 px-2 rounded-xl ${
              transactionType === 'sell' ? 'bg-white' : ''
            }`}
            value={'sell'}
            onClick={handleSelectTransactionType}
          >
            Vender
          </button>
        </div>

        <CreateTransactionForm transactionType={transactionType} />
      </div>
    </Dialog.Content>
  )
}
