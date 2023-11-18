import { WalletCurrency } from '@/@types'
import { priceFormatter } from '@/utils/priceFormatter'
import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  color: string
  walletCurrency: WalletCurrency
}

export function Card({ color, walletCurrency }: CardProps) {
  return (
    <Link
      className={`${color} rounded-3xl px-6 py-6 min-h-[222px] flex flex-col justify-between min-w-[194px]`}
      href={`/wallet/currency/${walletCurrency.id}`}
    >
      <div>
        <Heading>
          {walletCurrency.amount} <span>{walletCurrency.symbol}</span>
        </Heading>
        <Text>{priceFormatter.format(walletCurrency.balance)}</Text>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center">
          <Image
            src={walletCurrency.image}
            alt="bitcoin logo"
            width={32}
            height={32}
          />
        </div>
        <Text
          as="span"
          color={walletCurrency.profitOrLoss < 0 ? 'red' : 'green'}
        >
          {walletCurrency.profitOrLoss}%
        </Text>
      </div>
    </Link>
  )
}
