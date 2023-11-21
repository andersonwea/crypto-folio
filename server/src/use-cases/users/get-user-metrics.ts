import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { calculateUserCurrenciesBalance } from '@/utils/calculate-user-currencies-balance'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  totalInvested: number
  totalBalance: number
  profitOrLoss: string
}

export class GetUserMetricsUseCase {
  constructor(
    private currenciesRepository: CurrenciesRepository,
    private apiService: AxiosApiService,
  ) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const userCurrenciesWithTransactions =
      await this.currenciesRepository.findManyWithTransactionsOnUserId(userId)

    const userTransactionsValues = userCurrenciesWithTransactions.map(
      (currency) => {
        const transactionsValues = currency.transactions.reduce(
          (acc, transaction) => {
            return (acc += transaction.value)
          },
          0,
        )

        return transactionsValues
      },
    )

    const totalInvestedInCents = userTransactionsValues.reduce((acc, value) => {
      return (acc += value)
    }, 0)

    const totalInvested = totalInvestedInCents / 100

    const userCryptocurrenciesIds = userCurrenciesWithTransactions.map(
      (currency) => currency.cryptocurrency_id,
    )

    const userApiCurrencies = await this.apiService.fetchManyByIds(
      userCryptocurrenciesIds,
    )

    const { userCurrenciesWithBalance } = calculateUserCurrenciesBalance(
      userApiCurrencies,
      userCurrenciesWithTransactions,
    )

    const totalBalance = userCurrenciesWithBalance.reduce(
      (total, currencyWithBalance) => {
        return (total += currencyWithBalance.balance)
      },
      0,
    )

    const profitOrLoss = ((totalBalance / totalInvested - 1) * 100).toFixed(2)

    return {
      totalInvested,
      totalBalance,
      profitOrLoss,
    }
  }
}
