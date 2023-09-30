import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTransactionUseCase } from './create-transaction'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InvalidTransactionError } from '../errors/invalid-transaction-error'

describe('Create Transaction Use Case', () => {
  let transactionsRepository: TransactionsRepository
  let currenciesRepository: CurrenciesRepository
  let sut: CreateTransactionUseCase

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    currenciesRepository = new InMemoryCurrenciesRepository()
    sut = new CreateTransactionUseCase(
      transactionsRepository,
      currenciesRepository,
    )
  })

  it('should be able to create a transaction', async () => {
    const currency = await currenciesRepository.create({
      cryptocurrency_id: 1,
      amount: 0.5,
      name: 'Bitcoin',
      slug: 'bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    const { transaction } = await sut.execute({
      amount: 0.5,
      currencyId: currency.id,
      type: 'buy',
      value: 13000000,
    })

    expect(transaction).toEqual(
      expect.objectContaining({
        type: 'buy',
        value: 13000000,
      }),
    )
  })

  it('should not be able to create a transaction with a inesxisting currency', async () => {
    await expect(() =>
      sut.execute({
        amount: 0.5,
        currencyId: 'inesxisting-currency-id',
        type: 'buy',
        value: 13000000,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to create a sell transaction to user currency amount smaller than transaction amount', async () => {
    const currency = await currenciesRepository.create({
      cryptocurrency_id: 1,
      amount: 0,
      name: 'Bitcoin',
      slug: 'bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    await expect(() =>
      sut.execute({
        amount: 0.5,
        currencyId: currency.id,
        type: 'sell',
        value: 13000000,
      }),
    ).rejects.toBeInstanceOf(InvalidTransactionError)
  })
})
