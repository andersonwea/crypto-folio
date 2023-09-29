import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCurrenciesUseCase } from './fetch-user-currencies'
import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'
import { ApiService } from '@/adapters/api-service'
import { AxiosApiService } from '@/adapters/axios/axios-api-service'

describe.skip('Fetch User Currencies Use Case', () => {
  let currenciesRepository: CurrenciesRepository
  let apiService: ApiService
  let sut: FetchUserCurrenciesUseCase

  beforeEach(() => {
    currenciesRepository = new InMemoryCurrenciesRepository()
    apiService = new AxiosApiService()
    sut = new FetchUserCurrenciesUseCase(currenciesRepository, apiService)
  })

  it('should be able to fetch many user currencies', async () => {
    await currenciesRepository.create({
      amount: 1.5,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      slug: 'bitcoin',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    await currenciesRepository.create({
      amount: 1,
      cryptocurrency_id: 3,
      name: 'Ethereum',
      slug: 'etherum',
      symbol: 'ETH',
      user_id: 'user-01',
    })

    const { userApiCurrencies } = await sut.execute({
      userId: 'user-01',
    })

    expect(userApiCurrencies).toHaveLength(2)
    expect(userApiCurrencies).toEqual([
      expect.objectContaining({
        name: 'Bitcoin',
        id: 1,
      }),
      expect.objectContaining({
        name: 'Ethereum',
        id: 3,
      }),
    ])
  })

  it('should be able to fetch user currencies when user has only one', async () => {
    await currenciesRepository.create({
      amount: 1.5,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      slug: 'bitcoin',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    const { userApiCurrencies } = await sut.execute({
      userId: 'user-01',
    })

    expect(userApiCurrencies).toHaveLength(1)
    expect(userApiCurrencies).toEqual([
      expect.objectContaining({
        name: 'Bitcoin',
        id: 1,
      }),
    ])
  })
})
