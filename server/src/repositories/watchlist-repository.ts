import { Prisma, Watchlist } from '@prisma/client'

interface WatchlistWithTotal {
  watchlist: Watchlist[]
  totalItems: number
}

export interface WatchlistRepository {
  create(data: Prisma.WatchlistUncheckedCreateInput): Promise<Watchlist>
  findbyUserIdAndCurrencyId(
    currencyId: number,
    userId: string,
  ): Promise<Watchlist | null>
  delete(id: string): Promise<void>
  findManyByUserId(userId: string, page: number): Promise<WatchlistWithTotal>
}
