import { Prisma } from '@prisma/client'
import { CurrenciesRepository } from '../currencies-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCurrenciesRepository implements CurrenciesRepository {
  async create(data: Prisma.CurrencyUncheckedCreateInput) {
    const currency = await prisma.currency.create({
      data,
    })

    return currency
  }

  async save(currendyId: string, amount: number) {
    const currency = await prisma.currency.update({
      data: {
        amount,
      },
      where: {
        id: currendyId,
      },
    })

    return currency
  }

  async findById(id: string) {
    const currency = await prisma.currency.findUnique({
      where: {
        id,
      },
    })

    return currency
  }

  async findByCryptocurrencyIdAndUserId(
    cryptocurrencyId: number,
    userId: string,
  ) {
    const currency = await prisma.currency.findFirst({
      where: {
        cryptocurrency_id: cryptocurrencyId,
        user_id: userId,
      },
    })

    return currency
  }

  async findByIdWithTransactions(id: string) {
    const currency = await prisma.currency.findUnique({
      where: {
        id,
      },
      include: {
        transactions: true,
      },
    })

    return currency
  }

  async findManyWithTransactionsOnUserId(userId: string) {
    const currencies = await prisma.currency.findMany({
      where: {
        user_id: userId,
      },
      include: {
        transactions: true,
      },
    })

    return currencies
  }

  async findManyByUserId(userId: string, query?: string | undefined) {
    let currencies

    if (query) {
      currencies = await prisma.currency.findMany({
        where: {
          user_id: userId,
          name: {
            contains: query,
          },
        },
      })
    } else {
      currencies = await prisma.currency.findMany({
        where: {
          user_id: userId,
        },
      })
    }

    return currencies
  }
}
