import { Prisma, Transaction } from '@prisma/client'

export interface TransactionsRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
  findManyByCurrencyId(currencyId: string, page: number): Promise<Transaction[]>
  sumAmountByCurrencyId(currencyId: string): Promise<number>
}
