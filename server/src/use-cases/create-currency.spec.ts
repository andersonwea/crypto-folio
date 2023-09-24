import { InMemoryCurrenciesRepository } from '@/repositories/in-memory/in-memory-currencies-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCurrencyUseCase } from './create-currency'
import { ResourceAlreadyExitsError } from './errors/resource-already-exists-error'

describe('Create Currency Use Case', () => {
  let currenciesRepository: InMemoryCurrenciesRepository
  let sut: CreateCurrencyUseCase

  beforeEach(() => {
    currenciesRepository = new InMemoryCurrenciesRepository()
    sut = new CreateCurrencyUseCase(currenciesRepository)
  })

  it('should be able to create a currency', async () => {
    const { currency } = await sut.execute({
      id: 1,
      amount: 0.5,
      name: 'Bitcoin',
      slug: 'bitcoin',
      symbol: 'BTC',
      userId: 'user-01',
    })

    expect(currency).toEqual(
      expect.objectContaining({
        id: 1,
        name: 'Bitcoin',
      }),
    )
  })

  it('should not be able to create a currency that already exists', async () => {
    await sut.execute({
      id: 1,
      amount: 0.5,
      name: 'Bitcoin',
      slug: 'bitcoin',
      symbol: 'BTC',
      userId: 'user-01',
    })

    await expect(() =>
      sut.execute({
        id: 1,
        amount: 0.5,
        name: 'Bitcoin',
        slug: 'bitcoin',
        symbol: 'BTC',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExitsError)
  })
})
