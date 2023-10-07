import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteTransactionUseCase } from './delete-transaction'
import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'

describe('Delete Transaction Use Case', () => {
  let currenciesRepository: CurrenciesRepository
  let transactionsRepository: InMemoryTransactionsRepository
  let sut: DeleteTransactionUseCase

  beforeEach(() => {
    currenciesRepository = new InMemoryCurrenciesRepository()
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new DeleteTransactionUseCase(transactionsRepository)
  })

  it('should be able to delete transaction', async () => {
    const currency = await currenciesRepository.create({
      amount: 0,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    const createdTransaction = await transactionsRepository.create({
      amount: 1,
      currency_id: currency.id,
      type: 'buy',
      value: 12000000,
    })

    await sut.execute({
      transactionId: createdTransaction.id,
    })

    const transaction = await transactionsRepository.findById(
      createdTransaction.id,
    )

    expect(transaction).toEqual(null)
  })
})
