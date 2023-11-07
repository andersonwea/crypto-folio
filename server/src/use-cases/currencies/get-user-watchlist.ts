import { ApiCurrency, ApiService } from '@/adapters/api-service'
import { WatchlistRepository } from '@/repositories/watchlist-repository'

interface GetUserWatchListUseCaseRequest {
  userId: string
}

interface GetUserWatchListUseCaseResponse {
  watchlist: ApiCurrency[]
}

export class GetUserWatchlistUseCase {
  constructor(
    private watchlistRepository: WatchlistRepository,
    private apiService: ApiService,
  ) {}

  async execute({
    userId,
  }: GetUserWatchListUseCaseRequest): Promise<GetUserWatchListUseCaseResponse> {
    const watchlistCurrencies =
      await this.watchlistRepository.findManyByUserId(userId)

    const watchlistCurrenciesIds = watchlistCurrencies.map(
      (currency) => currency.currency_id,
    )

    const watchlist = await this.apiService.fetchManyByIds(
      watchlistCurrenciesIds,
    )

    return {
      watchlist,
    }
  }
}
