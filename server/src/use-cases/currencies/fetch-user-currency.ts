import {
  CurrenciesRepository,
  CurrencyWithTransactions,
} from '@/repositories/currencies-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { calculateUserCurrenciesBalance } from '@/utils/calculate-user-currencies-balance'
import { ApiService } from '@/adapters/api-service'

export interface UserCurrencyWithBalance extends CurrencyWithTransactions {
  balance: number
}

interface FetchUserCurrencyUseCaseRequest {
  currencyId: string
}

interface FetchUserCurrencyUseCaseResponse {
  userCurrencyWithBalance: UserCurrencyWithBalance
}

export class FetchUserCurrencyUseCase {
  constructor(
    private currenciesRepository: CurrenciesRepository,
    private apiService: ApiService,
  ) {}

  async execute({
    currencyId,
  }: FetchUserCurrencyUseCaseRequest): Promise<FetchUserCurrencyUseCaseResponse> {
    const userCurrency =
      await this.currenciesRepository.findByIdWithTransactions(currencyId)

    if (!userCurrency) {
      throw new ResourceNotFoundError()
    }

    const userApiCurrency = await this.apiService.fetchById(
      userCurrency.cryptocurrency_id,
    )

    const { userCurrenciesWithBalance } = calculateUserCurrenciesBalance(
      [userApiCurrency],
      [userCurrency],
    )

    const [userCurrencyWithBalance] = userCurrenciesWithBalance

    return {
      userCurrencyWithBalance,
    }
  }
}
