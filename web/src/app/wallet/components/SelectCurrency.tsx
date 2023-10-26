import { Dialog, IconButton } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { Currency } from './Currency'
import { useSelectCurrency } from '@/hooks/useSelectCurrency'
import { SearchBar } from '@/components/SearchBar'

export function SelectCurrency() {
  const setCurrency = useSelectCurrency((state) => state.setCurrency)

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

      <SearchBar onClick={(e) => setCurrency(e.currentTarget.id)} />

      <ul className="pt-7 flex flex-col gap-1">
        {[1, 2, 3, 4, 5, 6, 7].map((currency) => (
          <Currency
            id={`bitcoin${currency}`}
            key={currency}
            icon={true}
            onClick={(e) => setCurrency(e.currentTarget.id)}
          />
        ))}
      </ul>
    </Dialog.Content>
  )
}
