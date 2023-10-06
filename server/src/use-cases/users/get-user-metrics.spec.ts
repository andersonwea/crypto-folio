import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'

describe('Get User Metrics Use Case', () => {
  let currenciesRepository: InMemoryCurrenciesRepository
  let transactionsRepository: InMemoryTransactionsRepository
  let apiService: AxiosApiService
  let sut: GetUserMetricsUseCase

  beforeEach(() => {
    currenciesRepository = new InMemoryCurrenciesRepository()
    transactionsRepository = new InMemoryTransactionsRepository()
    apiService = new AxiosApiService()
    sut = new GetUserMetricsUseCase(currenciesRepository, apiService)
  })

  it('should be able to get User Metrics', async () => {
    const currency = await currenciesRepository.create({
      amount: 0,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      slug: 'bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    await currenciesRepository.createTransaction({
      amount: 1,
      currency_id: currency.id,
      type: 'buy',
      value: 1000000,
    })

    await currenciesRepository.createTransaction({
      amount: -0.5,
      currency_id: currency.id,
      type: 'sell',
      value: -500000,
    })

    await transactionsRepository.create({
      amount: 1,
      currency_id: currency.id,
      type: 'buy',
      value: 1000000,
    })

    await transactionsRepository.create({
      amount: 0.5,
      currency_id: currency.id,
      type: 'sell',
      value: 500000,
    })

    const sumAmount = await transactionsRepository.sumAmountByCurrencyId(
      currency.id,
    )

    await currenciesRepository.save(currency.id, sumAmount)

    const { profitOrLoss, totalBalance, totalInvested } = await sut.execute({
      userId: 'user-01',
    })

    expect(totalInvested).toEqual(5000)
    expect(totalBalance).toEqual(expect.any(Number))
    expect(profitOrLoss).toEqual(expect.any(Number))
  })
})
