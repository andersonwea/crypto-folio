import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  color: string
}

export function Card({ color }: CardProps) {
  return (
    <Link
      className={`${color} rounded-3xl px-9 py-6 space-y-16 max-w-[194px]`}
      href={'#'}
    >
      <div>
        <Heading>
          1.25 <span>BTC</span>
        </Heading>
        <Text>$ 35.265,21</Text>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center">
          <Image
            src={
              'https://img.api.cryptorank.io/coins/60x60.bitcoin1524754012028.png'
            }
            alt="bitcoin logo"
            width={32}
            height={32}
          />
        </div>
        <Text as="span" color="green">
          0.15%
        </Text>
      </div>
    </Link>
  )
}
