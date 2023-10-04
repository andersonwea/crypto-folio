import { PrismaCurrenciesRepository } from '@/repositories/prisma/prisma-currencies-repository'
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { UpdateUserCurrencyAmountUseCase } from '@/use-cases/currencies/update-user-currency-amount'

export function makeUpdateUserCurrencyAmountUseCase() {
  const currenciesRepository = new PrismaCurrenciesRepository()
  const transactionsRepository = new PrismaTransactionsRepository()
  const updateUserCurrencyAmountUseCase = new UpdateUserCurrencyAmountUseCase(
    currenciesRepository,
    transactionsRepository,
  )

  return updateUserCurrencyAmountUseCase
}
