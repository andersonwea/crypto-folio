import { PrismaCurrenciesRepository } from '@/repositories/prisma/prisma-currencies-repository'
import { CreateCurrencyUseCase } from '@/use-cases/currencies/create-currency'

export function makeCreateCurrencyUseCase() {
  const currenciesRepository = new PrismaCurrenciesRepository()
  const createCurrencyUseCase = new CreateCurrencyUseCase(currenciesRepository)

  return createCurrencyUseCase
}
