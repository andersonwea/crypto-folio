import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { Currency } from '@prisma/client'

interface CreateCurrencyUseCaseRequest {
  cryptocurrencyId: number
  name: string
  symbol: string
  image: string
  amount: number
  userId: string
}

interface CreateCurrencyUseCaseResponse {
  currency: Currency
}

export class CreateCurrencyUseCase {
  constructor(private currenciesRespository: CurrenciesRepository) {}

  async execute({
    cryptocurrencyId,
    name,
    symbol,
    image,
    amount,
    userId,
  }: CreateCurrencyUseCaseRequest): Promise<CreateCurrencyUseCaseResponse> {
    const isCurrencyAreadyExists =
      await this.currenciesRespository.findByCryptocurrencyIdAndUserId(
        cryptocurrencyId,
        userId,
      )

    if (isCurrencyAreadyExists) {
      return {
        currency: isCurrencyAreadyExists,
      }
    }

    const currency = await this.currenciesRespository.create({
      cryptocurrency_id: cryptocurrencyId,
      name,
      image,
      symbol,
      amount,
      user_id: userId,
    })

    return {
      currency,
    }
  }
}
