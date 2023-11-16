'use client'

import { ScrollArea, Text } from '@radix-ui/themes'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { NavPages } from '../app/market/components/NavPages'
import Link from 'next/link'
import { priceFormatter } from '@/utils/priceFormatter'
import { bigNumberFormatter } from '@/utils/bigNumberFormatter'
import { MarketCurrency } from '@/@types'
import { experimental_useOptimistic as useOptimistic } from 'react'
import { toggleWatchlist } from '@/actions/toggleWatchlist'

interface CryptoListProps {
  page?: string
  totalPages: number
  marketCurrencies: MarketCurrency[]
  watchlist: MarketCurrency[]
}

export function CryptoList({
  page,
  totalPages,
  watchlist,
  marketCurrencies,
}: CryptoListProps) {
  const [optimisticWatchlist, addOptimisticWatchlist] = useOptimistic(
    watchlist,
    (state, newWatchlist: MarketCurrency) => {
      if (state.find((watchlist) => watchlist.id === newWatchlist.id)) {
        return state.filter((watchlist) => watchlist.id !== newWatchlist.id)
      }

      return [...state, newWatchlist]
    },
  )

  async function handleToggleWatchlist(marketCurrency: MarketCurrency) {
    addOptimisticWatchlist(marketCurrency)

    await toggleWatchlist(marketCurrency.id)
  }

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
            {marketCurrencies?.map((marketCurrency) => {
              const isWatchlisted = !!optimisticWatchlist?.find(
                (watchlist) => watchlist.id === marketCurrency.id,
              )

              return (
                <tr key={marketCurrency.id}>
                  <td>
                    <Star
                      onClick={() => handleToggleWatchlist(marketCurrency)}
                      data-watchlist={isWatchlisted}
                      size={20}
                      className="data-[watchlist=true]:fill-blue-500 cursor-pointer"
                      stroke={isWatchlisted ? '#0587FF' : 'gray'}
                    />
                  </td>
                  <td className="text-left max-sm:hidden">
                    {marketCurrency.rank}
                  </td>
                  <td className="sticky left-0 shadow-sm min-w-[150px]">
                    <Link
                      href={`/market/currency/${marketCurrency.id}`}
                      className="flex items-center gap-2"
                    >
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
              )
            })}
          </tbody>
        </table>
      </ScrollArea>
      <NavPages page={Number(page ?? '1')} totalPages={totalPages} />
    </section>
  )
}
