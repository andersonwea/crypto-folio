import { Currency, Prisma } from '@prisma/client'
import { CurrenciesRepository } from '../currencies-repository'

export class InMemoryCurrenciesRepository implements CurrenciesRepository {
  private items: Currency[] = []

  async create(data: Prisma.CurrencyUncheckedCreateInput) {
    const currency = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      symbol: data.symbol,
      amount: new Prisma.Decimal(data.amount.toString()),
      user_id: data.user_id,
    }

    this.items.push(currency)

    return currency
  }

  async findById(id: number) {
    const currency = this.items.find((item) => item.id === id)

    if (!currency) {
      return null
    }

    return currency
  }
}
