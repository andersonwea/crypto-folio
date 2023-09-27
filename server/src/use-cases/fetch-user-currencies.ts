import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { Currency } from '@prisma/client'

interface FetchUserCurrenciesRequest {
  userId: string
  search?: string
}

interface FetchUserCurrenciesResponse {
  userCurrencies: Currency[]
}

export class FetchUserCurrenciesUseCase {
  constructor(private currenciesRepository: CurrenciesRepository) {}

  async execute({
    userId,
    search,
  }: FetchUserCurrenciesRequest): Promise<FetchUserCurrenciesResponse> {
    const userCurrencies = await this.currenciesRepository.findManyByUserId(
      userId,
      search,
    )

    return {
      userCurrencies,
    }
  }
}
