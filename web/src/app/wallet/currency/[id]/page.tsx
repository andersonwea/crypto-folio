import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import { Transactions } from '../../components/Transactions'
import { getWalletCurrency } from '@/actions/currencies/getWalletCurrency'
import { Metadata } from 'next'
import { priceFormatter } from '@/utils/priceFormatter'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    page: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currencyId = params.id

  const { walletCurrency } = await getWalletCurrency(currencyId)

  return {
    title: `${walletCurrency?.name} | Crypto folio`,
  }
}

export const revalidate = 60 * 5 // 5 Minutes

export default async function currency({ params, searchParams }: Props) {
  const currencyId = params.id
  const { page } = searchParams

  const { walletCurrency } = await getWalletCurrency(currencyId)

  if (!walletCurrency) {
    return null
  }

  const transactionsTotalValueInCents = walletCurrency?.transactions.reduce(
    (acc, curr) => (acc += curr.value),
    0,
  )
  const mediaPrice =
    transactionsTotalValueInCents / 100 / walletCurrency?.amount

  return (
    <>
      <section className="pt-7">
        <Heading as="h2" className="capitalize">
          {walletCurrency?.name}
        </Heading>

        <div className="pt-7">
          <Text as="p" color="gray">
            Saldo atual (USD)
          </Text>

          <div className="flex items-center gap-3 pt-3">
            <div>
              <Image
                src={walletCurrency?.image || ''}
                alt={`icone do ${walletCurrency?.name}`}
                width={32}
                height={32}
              />
            </div>
            <Heading as="h3">
              {priceFormatter.format(walletCurrency?.balance)}
            </Heading>
          </div>
        </div>

        <div className="pt-4 flex gap-5 flex-wrap">
          <div>
            <Text as={'p'} color="gray">
              Quantidade
            </Text>
            <Text weight={'bold'} size={'3'}>
              {walletCurrency?.amount} {walletCurrency?.symbol}
            </Text>
          </div>

          <div>
            <Text as={'p'} color="gray">
              Preço médio
            </Text>
            <Text weight={'bold'} size={'3'}>
              {priceFormatter.format(mediaPrice)}
            </Text>
          </div>

          <div>
            <Text as={'p'} color="gray">
              Lucro/Perda total
            </Text>
            <Text
              size={'3'}
              color={walletCurrency.profitOrLoss < 0 ? 'red' : 'green'}
            >
              {walletCurrency.profitOrLoss}%
            </Text>
          </div>
        </div>
      </section>

      <Transactions
        page={page}
        transactions={walletCurrency.transactions}
        totalTransactions={walletCurrency.transactions.length}
      />
    </>
  )
}
