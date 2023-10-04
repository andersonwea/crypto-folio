import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { EditTransactionUseCase } from '@/use-cases/transactions/edit-transaction'

export function makeEditTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const editTransactionUseCase = new EditTransactionUseCase(
    transactionsRepository,
  )

  return editTransactionUseCase
}
