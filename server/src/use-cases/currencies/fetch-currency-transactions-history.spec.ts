import { TransactionsRepository } from '@/repositories/transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchCurrencyTransactionsHistoryUseCase } from './fetch-currency-transactions-history'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'

describe('Fetch Currency Transactions History Use Case', () => {
  let currenciesRepository: CurrenciesRepository
  let transactionsRepository: TransactionsRepository
  let sut: FetchCurrencyTransactionsHistoryUseCase

  beforeEach(() => {
    currenciesRepository = new InMemoryCurrenciesRepository()
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new FetchCurrencyTransactionsHistoryUseCase(currenciesRepository)
  })

  it('should be able to Fetch currency transactions history', async () => {
    const currency = await currenciesRepository.create({
      cryptocurrency_id: 1,
      amount: 0.5,
      name: 'Bitcoin',
      slug: 'bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    await transactionsRepository.create({
      amount: 0.5,
      currency_id: currency.id,
      type: 'buy',
      value: 26000000,
    })

    const { currencyWithTransactions } = await sut.execute({
      currencyId: currency.id,
    })

    expect(currencyWithTransactions).toEqual(
      expect.objectContaining({
        cryptocurrency_id: 1,
        name: 'Bitcoin',
        transactions: [],
      }),
    )
  })
})
