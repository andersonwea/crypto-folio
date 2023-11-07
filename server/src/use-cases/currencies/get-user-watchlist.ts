import { ApiCurrency, ApiService } from '@/adapters/api-service'
import { WatchlistRepository } from '@/repositories/watchlist-repository'

interface GetUserWatchListUseCaseRequest {
  userId: string
  page: number
}

interface GetUserWatchListUseCaseResponse {
  watchlist: ApiCurrency[]
  totalItems: number
}

export class GetUserWatchlistUseCase {
  constructor(
    private watchlistRepository: WatchlistRepository,
    private apiService: ApiService,
  ) {}

  async execute({
    userId,
    page,
  }: GetUserWatchListUseCaseRequest): Promise<GetUserWatchListUseCaseResponse> {
    const { totalItems, watchlist: watchlistCurrencies } =
      await this.watchlistRepository.findManyByUserId(userId, page)

    const watchlistCurrenciesIds = watchlistCurrencies.map(
      (currency) => currency.currency_id,
    )

    const watchlist = await this.apiService.fetchManyByIds(
      watchlistCurrenciesIds,
    )

    return {
      watchlist,
      totalItems,
    }
  }
}
