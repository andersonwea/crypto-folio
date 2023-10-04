import { ApiService, ApiCurrency } from '@/adapters/api-service'

interface FetchApiCurrenciesUseCaseRequest {
  page: number
}

interface FetchApiCurrenciesUseCaseResponse {
  currencies: ApiCurrency[]
}

export class FetchApiCurrenciesUseCase {
  constructor(private apiService: ApiService) {}

  async execute({
    page,
  }: FetchApiCurrenciesUseCaseRequest): Promise<FetchApiCurrenciesUseCaseResponse> {
    const currencies = await this.apiService.fetchMany(page)

    return {
      currencies,
    }
  }
}
