import { ApiService, ApiCurrency } from '@/adapters/api-service'
import { CurrenciesRepository } from '@/repositories/currencies-repository'

interface SearchUserCurrencyUseCaseRequest {
  userId: string
  query: string
}

interface SearchUserCurrencyUseCaseResponse {
  userApiCurrency: ApiCurrency
}

export class SearchUserCurrencyUseCase {
  constructor(
    private apiService: ApiService,
    private currenciesRepository: CurrenciesRepository,
  ) {}

  async execute({
    userId,
    query,
  }: SearchUserCurrencyUseCaseRequest): Promise<SearchUserCurrencyUseCaseResponse> {
    const userCurrency = await this.currenciesRepository.findManyByUserId(
      userId,
      query,
    )

    const userApiCurrency = await this.apiService.fetchById(
      userCurrency[0].cryptocurrency_id,
    )

    return {
      userApiCurrency,
    }
  }
}
