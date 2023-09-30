import { ApiService } from '@/adapters/api-service'
import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { calculateUserCurrenciesBalance } from '@/utils/calculate-user-currencies-balance'
import { UserCurrencyWithBalance } from './fetch-user-currency'

interface FetchUserCurrenciesRequest {
  userId: string
}

interface FetchUserCurrenciesResponse {
  userCurrenciesWithBalance: UserCurrencyWithBalance[]
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
      await this.currenciesRepository.findManyWithTransactionsOnUserId(userId)

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
