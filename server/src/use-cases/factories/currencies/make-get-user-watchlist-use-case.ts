import { PrismaWatchlistRepository } from '@/repositories/prisma/prisma-watchlist-repository'
import { GetUserWatchlistUseCase } from '@/use-cases/currencies/get-user-watchlist'

export function makeGetUserWatchlistUseCase() {
  const watchlistRepository = new PrismaWatchlistRepository()
  const getUserWatchlistUseCase = new GetUserWatchlistUseCase(
    watchlistRepository,
  )

  return getUserWatchlistUseCase
}
