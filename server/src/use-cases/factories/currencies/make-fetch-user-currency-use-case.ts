import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { PrismaCurrenciesRepository } from '@/repositories/prisma/prisma-currencies-repository'
import { FetchUserCurrencyUseCase } from '@/use-cases/currencies/fetch-user-currency'

export function makeFetchUserCurrencyUseCase() {
  const currenciesRepository = new PrismaCurrenciesRepository()
  const apiService = new AxiosApiService()
  const fetchUserCurrencyUseCase = new FetchUserCurrencyUseCase(
    currenciesRepository,
    apiService,
  )

  return fetchUserCurrencyUseCase
}
