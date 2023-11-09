import { ApiCurrency, ApiService } from '@/adapters/api-service'
import { CryptocurrenciesRepository } from '@/repositories/cryptocurrencies-repository'
import { Cryptocurrency } from '@prisma/client'

interface SearchCryptocurrenciesUseCaseRequest {
  search: string
}

interface SearchCryptocurrenciesUseCaseResponse {
  currencies: ApiCurrency[]
}

export class SearchCryptocurrenciesUseCase {
  constructor(
    private cryptocurrenciesRepository: CryptocurrenciesRepository,
    private apiService: ApiService,
  ) {}

  async execute({
    search,
  }: SearchCryptocurrenciesUseCaseRequest): Promise<SearchCryptocurrenciesUseCaseResponse> {
    const cryptocurrencies =
      await this.cryptocurrenciesRepository.findMany(search)

    const cryptocurrenciesIds = cryptocurrencies.map(
      (cryptocurrency) => cryptocurrency.id,
    )

    const currencies = await this.apiService.fetchManyByIds(cryptocurrenciesIds)

    return {
      currencies,
    }
  }
}
