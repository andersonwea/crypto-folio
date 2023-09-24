import { Currency, Prisma } from '@prisma/client'

export interface CurrenciesRepository {
  create(data: Prisma.CurrencyUncheckedCreateInput): Promise<Currency>
  findById(id: number): Promise<Currency | null>
}
