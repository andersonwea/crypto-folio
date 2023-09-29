import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { string } from 'zod'
import { calculateUserCurrenciesPrice } from '@/utils/calculate-user-currencies-price'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  totalInvested: number
  totalBalance: number
  profitOrLoss: number
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

    const { userCurrenciesActualPrice } = calculateUserCurrenciesPrice(
      userApiCurrencies,
      userCurrenciesWithTransactions,
    )

    const totalBalance = userCurrenciesActualPrice.reduce(
      (total, actualPrice) => {
        return (total += actualPrice.price)
      },
      0,
    )

    const profitOrLoss = totalBalance / totalInvested - 1

    return {
      totalInvested,
      totalBalance,
      profitOrLoss,
    }
  }
}
