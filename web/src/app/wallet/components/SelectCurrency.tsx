import { TextInput } from '@/components/TextInput'
import { Dialog, IconButton, ScrollArea } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { Currency } from './Currency'
import { ChangeEvent, MouseEvent } from 'react'
import { useSelectCurrency } from '@/hooks/useSelectCurrency'

export function SelectCurrency() {
  const setCurrency = useSelectCurrency((state) => state.setCurrency)
  const search = useSelectCurrency((state) => state.search)
  const setSearch = useSelectCurrency((state) => state.setSearch)

  function handleSelectCurrency(event: MouseEvent<HTMLLIElement>) {
    setCurrency(event.currentTarget.id)
  }

  function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.currentTarget.value)
  }

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

      <TextInput onChange={onSearchChange} placeholder="Procurar" />

      <div
        className={`absolute mt-2 left-8 right-8 shadow-3xl h-[290] bg-white ${
          search.length > 0 ? 'visible' : 'invisible'
        }`}
      >
        <ScrollArea type="auto" scrollbars="vertical" style={{ height: 290 }}>
          <menu className="p-4">
            {[1, 2, 3, 4, 5, 6, 7].map((currency) => (
              <Currency
                key={currency}
                onClick={handleSelectCurrency}
                value={`bitcoin${currency}`}
                id={`bitcoin${currency}`}
              />
            ))}
          </menu>
        </ScrollArea>
      </div>

      <ul className="pt-7 flex flex-col gap-1">
        {[1, 2, 3, 4, 5, 6, 7].map((currency) => (
          <Currency
            id={`bitcoin${currency}`}
            key={currency}
            icon={true}
            onClick={handleSelectCurrency}
          />
        ))}
      </ul>
    </Dialog.Content>
  )
}
