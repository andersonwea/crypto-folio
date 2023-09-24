import { ApiService, Currency } from '@/adapters/api-service'

interface FetchCurrencyUseCaseRequest {
  id: number
}

interface FetchCurrencyUseCaseResponse {
  currency: Currency
}

export class FetchCurrency {
  constructor(private apiService: ApiService) {}

  async execute({
    id,
  }: FetchCurrencyUseCaseRequest): Promise<FetchCurrencyUseCaseResponse> {
    const currency = await this.apiService.fetchById(id)

    return {
      currency,
    }
  }
}
