import { Prisma, Transaction } from '@prisma/client'

export interface TransactionsRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
  findById(id: string): Promise<Transaction | null>
  deleteById(id: string): Promise<void>
  findManyByCurrencyId(currencyId: string, page: number): Promise<Transaction[]>
  sumAmountByCurrencyId(currencyId: string): Promise<number>
}
