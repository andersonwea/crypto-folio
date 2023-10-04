import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { FetchApiCurrenciesUseCase } from '@/use-cases/currencies/fetch-api-currencies'

export function makeFetchApiCurrenciesUseCase() {
  const apiService = new AxiosApiService()
  const fetchApiCurrenciesUseCase = new FetchApiCurrenciesUseCase(apiService)

  return fetchApiCurrenciesUseCase
}
