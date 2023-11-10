import { WalletCurrency } from '@/store/useCurrencyStore'
import { priceFormatter } from '@/utils/priceFormatter'
import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  color: string
  currency: WalletCurrency
}

export function Card({ color, currency }: CardProps) {
  return (
    <Link
      className={`${color} rounded-3xl px-9 py-6 space-y-16 max-w-[194px]`}
      href={`/wallet/currency/${currency.id}`}
    >
      <div>
        <Heading>
          {currency.amount} <span>{currency.symbol}</span>
        </Heading>
        <Text>{priceFormatter.format(currency.balance)}</Text>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center">
          <Image
            src={currency.image}
            alt="bitcoin logo"
            width={32}
            height={32}
          />
        </div>
        <Text as="span" color="green">
          0.15% {/** //TODO change this */}
        </Text>
      </div>
    </Link>
  )
}
