import { PrismaCryptocurrenciesRepository } from '@/repositories/prisma/prisma-cryptocurrencies-repository'
import { SearchCryptocurrenciesUseCase } from '@/use-cases/currencies/search-cryptocurrencies'

export function makeSearchCryptocurrenciesUseCase() {
  const cryptocurrenciesRespository = new PrismaCryptocurrenciesRepository()
  const searchCryptocurrenciesUseCase = new SearchCryptocurrenciesUseCase(
    cryptocurrenciesRespository,
  )

  return searchCryptocurrenciesUseCase
}
