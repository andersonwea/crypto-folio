import { ApiCurrency, ApiService } from '@/adapters/api-service'
import { CurrenciesRepository } from '@/repositories/currencies-repository'

interface FetchUserCurrenciesRequest {
  userId: string
}

interface FetchUserCurrenciesResponse {
  userApiCurrencies: ApiCurrency[]
}

export class FetchUserCurrenciesUseCase {
  constructor(
    private currenciesRepository: CurrenciesRepository,
    private apiService: ApiService,
  ) {}

  async execute({
    userId,
  }: FetchUserCurrenciesRequest): Promise<FetchUserCurrenciesResponse> {
    const userCurrencies =
      await this.currenciesRepository.findManyByUserId(userId)

    const userCryptocurrenciesIds = userCurrencies.map(
      (currencies) => currencies.cryptocurrency_id,
    )

    let userApiCurrencies: ApiCurrency[] = []

    if (userCryptocurrenciesIds.length === 1) {
      const currencyId = Number(userCryptocurrenciesIds.toString())

      const userCurrency = await this.apiService.fetchById(currencyId)

      userApiCurrencies.push(userCurrency)
    } else {
      userApiCurrencies = await this.apiService.fetchManyByIds(
        userCryptocurrenciesIds,
      )
    }

    return {
      userApiCurrencies,
    }
  }
}
