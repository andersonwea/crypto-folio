import { WatchlistRepository } from '@/repositories/watchlist-repository'
import { Watchlist } from '@prisma/client'

interface GetUserWatchListUseCaseRequest {
  userId: string
}

interface GetUserWatchListUseCaseResponse {
  watchlist: Watchlist[]
}

export class GetUserWatchlistUseCase {
  constructor(private watchlistRepository: WatchlistRepository) {}

  async execute({
    userId,
  }: GetUserWatchListUseCaseRequest): Promise<GetUserWatchListUseCaseResponse> {
    const watchlist = await this.watchlistRepository.findManyByUserId(userId)

    return {
      watchlist,
    }
  }
}
