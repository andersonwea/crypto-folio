import { PrismaWatchlistRepository } from '@/repositories/prisma/prisma-watchlist-repository'
import { ToggleCurrencyToWatchlist } from '@/use-cases/currencies/toggle-currency-to-watchlist'

export function makeToggleCurrencyToWatchlist() {
  const watchlistRepository = new PrismaWatchlistRepository()
  const toggleCurrencyToWatchlist = new ToggleCurrencyToWatchlist(
    watchlistRepository,
  )

  return toggleCurrencyToWatchlist
}
