import { Prisma, Transaction } from '@prisma/client'

export interface SumAmount {
  sum: number
}

export interface TransactionsRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
  save(transaction: Transaction): Promise<Transaction>
  findById(id: string): Promise<Transaction | null>
  deleteById(id: string): Promise<void>
  findManyByCurrencyId(
    currencyId: string,
    page?: number,
  ): Promise<Transaction[]>
  sumAmountByCurrencyId(currencyId: string): Promise<SumAmount>
}
