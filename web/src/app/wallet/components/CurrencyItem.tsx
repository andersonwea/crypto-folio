import { MarketCurrency } from '@/@types'
import { Button } from '@nextui-org/react'
import { Text } from '@radix-ui/themes'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface CurrencyProps {
  icon?: boolean
  logoWidth?: number
  logoHeight?: number
  currency: MarketCurrency
  onClick: () => void
}

export function CurrencyItem({
  icon = false,
  logoHeight = 32,
  logoWidth = 32,
  currency,
  onClick,
}: CurrencyProps) {
  return (
    <Button
      onClick={onClick}
      variant={icon ? 'light' : 'bordered'}
      className="text-base text-start space-x-3 w-full"
      endContent={icon && <ChevronRight />}
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
    </Button>
  )
}
