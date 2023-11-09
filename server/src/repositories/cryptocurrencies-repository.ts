import { Cryptocurrency, Prisma } from '@prisma/client'

export interface CryptocurrenciesRepository {
  create(data: Prisma.CryptocurrencyCreateInput): Promise<Cryptocurrency>
  findMany(search: string): Promise<Cryptocurrency[]>
}
