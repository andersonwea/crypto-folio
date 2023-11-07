'use client'

import { ScrollArea, Text } from '@radix-ui/themes'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { NavPages } from '../app/market/components/NavPages'
import Link from 'next/link'
import { priceFormatter } from '@/utils/priceFormatter'
import { bigNumberFormatter } from '@/utils/bigNumberFormatter'
import { MarketCurrency } from '@/@types'

interface CryptoListProps {
  page?: string
  totalPages: number
  currencies: MarketCurrency[]
}

export function CryptoList({
  page = '1',
  totalPages,
  currencies,
}: CryptoListProps) {
  return (
    <section className="pt-7">
      <ScrollArea
        scrollbars="both"
        type="auto"
        className="pr-10 py-2"
        style={{ height: '100%' }}
      >
        <table className="pt-7 w-full border-collapse">
          <thead>
            <tr className="space-x-10">
              <th></th>
              <th className="text-gray-500 sticky text-left max-sm:hidden">
                #
              </th>
              <th className="text-gray-500 sticky left-0 shadow-sm text-left">
                Nome
              </th>
              <th className="text-gray-500">Preço</th>
              <th className="text-gray-500">Valorização</th>
              <th className="text-gray-500">Cap. de Mercado</th>
              <th className="text-gray-500">Forn. Circulante</th>
            </tr>
          </thead>

          <tbody>
            {currencies.map((marketCurrency) => (
              <tr key={marketCurrency.id}>
                <td>
                  <Star color="gray" size={20} />
                </td>
                <td className="text-left max-sm:hidden">
                  {marketCurrency.rank}
                </td>
                <td className="sticky left-0 shadow-sm min-w-[150px]">
                  <Link href={'#'} className="flex items-center gap-2">
                    <div className="w-8 h-8">
                      <Image
                        src={marketCurrency.image}
                        alt="bitcoin logo"
                        width={32}
                        height={32}
                      />
                    </div>

                    <div className="text-base flex max-sm:flex-col gap-x-2 items-start">
                      <Text as="p">{marketCurrency.name}</Text>
                      <Text className="text-gray-500 text-sm" as="span">
                        {marketCurrency.symbol}
                      </Text>
                    </div>
                  </Link>
                </td>
                <td>{priceFormatter.format(marketCurrency.values.price)}</td>
                <td
                  className={
                    marketCurrency.values.percentChange24h > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {marketCurrency.values.percentChange24h.toFixed(2)}%
                </td>
                <td>{bigNumberFormatter(marketCurrency.values.marketCap)}</td>
                <td>
                  {bigNumberFormatter(marketCurrency.circulatingSupply)}{' '}
                  <Text>{marketCurrency.symbol}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
      <NavPages page={Number(page)} totalPages={totalPages} />
    </section>
  )
}
