import {
  CurrenciesRepository,
  CurrencyWithTransactions,
} from '@/repositories/currencies-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { calculateUserCurrenciesPrice } from '@/utils/calculate-user-currencies-price'
import { ApiService } from '@/adapters/api-service'

interface CurrencyWithBalance extends CurrencyWithTransactions {
  balance: number
}

interface FetchUserCurrencyUseCaseRequest {
  currencyId: string
}

interface FetchUserCurrencyUseCaseResponse {
  userCurrencyWithBalance: CurrencyWithBalance
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

    const { userCurrenciesActualPrice } = calculateUserCurrenciesPrice(
      [userApiCurrency],
      [userCurrency],
    )

    const balance =
      Number(userCurrency.amount) * userCurrenciesActualPrice[0].price

    const userCurrencyWithBalance = {
      ...userCurrency,
      balance,
    }

    return {
      userCurrencyWithBalance,
    }
  }
}
