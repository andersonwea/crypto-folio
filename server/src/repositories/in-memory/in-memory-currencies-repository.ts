import { Currency, Prisma, Transaction } from '@prisma/client'
import { CurrenciesRepository } from '../currencies-repository'
import { randomUUID } from 'crypto'

export class InMemoryCurrenciesRepository implements CurrenciesRepository {
  private currencies: Currency[] = []
  private transactions: Transaction[] = []

  async create(data: Prisma.CurrencyUncheckedCreateInput) {
    const currency = {
      id: randomUUID(),
      cryptocurrency_id: data.cryptocurrency_id,
      name: data.name,
      slug: data.slug,
      symbol: data.symbol,
      amount: new Prisma.Decimal(data.amount.toString()),
      user_id: data.user_id,
    }

    this.currencies.push(currency)

    return currency
  }

  async save(currencyId: string, amount: number) {
    const currencyIndex = this.currencies.findIndex(
      (currency) => currency.id === currencyId,
    )

    if (currencyIndex >= 0) {
      this.currencies[currencyIndex].amount = new Prisma.Decimal(amount)
    }

    return this.currencies[currencyIndex]
  }

  async findById(id: string) {
    const currency = this.currencies.find((currency) => currency.id === id)

    if (!currency) {
      return null
    }

    return currency
  }

  async findByCryptocurrencyIdAndUserId(
    cryptocurrencyId: number,
    userId: string,
  ) {
    const currency = this.currencies.find(
      (currency) =>
        currency.cryptocurrency_id === cryptocurrencyId &&
        currency.user_id === userId,
    )

    if (!currency) {
      return null
    }

    return currency
  }

  async findByIdWithTransactions(id: string, page: number) {
    const currency = this.currencies.find((item) => item.id === id)

    if (!currency) {
      return null
    }

    const transactions = this.transactions
      .filter((transaction) => transaction.currency_id === id)
      .slice((page - 1) * 7, page * 7)

    return {
      ...currency,
      transactions,
    }
  }

  async findManyByUserId(userId: string, query?: string) {
    let currencies: Currency[] = []

    if (query) {
      currencies = this.currencies.filter(
        (item) => item.user_id === userId && item.slug.includes(query),
      )
    } else {
      currencies = this.currencies.filter((item) => item.user_id === userId)
    }

    return currencies
  }
}
