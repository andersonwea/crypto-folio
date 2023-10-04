import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { FetchApiCurrencyUseCase } from '@/use-cases/currencies/fetch-api-currency'

export function makeFetchApiCurrencyUseCase() {
  const apiService = new AxiosApiService()
  const fetchApiCurrencyUseCase = new FetchApiCurrencyUseCase(apiService)

  return fetchApiCurrencyUseCase
}
