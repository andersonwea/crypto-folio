import { WatchlistRepository } from '@/repositories/watchlist-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ToggleCurrencyToWatchlist } from './toggle-currency-to-watchlist'
import { InMemoryWatchlistRepository } from '@/repositories/in-memory/in-memory-watchlist-repository'

describe('Toggle Currency To Watchlist Use Case', () => {
  let watchlistRepository: WatchlistRepository
  let sut: ToggleCurrencyToWatchlist

  beforeEach(() => {
    watchlistRepository = new InMemoryWatchlistRepository()
    sut = new ToggleCurrencyToWatchlist(watchlistRepository)
  })

  it('should be able to add a currency to the watchlist', async () => {
    const currencyInWatchlist = await sut.execute({
      currencyId: 123,
      userId: 'user-01',
    })

    expect(currencyInWatchlist?.currencyInWatchlist).toEqual(
      expect.objectContaining({
        currency_id: 123,
        user_id: 'user-01',
      }),
    )
  })

  it('should be able to remove a currency to the watchlist', async () => {
    await sut.execute({
      currencyId: 123,
      userId: 'user-01',
    })

    const currencyInWatchlist = await sut.execute({
      currencyId: 123,
      userId: 'user-01',
    })

    expect(currencyInWatchlist).toEqual(undefined)
  })
})
