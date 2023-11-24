import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { CurrencyItem } from './CurrencyItem'
import { useStore } from '@/store/useStore'
import { SearchBar } from '@/components/SearchBar'
import { MarketCurrency } from '@/@types'
import { Button } from '@nextui-org/react'

interface SelectCurrencyProps {
  marketCurrencies: MarketCurrency[]
}

export function SelectCurrency({ marketCurrencies }: SelectCurrencyProps) {
  const setSelectedMarketCurrency = useStore(
    (state) => state.setSelectedMarketCurrency,
  )

  return (
    <Dialog.Content className="max-w-[550px] relative" size={'4'}>
      <header className="pb-7">
        <Dialog.Title className="m-0" size={'6'}>
          Selecione uma moeda
        </Dialog.Title>

        <Dialog.Close className="absolute right-7 top-6">
          <Button variant="light" className="text-gray-500" isIconOnly>
            <X />
          </Button>
        </Dialog.Close>
      </header>

      <SearchBar />

      <ul className="pt-7 flex flex-col gap-1">
        {marketCurrencies.map((marketCurrency) => (
          <CurrencyItem
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
