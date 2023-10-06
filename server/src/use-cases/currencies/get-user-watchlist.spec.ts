import { InMemoryWatchlistRepository } from '@/repositories/in-memory/in-memory-watchlist-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserWatchlistUseCase } from './get-user-watchlist'

describe('Get User Watchlist Use Case', () => {
  let watchlistRepository: InMemoryWatchlistRepository
  let sut: GetUserWatchlistUseCase

  beforeEach(() => {
    watchlistRepository = new InMemoryWatchlistRepository()
    sut = new GetUserWatchlistUseCase(watchlistRepository)
  })

  it('should able to get user watchlist', async () => {
    await watchlistRepository.create({
      user_id: 'user-01',
      currency_id: 1,
    })

    const { watchlist } = await sut.execute({
      userId: 'user-01',
    })

    expect(watchlist).toEqual([
      expect.objectContaining({
        user_id: 'user-01',
        currency_id: 1,
      }),
    ])
  })
})
