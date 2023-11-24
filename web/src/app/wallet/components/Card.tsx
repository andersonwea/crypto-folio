import { WalletCurrency } from '@/@types'
import { priceFormatter } from '@/utils/priceFormatter'
import { Card } from '@nextui-org/react'
import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  color: string
  walletCurrency: WalletCurrency
}

export function CurrencyCard({ color, walletCurrency }: CardProps) {
  return (
    <Link href={`/wallet/currency/${walletCurrency.id}`}>
      <Card
        isPressable
        className={`${color} px-6 py-6 min-h-[222px] flex flex-col justify-between min-w-[194px]`}
      >
        <div className="flex flex-col items-start">
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
      </Card>
    </Link>
  )
}
