import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { PrismaWatchlistRepository } from '@/repositories/prisma/prisma-watchlist-repository'
import { GetUserWatchlistUseCase } from '@/use-cases/currencies/get-user-watchlist'

export function makeGetUserWatchlistUseCase() {
  const watchlistRepository = new PrismaWatchlistRepository()
  const apiService = new AxiosApiService()
  const getUserWatchlistUseCase = new GetUserWatchlistUseCase(
    watchlistRepository,
    apiService,
  )

  return getUserWatchlistUseCase
}
