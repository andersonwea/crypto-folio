import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { Currency } from '@prisma/client'
import { ResourceAlreadyExitsError } from './errors/resource-already-exists-error'

interface CreateCurrencyUseCaseRequest {
  id: number
  name: string
  slug: string
  symbol: string
  amount: number
  userId: string
}

interface CreateCurrencyUseCaseResponse {
  currency: Currency
}

export class CreateCurrencyUseCase {
  constructor(private currenciesRespository: CurrenciesRepository) {}

  async execute({
    id,
    name,
    slug,
    symbol,
    amount,
    userId,
  }: CreateCurrencyUseCaseRequest): Promise<CreateCurrencyUseCaseResponse> {
    const isCurrencyAreadyExists = await this.currenciesRespository.findById(id)

    if (isCurrencyAreadyExists) {
      throw new ResourceAlreadyExitsError()
    }

    const currency = await this.currenciesRespository.create({
      id,
      name,
      slug,
      symbol,
      amount,
      user_id: userId,
    })

    return {
      currency,
    }
  }
}
