import { ApiService, ApiCurrency } from '@/adapters/api-service'

interface FetchApiCurrencyUseCaseRequest {
  id: number
}

interface FetchApiCurrencyUseCaseResponse {
  currency: ApiCurrency
}

export class FetchApiCurrencyUseCase {
  constructor(private apiService: ApiService) {}

  async execute({
    id,
  }: FetchApiCurrencyUseCaseRequest): Promise<FetchApiCurrencyUseCaseResponse> {
    const currency = await this.apiService.fetchById(id)

    return {
      currency,
    }
  }
}
