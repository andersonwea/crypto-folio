import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCurrencyUseCase } from './create-currency'

describe('Create Currency Use Case', () => {
  let currenciesRepository: InMemoryCurrenciesRepository
  let sut: CreateCurrencyUseCase

  beforeEach(() => {
    currenciesRepository = new InMemoryCurrenciesRepository()
    sut = new CreateCurrencyUseCase(currenciesRepository)
  })

  it('should be able to create a currency', async () => {
    const { currency } = await sut.execute({
      cryptocurrencyId: 1,
      amount: 0.5,
      name: 'Bitcoin',
      image: 'crypto-image',
      symbol: 'BTC',
      userId: 'user-01',
    })

    expect(currency).toEqual(
      expect.objectContaining({
        cryptocurrency_id: 1,
        name: 'Bitcoin',
      }),
    )
  })
})
