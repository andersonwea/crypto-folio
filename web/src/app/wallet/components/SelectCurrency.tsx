import { TextInput } from '@/components/TextInput'
import { Dialog, IconButton, ScrollArea } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { Currency } from './Currency'
import { ChangeEvent, MouseEvent } from 'react'

interface SelectCurrencyProps {
  search: string
  handleSelectCurrency: (event: MouseEvent<HTMLLIElement>) => void
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function SelectCurrency({
  search,
  handleSelectCurrency,
  onSearchChange,
}: SelectCurrencyProps) {
  return (
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
              <Currency
                key={currency}
                onClick={handleSelectCurrency}
                value={currency}
                id={currency}
              />
            ))}
          </menu>
        </ScrollArea>
      </div>

      <ul className="pt-7 flex flex-col gap-1">
        {[
          'bitcoin',
          'ethereum',
          'solana',
          'bitcoin2',
          'ethereum2',
          'solana2',
        ].map((currency) => (
          <Currency
            id={currency}
            value={currency}
            key={currency}
            icon={true}
            onClick={handleSelectCurrency}
          />
        ))}
      </ul>
    </Dialog.Content>
  )
}
