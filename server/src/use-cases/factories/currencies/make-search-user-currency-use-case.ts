import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { PrismaCurrenciesRepository } from '@/repositories/prisma/prisma-currencies-repository'
import { SearchUserCurrencyUseCase } from '@/use-cases/currencies/search-user-currency'

export function makeSearchUserCurrencyUseCase() {
  const currenciesRepository = new PrismaCurrenciesRepository()
  const apiService = new AxiosApiService()
  const searchUserCurrencyUseCase = new SearchUserCurrencyUseCase(
    apiService,
    currenciesRepository,
  )

  return searchUserCurrencyUseCase
}
