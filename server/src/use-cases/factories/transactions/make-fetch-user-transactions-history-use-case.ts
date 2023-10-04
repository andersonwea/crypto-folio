import { PrismaCurrenciesRepository } from '@/repositories/prisma/prisma-currencies-repository'
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { FetchUserTransactionsHistoryUseCase } from '@/use-cases/transactions/fetch-user-transactions-history'

export function makeFetchUserTransactionsHistoryUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const currenciesRepository = new PrismaCurrenciesRepository()
  const fetchUserTransactionsHistoryUseCase =
    new FetchUserTransactionsHistoryUseCase(
      currenciesRepository,
      transactionsRepository,
    )

  return fetchUserTransactionsHistoryUseCase
}
