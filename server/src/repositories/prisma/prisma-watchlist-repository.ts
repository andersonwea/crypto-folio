import { Prisma } from '@prisma/client'
import { WatchlistRepository } from '../watchlist-repository'
import { prisma } from '@/lib/prisma'

export class PrismaWatchlistRepository implements WatchlistRepository {
  async findManyByUserId(userId: string, page: number) {
    const watchlist = await prisma.watchlist.findMany({
      where: {
        user_id: userId,
      },
      take: 7,
      skip: (page - 1) * 7,
    })

    const totalItems = await prisma.watchlist.count({
      where: {
        user_id: userId,
      },
    })

    return { watchlist, totalItems }
  }

  async create(data: Prisma.WatchlistUncheckedCreateInput) {
    const watchlist = await prisma.watchlist.create({
      data,
    })

    return watchlist
  }

  async findbyUserIdAndCurrencyId(currencyId: number, userId: string) {
    const watchlist = await prisma.watchlist.findFirst({
      where: {
        currency_id: currencyId,
        user_id: userId,
      },
    })

    return watchlist
  }

  async delete(id: string) {
    await prisma.watchlist.delete({
      where: {
        id,
      },
    })
  }
}
