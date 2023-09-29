import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserCurrencyAmountUseCase } from './update-user-currency-amount'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { Prisma } from '@prisma/client'

describe('Update User Currency Amount Use Case', () => {
  let currenciesRepository: InMemoryCurrenciesRepository
  let transactionsRepository: TransactionsRepository
  let sut: UpdateUserCurrencyAmountUseCase

  beforeEach(() => {
    currenciesRepository = new InMemoryCurrenciesRepository()
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new UpdateUserCurrencyAmountUseCase(
      currenciesRepository,
      transactionsRepository,
    )
  })

  it('should be able to update user currency amount', async () => {
    const userCurrency = await currenciesRepository.create({
      amount: 0,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      slug: 'bitcoin',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    await transactionsRepository.create({
      amount: 2,
      currency_id: userCurrency.id,
      type: 'buy',
      value: 260000000,
    })

    await transactionsRepository.create({
      amount: -1,
      currency_id: userCurrency.id,
      type: 'sell',
      value: 850000000,
    })

    const { userCurrency: updatedUserCurrency } = await sut.execute({
      userCurrencyId: userCurrency.id,
    })

    expect(updatedUserCurrency).toEqual(
      expect.objectContaining({
        name: 'Bitcoin',
        amount: new Prisma.Decimal('1'),
      }),
    )
  })
})
