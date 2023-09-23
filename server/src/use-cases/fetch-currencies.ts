import { ApiService, Currency } from '@/adapters/api-service'

interface FetchCurrenciesUseCaseRequest {
  page: number
}

interface FetchCurrenciesUseCaseResponse {
  currencies: Currency[]
}

export class FetchCurrencies {
  constructor(private apiService: ApiService) {}

  async execute({
    page,
  }: FetchCurrenciesUseCaseRequest): Promise<FetchCurrenciesUseCaseResponse> {
    const currencies = await this.apiService.fetchMany(page)

    return {
      currencies,
    }
  }
}
