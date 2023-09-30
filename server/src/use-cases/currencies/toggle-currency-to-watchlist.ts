import { WatchlistRepository } from '@/repositories/watchlist-repository'
import { Watchlist } from '@prisma/client'

interface ToggleCurrencyToWatchlistRequest {
  currencyId: number
  userId: string
}

interface ToggleCurrencyToWatchlistResponse {
  currencyInWatchlist: Watchlist
}

export class ToggleCurrencyToWatchlist {
  constructor(private watchlistRepository: WatchlistRepository) {}

  async execute({
    currencyId,
    userId,
  }: ToggleCurrencyToWatchlistRequest): Promise<
    ToggleCurrencyToWatchlistResponse | undefined
  > {
    const dbCurrencyInWatchlist =
      await this.watchlistRepository.findbyUserIdAndCurrencyId(
        currencyId,
        userId,
      )

    if (dbCurrencyInWatchlist) {
      await this.watchlistRepository.delete(dbCurrencyInWatchlist.id)
    } else {
      const currencyInWatchlist = await this.watchlistRepository.create({
        currency_id: currencyId,
        user_id: userId,
      })

      return {
        currencyInWatchlist,
      }
    }
  }
}
