import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserTransactionsHistoryUseCase } from './fetch-user-transactions-history'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'

describe('Fetch User Transactions History Use Case', () => {
  let transactionsRepository: TransactionsRepository
  let currenciesRepository: CurrenciesRepository
  let sut: FetchUserTransactionsHistoryUseCase

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    currenciesRepository = new InMemoryCurrenciesRepository()
    sut = new FetchUserTransactionsHistoryUseCase(
      currenciesRepository,
      transactionsRepository,
    )
  })

  it('should be able to fetch user transactions', async () => {
    const currency = await currenciesRepository.create({
      amount: 1.5,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      slug: 'bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    await transactionsRepository.create({
      amount: 1.5,
      currency_id: currency.id,
      type: 'buy',
      value: 32000000,
    })

    await transactionsRepository.create({
      amount: 1,
      currency_id: currency.id,
      type: 'buy',
      value: 15000000,
    })

    const { transactions } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(transactions).toHaveLength(2)
    expect(transactions).toEqual([
      expect.objectContaining({
        value: 32000000,
      }),
      expect.objectContaining({
        value: 15000000,
      }),
    ])
  })

  it('should be able to fetch user transaction history pagineted', async () => {
    const currency = await currenciesRepository.create({
      amount: 1.5,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      slug: 'bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    for (let i = 1; i <= 10; i++) {
      await transactionsRepository.create({
        amount: i,
        currency_id: currency.id,
        type: 'buy',
        value: 12000000,
      })
    }

    const { transactions } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(transactions).toHaveLength(3)
    expect(transactions).toEqual([
      expect.objectContaining({
        value: 12000000,
      }),
      expect.objectContaining({
        value: 12000000,
      }),
      expect.objectContaining({
        value: 12000000,
      }),
    ])
  })
})
