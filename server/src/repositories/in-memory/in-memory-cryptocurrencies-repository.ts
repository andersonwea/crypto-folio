import { Cryptocurrency, Prisma } from '@prisma/client'
import { CryptocurrenciesRepository } from '../cryptocurrencies-repository'

export class InMemoryCryptocurrenciesRepository
  implements CryptocurrenciesRepository
{
  public items: Cryptocurrency[] = []

  async create(data: Prisma.CryptocurrencyCreateInput) {
    const cryptocurrency = {
      ...data,
    }

    this.items.push(cryptocurrency)

    return cryptocurrency
  }

  async findMany(search: string) {
    const cryptocurrencies = this.items.filter((cryptocurrency) =>
      cryptocurrency.name.includes(search),
    )

    return cryptocurrencies
  }
}
