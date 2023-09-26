import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { Currency } from '@prisma/client'

interface FetchUserCurrenciesRequest {
  userId: string
}

interface FetchUserCurrenciesResponse {
  userCurrencies: Currency[]
}

export class FetchUserCurrenciesUseCase {
  constructor(private currenciesRepository: CurrenciesRepository) {}

  async execute({
    userId,
  }: FetchUserCurrenciesRequest): Promise<FetchUserCurrenciesResponse> {
    const userCurrencies =
      await this.currenciesRepository.findManyByUserId(userId)

    return {
      userCurrencies,
    }
  }
}
