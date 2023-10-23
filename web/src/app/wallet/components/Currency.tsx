import { Text } from '@radix-ui/themes'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { LiHTMLAttributes } from 'react'

interface CurrencyProps extends LiHTMLAttributes<HTMLElement> {
  icon?: boolean
}

export function Currency({ icon = false }: CurrencyProps) {
  return (
    <li className="flex items-center gap-2 py-2 px-1 cursor-pointer hover:bg-gray-100 rounded">
      <Image
        src="https://img.api.cryptorank.io/coins/60x60.bitcoin1524754012028.png"
        alt="bitcoin logo"
        width={32}
        height={32}
      />
      <Text as="p">
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
