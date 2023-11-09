import { InMemoryCryptocurrenciesRepository } from '@/repositories/in-memory/in-memory-cryptocurrencies-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchCryptocurrenciesUseCase } from './search-cryptocurrencies'
import { prisma } from '@/lib/prisma'

describe('Search Cryptocurrencies Use Case', () => {
  let cryptocurrenciesRepository: InMemoryCryptocurrenciesRepository
  let sut: SearchCryptocurrenciesUseCase

  beforeEach(() => {
    cryptocurrenciesRepository = new InMemoryCryptocurrenciesRepository()
    sut = new SearchCryptocurrenciesUseCase(cryptocurrenciesRepository)
  })

  it('should be able to search cryptocurrencies', async () => {
    await cryptocurrenciesRepository.create({
      id: 1,
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'btc-image',
    })

    await cryptocurrenciesRepository.create({
      id: 2,
      name: 'ethereum',
      symbol: 'ETH',
      image: 'ethereum-image',
    })

    await cryptocurrenciesRepository.create({
      id: 3,
      name: 'solana',
      symbol: 'SOL',
      image: 'solana-image',
    })

    const { cryptocurrencies } = await sut.execute({
      search: 'bitcoin',
    })

    expect(cryptocurrencies).toHaveLength(1)
    expect(cryptocurrencies[0].name).toEqual('bitcoin')
  })
})
