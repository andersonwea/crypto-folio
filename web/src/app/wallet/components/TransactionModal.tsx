'use client'

import { TextInput } from '@/components/TextInput'
import { Dialog, IconButton, ScrollArea } from '@radix-ui/themes'
import { ChangeEvent, ReactNode, useState } from 'react'
import { Currency } from './Currency'
import { X } from 'lucide-react'

interface TransactionModalProps {
  children: ReactNode
}

export function TransactionModal({ children }: TransactionModalProps) {
  const [search, setSearch] = useState('')

  function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content className="max-w-[550px] relative" size={'4'}>
        <header className="pb-7">
          <Dialog.Title className="m-0" size={'6'}>
            Selecione uma moeda
          </Dialog.Title>

          <Dialog.Close className="absolute right-8 top-8">
            <IconButton variant="ghost" color="gray">
              <X />
            </IconButton>
          </Dialog.Close>
        </header>

        <TextInput
          onChange={(event) => onSearchChange(event)}
          placeholder="Procurar"
        />

        <div
          className={`absolute mt-2 left-8 right-8 shadow-3xl h-[290] bg-white ${
            search.length > 0 ? 'visible' : 'invisible'
          }`}
        >
          <ScrollArea type="auto" scrollbars="vertical" style={{ height: 290 }}>
            <menu className="p-4">
              {['bitcoin', 'ethereum', 'solana'].map((currency) => (
                <Currency key={currency} />
              ))}
            </menu>
          </ScrollArea>
        </div>

        <ul className="pt-7 flex flex-col gap-1">
          {[1, 2, 3, 4, 5, 6, 7].map((currency) => (
            <Currency key={currency} icon={true} />
          ))}
        </ul>
      </Dialog.Content>
    </Dialog.Root>
  )
}
