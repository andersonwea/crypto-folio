import { PrismaCurrenciesRepository } from '@/repositories/prisma/prisma-currencies-repository'
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { CreateTransactionUseCase } from '@/use-cases/transactions/create-transaction'

export function makeCreateTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const currenciesRepository = new PrismaCurrenciesRepository()
  const createTransactionUseCase = new CreateTransactionUseCase(
    transactionsRepository,
    currenciesRepository,
  )

  return createTransactionUseCase
}
