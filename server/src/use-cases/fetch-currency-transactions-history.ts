import {
  CurrenciesRepository,
  CurrencyWithTransactions,
} from '@/repositories/currencies-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchCurrencyTransactionsHistoryRequest {
  currencyId: string
}

interface FetchCurrencyTransactionsHistoryResponse {
  currencyWithTransactions: CurrencyWithTransactions
}

export class FetchCurrencyTransactionsHistoryUseCase {
  constructor(private currenciesRepository: CurrenciesRepository) {}

  async execute({
    currencyId,
  }: FetchCurrencyTransactionsHistoryRequest): Promise<FetchCurrencyTransactionsHistoryResponse> {
    const currencyWithTransactions =
      await this.currenciesRepository.findByIdWithTransactions(currencyId)

    if (!currencyWithTransactions) {
      throw new ResourceNotFoundError()
    }

    return {
      currencyWithTransactions,
    }
  }
}
