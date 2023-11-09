import { prisma } from '@/lib/prisma'
import { CryptocurrenciesRepository } from '../cryptocurrencies-repository'
import { Prisma } from '@prisma/client'

export class PrismaCryptocurrenciesRepository
  implements CryptocurrenciesRepository
{
  async create(data: Prisma.CryptocurrencyCreateInput) {
    const cryptocurrency = await prisma.cryptocurrency.create({
      data,
    })

    return cryptocurrency
  }

  async findMany(search: string) {
    const cryptocurrencies = await prisma.cryptocurrency.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    })

    return cryptocurrencies
  }
}
