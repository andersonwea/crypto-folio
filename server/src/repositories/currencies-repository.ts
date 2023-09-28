import { Currency, Prisma, Transaction } from '@prisma/client'

export interface CurrencyWithTransactions extends Currency {
  transactions: Transaction[]
}

export interface CurrenciesRepository {
  create(data: Prisma.CurrencyUncheckedCreateInput): Promise<Currency>
  save(currendyId: string, amount: number): Promise<Currency>
  findById(id: string): Promise<Currency | null>
  findByCryptocurrencyIdAndUserId(
    cryptocurrencyId: number,
    userId: string,
  ): Promise<Currency | null>
  findByIdWithTransactions(
    id: string,
    page: number,
  ): Promise<CurrencyWithTransactions | null>
  findManyByUserId(userId: string, query?: string): Promise<Currency[]>
}
