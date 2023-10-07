import { ApiService } from '@/adapters/api-service'
import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { calculateUserCurrenciesBalance } from '@/utils/calculate-user-currencies-balance'
import { UserCurrencyWithBalance } from './fetch-user-currency'

interface SearchUserCurrencyUseCaseRequest {
  userId: string
  q: string
}

interface SearchUserCurrencyUseCaseResponse {
  userCurrenciesWithBalance: UserCurrencyWithBalance[]
}

export class SearchUserCurrencyUseCase {
  constructor(
    private apiService: ApiService,
    private currenciesRepository: CurrenciesRepository,
  ) {}

  async execute({
    userId,
    q,
  }: SearchUserCurrencyUseCaseRequest): Promise<SearchUserCurrencyUseCaseResponse> {
    const userCurrencies =
      await this.currenciesRepository.findManyWithTransactionsOnUserId(
        userId,
        q,
      )

    const userCryptocurrenciesIds = userCurrencies.map(
      (currency) => currency.cryptocurrency_id,
    )

    const userApiCurrencies = await this.apiService.fetchManyByIds(
      userCryptocurrenciesIds,
    )

    const { userCurrenciesWithBalance } = calculateUserCurrenciesBalance(
      userApiCurrencies,
      userCurrencies,
    )

    return {
      userCurrenciesWithBalance,
    }
  }
}
