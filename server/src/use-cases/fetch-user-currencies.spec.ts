import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCurrenciesUseCase } from './fetch-user-currencies'
import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'

describe('Fetch User Currencies Use Case', () => {
  let currenciesRepository: CurrenciesRepository
  let sut: FetchUserCurrenciesUseCase

  beforeEach(() => {
    currenciesRepository = new InMemoryCurrenciesRepository()
    sut = new FetchUserCurrenciesUseCase(currenciesRepository)
  })

  it('should be able to fetch user currencies', async () => {
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
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      slug: 'bitcoin',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    const { userCurrencies } = await sut.execute({
      userId: 'user-01',
    })

    expect(userCurrencies).toHaveLength(2)
    expect(userCurrencies).toEqual([
      expect.objectContaining({
        name: 'Bitcoin',
        cryptocurrency_id: 1,
      }),
      expect.objectContaining({
        name: 'Bitcoin',
        cryptocurrency_id: 1,
      }),
    ])
  })

  it('should be able to search by name a user currency', async () => {
    await currenciesRepository.create({
      amount: 1.5,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      slug: 'bitcoin',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    await currenciesRepository.create({
      amount: 1.5,
      cryptocurrency_id: 2,
      name: 'Ethereum',
      slug: 'ethereum',
      symbol: 'ETH',
      user_id: 'user-01',
    })

    const { userCurrencies } = await sut.execute({
      userId: 'user-01',
      search: 'ethereum',
    })

    console.log(userCurrencies)

    expect(userCurrencies).toHaveLength(1)
    expect(userCurrencies).toEqual([
      expect.objectContaining({
        slug: 'ethereum',
        symbol: 'ETH',
      }),
    ])
  })
})
