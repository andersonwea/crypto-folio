import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { EditTransactionUseCase } from './edit-transaction'
import { Prisma } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

describe('Edit Transaction Use Case', () => {
  let transactionsRepository: InMemoryTransactionsRepository
  let currenciesRepository: InMemoryCurrenciesRepository
  let sut: EditTransactionUseCase

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    currenciesRepository = new InMemoryCurrenciesRepository()
    sut = new EditTransactionUseCase(transactionsRepository)
  })

  it('should be able to edit transaction', async () => {
    const currency = await currenciesRepository.create({
      amount: 0,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      slug: 'bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    const transaction = await transactionsRepository.create({
      amount: 1,
      currency_id: currency.id,
      type: 'buy',
      value: 12000000,
    })

    const { editedTransaction } = await sut.execute({
      amount: 2.5,
      createdAt: new Date(2022, 0, 30, 13, 40),
      transactionId: transaction.id,
      value: 25000000,
    })

    expect(editedTransaction).toEqual(
      expect.objectContaining({
        amount: new Prisma.Decimal(2.5),
        value: 25000000,
      }),
    )
  })

  it('should be not able to edit inexisting transaction', async () => {
    await expect(() =>
      sut.execute({
        amount: 2.5,
        createdAt: new Date(2022, 0, 30, 13, 40),
        transactionId: 'inexisting-transaction-id',
        value: 25000000,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
