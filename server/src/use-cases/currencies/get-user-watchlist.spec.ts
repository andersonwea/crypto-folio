import { InMemoryWatchlistRepository } from '@/repositories/in-memory/in-memory-watchlist-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserWatchlistUseCase } from './get-user-watchlist'
import { AxiosApiService } from '@/adapters/axios/axios-api-service'

describe('Get User Watchlist Use Case', () => {
  let watchlistRepository: InMemoryWatchlistRepository
  let apiService: AxiosApiService
  let sut: GetUserWatchlistUseCase

  beforeEach(() => {
    watchlistRepository = new InMemoryWatchlistRepository()
    apiService = new AxiosApiService()
    sut = new GetUserWatchlistUseCase(watchlistRepository, apiService)
  })

  it('should able to get user watchlist', async () => {
    await watchlistRepository.create({
      user_id: 'user-01',
      currency_id: 1,
    })

    const { watchlist } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(watchlist).toEqual([
      expect.objectContaining({
        id: 1,
      }),
    ])
  })
})
