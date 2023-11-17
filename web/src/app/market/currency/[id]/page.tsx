import { Header } from '@/components/Header'
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import bitcoinLogo from '@/assets/bitcoin.png'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { CardItem } from '../../components/CardItem'
import { getMarketCurrencies } from '@/actions/getMarketCurrencies'
import { getMarketCurrency } from '@/actions/getMarketCurrency'
import { Metadata } from 'next'
import { priceFormatter } from '@/utils/priceFormatter'
import { getWatchlist } from '@/actions/getWatchlist'
import { WatchlistButton } from '@/components/WatchlistButton'
import { numberFormat } from '@/utils/number-format'

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

async function staticParams() {
  const { marketCurrencies } = await getMarketCurrencies()

  if (!marketCurrencies) return null

  const marketCurrenciesIds = marketCurrencies.map((marketCurrency) => ({
    id: marketCurrency.id,
  }))

  return marketCurrenciesIds
}

export const revalidate = 60 * 5 // 5 Minutes

export default async function MarketCurrency({ params }: Props) {
  const cryptocurrencyId = params.id

  const { marketCurrency } = await getMarketCurrency(cryptocurrencyId)
  const { watchlist } = await getWatchlist()

  return (
    <div>
      <Header title="Mercado" />

      <main className="mt-7">
        <Grid columns={'1fr 0.7fr'}>
          <section>
            <Heading>Criptotomoedas</Heading>
            <Flex className="mt-5 space-x-16">
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
          </section>

          <section>
            <div className="mx-4 p-8 rounded-[30px] bg-gray-800 text-white mt-auto">
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
        </Grid>
      </main>
    </div>
  )
}

export const generateStaticParams =
  process.env.NODE_ENV === 'production' ? staticParams : undefined
export const dynamic =
  process.env.NODE_ENV === 'production' ? 'auto' : 'force-dynamic'
