import { InMemoryCryptocurrenciesRepository } from '@/repositories/in-memory/in-memory-cryptocurrencies-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchCryptocurrenciesUseCase } from './search-cryptocurrencies'
import { prisma } from '@/lib/prisma'
import { AxiosApiService } from '@/adapters/axios/axios-api-service'

describe('Search Cryptocurrencies Use Case', () => {
  let cryptocurrenciesRepository: InMemoryCryptocurrenciesRepository
  let apiService: AxiosApiService
  let sut: SearchCryptocurrenciesUseCase

  beforeEach(() => {
    cryptocurrenciesRepository = new InMemoryCryptocurrenciesRepository()
    apiService = new AxiosApiService()
    sut = new SearchCryptocurrenciesUseCase(
      cryptocurrenciesRepository,
      apiService,
    )
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

    const { currencies } = await sut.execute({
      search: 'bitcoin',
    })

    expect(currencies).toHaveLength(1)
    expect(currencies[0].name).toEqual('bitcoin')
  })
})
