import { Heading, ScrollArea, Text } from '@radix-ui/themes'
import { TransactionModal } from './TransactionModal'
import dayjs from 'dayjs'
import { priceFormatter } from '@/utils/priceFormatter'
import { EditTransaction } from './EditTransaction'
import { DeleteTransaction } from './DeleteTransaction'
import { getWalletCurrencies } from '@/actions/currencies/getWalletCurrencies'
import { getMarketCurrencies } from '@/actions/currencies/getMarketCurrencies'
import { Transaction } from '@/@types'
import { PaginationNav } from '@/components/PaginationNav'

interface TransactionsProps {
  transactions: Transaction[]
  totalTransactions: number
}

export async function Transactions({
  transactions,
  totalTransactions,
}: TransactionsProps) {
  const { walletCurrencies } = await getWalletCurrencies()
  const { marketCurrencies } = await getMarketCurrencies()

  const totalPages = Math.floor((totalTransactions ?? 0) / 7) + 1

  return (
    <section className="pt-7">
      <header className="flex items-center justify-between">
        <Heading as="h2">Transações</Heading>

        {marketCurrencies && (
          <TransactionModal marketCurrencies={marketCurrencies} />
        )}
      </header>

      <ScrollArea className="mt-4 pr-2" type="auto" style={{ maxHeight: 358 }}>
        <table className="pt-7 w-full border-collapse">
          <thead className="border-b-[1px] border-slate-100">
            <tr className="space-x-10">
              <th className="text-left">
                <Text color="gray">Tipo</Text>
              </th>
              <th>
                <Text color="gray">Preço</Text>
              </th>
              <th>
                <Text color="gray">Valor</Text>
              </th>
              <th>
                <Text color="gray">Qtd</Text>
              </th>
              <th>
                <Text color="gray">Ações</Text>
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions &&
              walletCurrencies &&
              transactions.map((transaction) => {
                const currency = walletCurrencies.find(
                  (currency) => currency.id === transaction.currency_id,
                )

                if (!currency) {
                  return null
                }

                return (
                  <tr key={transaction.id}>
                    <td className="flex items-center gap-3">
                      <div className="w-8 h-8">
                        <div className="rounded-full w-8 h-8 bg-slate-400 flex items-end justify-center text-xl text-white">
                          {transaction.type.slice(0, 1).toLocaleUpperCase()}
                        </div>
                      </div>
                      <div className="w-full">
                        <Heading as="h2" size={'3'} className="text-start">
                          {(transaction.type === 'buy' ? 'Compra' : 'Venda') +
                            ' ' +
                            currency.symbol}
                        </Heading>
                        <Text
                          as="span"
                          size={'2'}
                          className="text-start block w-full"
                        >
                          {dayjs(transaction.created_at).format(
                            'DD [de] MMM [de] YYYY',
                          )}
                        </Text>
                      </div>
                    </td>
                    <td className="min-w-[85px]">
                      {priceFormatter.format(
                        transaction.value / 100 / Number(transaction.amount),
                      )}
                    </td>
                    <td className="min-w-[85px]">
                      {priceFormatter.format(transaction.value / 100)}
                    </td>
                    <td
                      className={`min-w-[85px] ${
                        transaction.amount < 0
                          ? 'text-red-500'
                          : 'text-green-500'
                      }`}
                    >
                      {transaction.amount + ' ' + currency.symbol}
                    </td>
                    <td className="min-w-[85px]">
                      <div className="flex justify-end">
                        <EditTransaction transaction={transaction} />
                        <DeleteTransaction
                          transactionId={transaction.id}
                          currencyId={currency.id}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        <PaginationNav total={totalPages} />
      </ScrollArea>
    </section>
  )
}
