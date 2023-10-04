import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { PrismaCurrenciesRepository } from '@/repositories/prisma/prisma-currencies-repository'
import { FetchUserCurrenciesUseCase } from '@/use-cases/currencies/fetch-user-currencies'

export function makeFetchUserCurrenciesUseCase() {
  const currenciesRepository = new PrismaCurrenciesRepository()
  const apiService = new AxiosApiService()
  const fetchUserCurrenciesUseCase = new FetchUserCurrenciesUseCase(
    currenciesRepository,
    apiService,
  )

  return fetchUserCurrenciesUseCase
}
