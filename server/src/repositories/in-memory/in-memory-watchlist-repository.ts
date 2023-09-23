import { Prisma, Watchlist } from '@prisma/client'
import { WatchlistRepository } from '../watchlist-repository'
import { randomUUID } from 'crypto'

export class InMemoryWatchlistRepository implements WatchlistRepository {
  private watchlist: Watchlist[] = []

  async findbyUserIdAndCurrencyId(currencyId: number, userId: string) {
    const currencyInWatchlist = this.watchlist.find(
      (watch) => watch.currency_id === currencyId && watch.user_id === userId,
    )

    if (!currencyInWatchlist) {
      return null
    }

    return currencyInWatchlist
  }

  async delete(watchlistId: string): Promise<void> {
    const currencyInWatchlistIndex = this.watchlist.findIndex(
      (watchlist) => watchlist.id === watchlistId,
    )

    this.watchlist.splice(currencyInWatchlistIndex, 1)
  }

  async create(data: Prisma.WatchlistUncheckedCreateInput) {
    const currencyInWatchlist = {
      id: randomUUID(),
      currency_id: data.currency_id,
      user_id: data.user_id,
    }

    this.watchlist.push(currencyInWatchlist)

    return currencyInWatchlist
  }
}
