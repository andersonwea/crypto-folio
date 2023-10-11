import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCurrenciesUseCase } from './fetch-user-currencies'
import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'
import { ApiService } from '@/adapters/api-service'
import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'

describe('Fetch User Currencies Use Case', () => {
  let currenciesRepository: InMemoryCurrenciesRepository
  let transactionsRepository: InMemoryTransactionsRepository
  let apiService: ApiService
  let sut: FetchUserCurrenciesUseCase

  beforeEach(() => {
    currenciesRepository = new InMemoryCurrenciesRepository()
    transactionsRepository = new InMemoryTransactionsRepository()
    apiService = new AxiosApiService()
    sut = new FetchUserCurrenciesUseCase(currenciesRepository, apiService)
  })

  it('should be able to fetch many user currencies', async () => {
    await currenciesRepository.create({
      amount: 1.5,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    await currenciesRepository.create({
      amount: 1,
      cryptocurrency_id: 3,
      name: 'Ethereum',
      image: 'crypto-image',
      symbol: 'ETH',
      user_id: 'user-01',
    })

    const { userCurrenciesWithBalance } = await sut.execute({
      userId: 'user-01',
    })

    expect(userCurrenciesWithBalance).toHaveLength(2)
    expect(userCurrenciesWithBalance).toEqual([
      expect.objectContaining({
        name: 'Bitcoin',
        cryptocurrency_id: 1,
        balance: expect.any(Number),
      }),
      expect.objectContaining({
        name: 'Ethereum',
        cryptocurrency_id: 3,
        balance: expect.any(Number),
      }),
    ])
  })

  it('should be able to fetch user currencies when user has only one', async () => {
    const currency = await currenciesRepository.create({
      amount: 0,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    await currenciesRepository.createTransaction({
      amount: 1,
      currency_id: currency.id,
      type: 'buy',
      value: 1375000,
    })

    await transactionsRepository.create({
      amount: 1,
      currency_id: currency.id,
      type: 'buy',
      value: 1375000,
    })

    const { sum } = await transactionsRepository.sumAmountByCurrencyId(
      currency.id,
    )

    await currenciesRepository.save(currency.id, sum)

    const { userCurrenciesWithBalance } = await sut.execute({
      userId: 'user-01',
    })

    expect(userCurrenciesWithBalance).toHaveLength(1)
    expect(userCurrenciesWithBalance).toEqual([
      expect.objectContaining({
        name: 'Bitcoin',
        cryptocurrency_id: 1,
        balance: expect.any(Number),
      }),
    ])
  })
})
