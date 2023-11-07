'use client'

import { Heading, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import { Pencil, Trash2 } from 'lucide-react'
import { TransactionModal } from './TransactionModal'
import { Button } from '@/components/Button'
import { useTransactionStore } from '@/store/useTransactionsStore'
import { useCallback, useEffect } from 'react'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import dayjs from 'dayjs'
import { priceFormatter } from '@/utils/priceFormatter'
import { NavPages } from '@/app/market/components/NavPages'

interface TransactionsProps {
  page?: string
}

export function Transactions({ page = '1' }: TransactionsProps) {
  const transactions = useTransactionStore(
    useCallback((state) => state.transactions, []),
  )
  const totalTransactions = useTransactionStore(
    useCallback((state) => state.totalTransactions, []),
  )
  const fetchTransactions = useTransactionStore(
    useCallback((state) => state.fetchTransactions, [page]),
  )
  const walletCurrencies = useCurrencyStore(
    useCallback((state) => state.walletCurrencies, []),
  )
  const fetchWalletCurrencies = useCurrencyStore(
    useCallback((state) => state.fetchWalletCurrencies, []),
  )

  const totalPages = Math.floor(totalTransactions / 7) + 1

  useEffect(() => {
    fetchWalletCurrencies()
    fetchTransactions(page)
  }, [page])

  return (
    <section className="pt-7">
      <header className="flex items-center justify-between">
        <Heading as="h2">Transações</Heading>

        <TransactionModal>
          <Button>Add transação</Button>
        </TransactionModal>
      </header>

      <ScrollArea className="pt-1" type="auto" style={{ maxHeight: 358 }}>
        <table className="pt-7 w-full border-collapse">
          <thead>
            <tr className="space-x-10">
              <th className="text-left sticky left-0">
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
            {transactions.map((transaction) => {
              const currency = walletCurrencies.find(
                (currency) => currency.id === transaction.currency_id,
              )

              if (!currency) {
                return null
              }

              return (
                <tr key={transaction.id}>
                  <td className="flex items-center gap-3 sticky left-0 shadow-sm min-w-[150px]">
                    <div className="w-8 h-8">
                      <div className="rounded-full w-8 h-8 bg-slate-400 flex items-end justify-center text-xl text-white">
                        {transaction.type.slice(0, 1).toLocaleUpperCase()}
                      </div>
                    </div>
                    <div className="w-full">
                      <Heading as="h2" size={'3'} className="text-start">
                        {(transaction.type === 'buy' ? 'Compra' : 'Venda') +
                          ' de ' +
                          currency.name}
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
                  <td>
                    {priceFormatter.format(
                      transaction.value / 100 / transaction.amount,
                    )}
                  </td>
                  <td>{priceFormatter.format(transaction.value / 100)}</td>
                  <td>{transaction.amount + ' ' + currency.symbol}</td>
                  <td>
                    <div className="flex gap-2 justify-end">
                      <IconButton variant="ghost" color="gray">
                        <Pencil size={20} />
                      </IconButton>
                      <IconButton variant="ghost" color="gray">
                        <Trash2 size={20} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </ScrollArea>
      <NavPages page={Number(page)} totalPages={totalPages} />
    </section>
  )
}
