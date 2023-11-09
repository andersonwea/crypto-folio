import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { PrismaCryptocurrenciesRepository } from '@/repositories/prisma/prisma-cryptocurrencies-repository'
import { SearchCryptocurrenciesUseCase } from '@/use-cases/currencies/search-cryptocurrencies'

export function makeSearchCryptocurrenciesUseCase() {
  const cryptocurrenciesRespository = new PrismaCryptocurrenciesRepository()
  const apiService = new AxiosApiService()
  const searchCryptocurrenciesUseCase = new SearchCryptocurrenciesUseCase(
    cryptocurrenciesRespository,
    apiService,
  )

  return searchCryptocurrenciesUseCase
}
