import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCurrencyUseCase } from './fetch-user-currency'
import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { Prisma } from '@prisma/client'

describe.skip('Fetch User Currency Use Case', () => {
  let currenciesRepository: InMemoryCurrenciesRepository
  let apiService: AxiosApiService
  let sut: FetchUserCurrencyUseCase

  beforeEach(() => {
    currenciesRepository = new InMemoryCurrenciesRepository()
    apiService = new AxiosApiService()
    sut = new FetchUserCurrencyUseCase(currenciesRepository, apiService)
  })

  it('should be able to fetch user currency', async () => {
    const currency = await currenciesRepository.create({
      amount: 1,
      cryptocurrency_id: 1,
      name: 'Bitcoin',
      slug: 'bitcoin',
      symbol: 'BTC',
      user_id: 'user-01',
    })

    const { userCurrencyWithBalance } = await sut.execute({
      currencyId: currency.id,
    })

    expect(userCurrencyWithBalance).toEqual(
      expect.objectContaining({
        name: 'Bitcoin',
        amount: new Prisma.Decimal(1),
        balance: expect.any(Number),
      }),
    )
  })
})
