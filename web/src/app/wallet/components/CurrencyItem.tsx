import { MarketCurrency } from '@/@types'
import { Text } from '@radix-ui/themes'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { LiHTMLAttributes } from 'react'

interface CurrencyProps extends LiHTMLAttributes<HTMLElement> {
  icon?: boolean
  hover?: boolean
  logoWidth?: number
  logoHeight?: number
  currency: MarketCurrency
}

export function CurrencyItem({
  icon = false,
  hover = true,
  logoHeight = 32,
  logoWidth = 32,
  currency,
  ...props
}: CurrencyProps) {
  return (
    <li
      {...props}
      className={`flex w-full items-center gap-2 py-2 px-1 cursor-pointer rounded-lg bg-white border ${
        hover ? 'hover:bg-gray-100' : ''
      }`}
    >
      <Image
        src={currency.image}
        alt="bitcoin logo"
        width={logoWidth}
        height={logoHeight}
      />
      <Text as="p" className="w-full">
        {currency.name} <Text color="gray">{currency.symbol}</Text>
      </Text>
      {icon && (
        <b className="ml-auto">
          <ChevronRight />
        </b>
      )}
    </li>
  )
}
