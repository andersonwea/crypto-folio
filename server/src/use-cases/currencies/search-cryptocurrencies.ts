import { CryptocurrenciesRepository } from '@/repositories/cryptocurrencies-repository'
import { Cryptocurrency } from '@prisma/client'

interface SearchCryptocurrenciesUseCaseRequest {
  search: string
}

interface SearchCryptocurrenciesUseCaseResponse {
  cryptocurrencies: Cryptocurrency[]
}

export class SearchCryptocurrenciesUseCase {
  constructor(private cryptocurrenciesRepository: CryptocurrenciesRepository) {}

  async execute({
    search,
  }: SearchCryptocurrenciesUseCaseRequest): Promise<SearchCryptocurrenciesUseCaseResponse> {
    const cryptocurrencies =
      await this.cryptocurrenciesRepository.findMany(search)

    return {
      cryptocurrencies,
    }
  }
}
