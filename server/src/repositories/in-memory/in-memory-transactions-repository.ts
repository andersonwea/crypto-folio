import { Currency, Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'
import { randomUUID } from 'crypto'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  private transactions: Transaction[] = []
  private currencies: Currency[] = []

  async createCurrency(data: Prisma.CurrencyUncheckedCreateInput) {
    const currency = {
      id: data.id || 'currency-id',
      cryptocurrency_id: data.cryptocurrency_id,
      name: data.name,
      image: data.image,
      symbol: data.symbol,
      amount: new Prisma.Decimal(data.amount.toString()),
      user_id: data.user_id,
    }

    this.currencies.push(currency)

    return currency
  }

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const amount = data.type === 'buy' ? data.amount : Number(data.amount) * -1
    const value = data.type === 'buy' ? data.value : Number(data.value) * -1

    const transaction = {
      id: data.id || randomUUID(),
      type: data.type,
      value,
      amount: new Prisma.Decimal(amount.toString()),
      currency_id: data.currency_id,
      created_at: new Date(),
    }

    this.transactions.push(transaction)

    return transaction
  }

  async save(transaction: Transaction) {
    const transactionIndex = this.transactions.findIndex(
      (item) => item.id === transaction.id,
    )

    if (transactionIndex >= 0) {
      this.transactions[transactionIndex] = transaction
    }

    return transaction
  }

  async findById(id: string) {
    const transaction = this.transactions.find((item) => item.id === id)

    if (!transaction) {
      return null
    }

    return transaction
  }

  async deleteById(id: string) {
    const transactionIndex = this.transactions.findIndex(
      (item) => item.id === id,
    )

    this.transactions.splice(transactionIndex, 1)
  }

  async findManyByCurrencyId(currencyId: string, page?: number) {
    const transactions = this.transactions.filter(
      (item) => item.currency_id === currencyId,
    )

    if (page) {
      return transactions.slice((page - 1) * 7, page * 7)
    }

    return transactions
  }

  async sumAmountByCurrencyId(currencyId: string) {
    const sum = this.transactions.reduce((sum, item) => {
      if (item.currency_id === currencyId) {
        sum += item.amount.toNumber()
      }

      return sum
    }, 0)

    return {
      sum,
    }
  }
}
