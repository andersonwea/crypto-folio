import { ApiService } from '@/adapters/api-service'
import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchUserCurrencyUseCase } from './search-user-currency'
import { AxiosApiService } from '@/adapters/axios/axios-api-service'

describe('Search User Currency Use Case', () => {
  let currenciesRepository: InMemoryCurrenciesRepository
  let apiService: ApiService
  let sut: SearchUserCurrencyUseCase

  beforeEach(() => {
    currenciesRepository = new InMemoryCurrenciesRepository()
    apiService = new AxiosApiService()
    sut = new SearchUserCurrencyUseCase(apiService, currenciesRepository)
  })

  it('should be able to search for a user currency', async () => {
    await currenciesRepository.create({
      amount: 1.5,
      cryptocurrency_id: 1,
      name: 'bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    await currenciesRepository.create({
      amount: 1,
      cryptocurrency_id: 3,
      name: 'ethereum',
      image: 'crypto-image',
      symbol: 'ETH',
      user_id: 'user-01',
    })

    const { userCurrenciesWithBalance } = await sut.execute({
      q: 'bitcoin',
      userId: 'user-01',
    })

    expect(userCurrenciesWithBalance).toEqual([
      expect.objectContaining({
        name: 'bitcoin',
        cryptocurrency_id: 1,
      }),
    ])
  })
})
