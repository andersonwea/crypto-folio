import { Dialog, IconButton } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { CurrencyItem } from './CurrencyItem'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { SearchBar } from '@/components/SearchBar'
import { MarketCurrency } from '@/@types'

interface SelectCurrencyProps {
  marketCurrencies: MarketCurrency[]
}

export function SelectCurrency({ marketCurrencies }: SelectCurrencyProps) {
  const setSelectedMarketCurrency = useCurrencyStore(
    (state) => state.setSelectedMarketCurrency,
  )

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

      <SearchBar />

      <ul className="pt-7 flex flex-col gap-1">
        {marketCurrencies.map((marketCurrency) => (
          <CurrencyItem
            id={String(marketCurrency.id)}
            key={marketCurrency.id}
            currency={marketCurrency}
            icon={true}
            onClick={() => setSelectedMarketCurrency(marketCurrency)}
          />
        ))}
      </ul>
    </Dialog.Content>
  )
}
