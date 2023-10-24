import { Text } from '@radix-ui/themes'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { LiHTMLAttributes } from 'react'

interface CurrencyProps extends LiHTMLAttributes<HTMLElement> {
  icon?: boolean
  hover?: boolean
  logoWidth?: number
  logoHeight?: number
}

export function Currency({
  icon = false,
  hover = true,
  logoHeight = 32,
  logoWidth = 32,
  ...props
}: CurrencyProps) {
  return (
    <li
      {...props}
      className={`flex w-full items-center gap-2 py-2 px-1 cursor-pointer rounded ${
        hover ? 'hover:bg-gray-100' : ''
      }`}
    >
      <Image
        src="https://img.api.cryptorank.io/coins/60x60.bitcoin1524754012028.png"
        alt="bitcoin logo"
        width={logoWidth}
        height={logoHeight}
      />
      <Text as="p" className="w-full">
        Bitcoin <Text color="gray">BTC</Text>
      </Text>
      {icon && (
        <b className="ml-auto">
          <ChevronRight />
        </b>
      )}
    </li>
  )
}
