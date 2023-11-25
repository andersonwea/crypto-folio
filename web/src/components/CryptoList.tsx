import { ScrollArea, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { priceFormatter } from '@/utils/priceFormatter'
import { bigNumberFormatter } from '@/utils/bigNumberFormatter'
import { MarketCurrency } from '@/@types'
import { PaginationNav } from './PaginationNav'
import { WatchlistButton } from './WatchlistButton'

interface CryptoListProps {
  totalPages: number
  marketCurrencies: MarketCurrency[]
  watchlist: MarketCurrency[]
}

export function CryptoList({
  totalPages,
  watchlist,
  marketCurrencies,
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
              <th className="text-gray-500">Valorização (24h)</th>
              <th className="text-gray-500">Cap. de Mercado</th>
              <th className="text-gray-500">Volume (24h)</th>
              <th className="text-gray-500">Forn. Circulante</th>
            </tr>
          </thead>

          <tbody>
            {marketCurrencies?.map((marketCurrency) => {
              return (
                <tr key={marketCurrency.id}>
                  <td className="w-10 h-10">
                    <WatchlistButton
                      marketCurrency={marketCurrency}
                      watchlist={watchlist}
                    />
                  </td>
                  <td className="text-left max-sm:hidden">
                    {marketCurrency.rank}
                  </td>
                  <td className="sticky left-0 shadow-sm min-w-[150px] group">
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

                      <div className="text-base flex max-sm:flex-col gap-x-2 items-start group-hover:text-blue-500 transition-colors">
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
                  <td>
                    $ {bigNumberFormatter(marketCurrency.values.marketCap)}
                  </td>
                  <td>
                    $ {bigNumberFormatter(marketCurrency.values.volume24h)}
                  </td>
                  <td>
                    $ {bigNumberFormatter(marketCurrency.circulatingSupply)}{' '}
                    <Text>{marketCurrency.symbol}</Text>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </ScrollArea>
      <PaginationNav total={totalPages} />
    </section>
  )
}
