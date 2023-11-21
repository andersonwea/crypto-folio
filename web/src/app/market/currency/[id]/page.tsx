import { Header } from '@/components/Header'
import { Flex, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import { CardItem } from '../../components/CardItem'
import { getMarketCurrency } from '@/actions/currencies/getMarketCurrency'
import { Metadata } from 'next'
import { priceFormatter } from '@/utils/priceFormatter'
import { getWatchlist } from '@/actions/watchlist/getWatchlist'
import { WatchlistButton } from '@/components/WatchlistButton'
import { numberFormat } from '@/utils/number-format'
import TradingViewWidget from '@/components/TradingViewWidget'

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cryptocurrencyId = params.id

  const { marketCurrency } = await getMarketCurrency(cryptocurrencyId)

  return {
    title: `${marketCurrency?.name} | Crypto folio`,
  }
}

export const revalidate = 60 * 5 // 5 Minutes

export default async function MarketCurrency({ params }: Props) {
  const cryptocurrencyId = params.id

  const { marketCurrency } = await getMarketCurrency(cryptocurrencyId)
  const { watchlist } = await getWatchlist()

  return (
    <div className="h-[850px] flex flex-col">
      <Header title="Mercado" />

      <main className="mt-7 max-h-full flex-grow">
        <div className="grid grid-cols-[1fr_0.7fr] h-full max-lg:grid-cols-1 lg:gap-4 xl:gap-7">
          <section className="flex-flex-col justify-between">
            <Heading>Criptotomoedas</Heading>

            <div className="flex flex-col h-[90%] justify-between">
              <Flex
                className="mt-5"
                direction={{
                  initial: 'column',
                  sm: 'row',
                }}
                gap={{
                  initial: '3',
                  sm: '9',
                }}
              >
                <Flex gap={'2'} align={'center'}>
                  <Image
                    src={marketCurrency?.image ?? ''}
                    alt="bitcoin logo"
                    width={48}
                    height={48}
                  />
                  <Heading as="h2" className="capitalize">
                    {marketCurrency?.name}
                  </Heading>
                  <Text color="gray">{marketCurrency?.symbol}</Text>
                  {marketCurrency && watchlist && (
                    <WatchlistButton
                      marketCurrency={marketCurrency}
                      watchlist={watchlist}
                    />
                  )}
                </Flex>

                <Flex align={'end'} gap={'2'}>
                  <div>
                    <Text color="gray" className="block">
                      {marketCurrency?.symbol} Preço
                    </Text>
                    <Heading>
                      {priceFormatter.format(marketCurrency?.values.price ?? 0)}
                    </Heading>
                  </div>
                  <Text
                    color={
                      marketCurrency &&
                      marketCurrency?.values.percentChange24h > 0
                        ? 'green'
                        : 'red'
                    }
                  >
                    {marketCurrency?.values.percentChange24h.toFixed(2)}%
                  </Text>
                </Flex>
              </Flex>

              {marketCurrency && (
                <div className="h-[500px] max-lg:mt-10">
                  <TradingViewWidget
                    marketCurrencySymbol={marketCurrency?.symbol}
                  />
                </div>
              )}
            </div>
          </section>

          <section className="flex mb-[70px]">
            <div className="mx-2 py-8 px-5 rounded-[30px] bg-gray-800 text-white mt-auto self-end w-full">
              <Heading>BTC Estatísticas</Heading>

              <div className="mt-5">
                {marketCurrency && (
                  <>
                    <CardItem
                      title="Cap de Mercado"
                      value={priceFormatter.format(
                        marketCurrency?.values.marketCap ?? 0,
                      )}
                    />
                    <CardItem
                      title="Cap. de Mercado Dil."
                      value={priceFormatter.format(
                        marketCurrency?.values.price *
                          marketCurrency?.maxSupply,
                      )}
                    />
                    <CardItem
                      title="Volume (24H)"
                      value={priceFormatter.format(
                        marketCurrency?.values.volume24h,
                      )}
                    />
                    <CardItem
                      title="Suply circulante"
                      value={numberFormat.format(
                        marketCurrency?.circulatingSupply,
                      )}
                      extra={
                        String(
                          (
                            (marketCurrency?.circulatingSupply /
                              marketCurrency?.maxSupply) *
                            100
                          ).toFixed(2),
                        ) + '%'
                      }
                    />
                    <CardItem
                      title="Suply Total"
                      value={numberFormat.format(marketCurrency?.maxSupply)}
                      symbol={marketCurrency.symbol}
                    />
                    <CardItem
                      title="Suply Máximo"
                      value={numberFormat.format(marketCurrency?.maxSupply)}
                      symbol={marketCurrency?.symbol}
                    />
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
