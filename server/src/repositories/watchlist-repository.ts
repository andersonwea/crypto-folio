import { Prisma, Watchlist } from '@prisma/client'

export interface WatchlistRepository {
  create(data: Prisma.WatchlistUncheckedCreateInput): Promise<Watchlist>
  findbyUserIdAndCurrencyId(
    currencyId: number,
    userId: string,
  ): Promise<Watchlist | null>
  delete(id: string): Promise<void>
  findManyByUserId(userId: string): Promise<Watchlist[]>
}
