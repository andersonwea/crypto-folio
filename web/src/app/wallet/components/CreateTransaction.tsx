'use client'

import { Dialog, IconButton, ScrollArea, Select } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { Currency } from './Currency'
import { CreateTransactionForm } from './CreateTransactionForm'
import { MouseEvent, useState } from 'react'

export function CreateTransaction() {
  const [transactionType, setTransactionType] = useState('buy')

  function handleClickTransaction(event: MouseEvent<HTMLButtonElement>) {
    setTransactionType(event.currentTarget.value)
  }

  return (
    <Dialog.Content className="max-w-[550px] relative" size={'4'}>
      <header className="pb-7">
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
        <div className="flex gap-3 bg-gray-300 mb-10 p-1 rounded-md">
          <button
            className={`w-full py-1 px-2 rounded-xl ${
              transactionType === 'buy' ? 'bg-white' : ''
            }`}
            value={'buy'}
            onClick={handleClickTransaction}
          >
            Comprar
          </button>
          <button
            className={`w-full py-1 px-2 rounded-xl ${
              transactionType === 'sell' ? 'bg-white' : ''
            }`}
            value={'sell'}
            onClick={handleClickTransaction}
          >
            Vender
          </button>
        </div>

        <Select.Root defaultValue="bitcoin1" size={'3'}>
          <Select.Trigger radius="large" color="gray" />

          <Select.Content color="gray">
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              style={{ height: 200 }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Select.Item
                  value={`bitcoin${item}`}
                  key={item}
                  aria-expanded={true}
                >
                  <Currency
                    icon={false}
                    hover={false}
                    logoHeight={24}
                    logoWidth={24}
                  />
                </Select.Item>
              ))}
            </ScrollArea>
          </Select.Content>
        </Select.Root>

        <CreateTransactionForm />
      </div>
    </Dialog.Content>
  )
}
