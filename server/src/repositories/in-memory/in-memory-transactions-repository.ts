import { Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'
import { randomUUID } from 'crypto'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  private items: Transaction[] = []

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const amount = data.type === 'buy' ? data.amount : Number(data.amount) * -1
    const value = data.type === 'buy' ? data.value : Number(data.value) * -1

    const transaction = {
      id: randomUUID(),
      type: data.type,
      value,
      amount: new Prisma.Decimal(amount.toString()),
      currency_id: data.currency_id,
      created_at: new Date(),
    }

    this.items.push(transaction)

    return transaction
  }

  async save(transaction: Transaction) {
    const transactionIndex = this.items.findIndex(
      (item) => item.id === transaction.id,
    )

    if (transactionIndex >= 0) {
      this.items[transactionIndex] = transaction
    }

    return transaction
  }

  async findById(id: string) {
    const transaction = this.items.find((item) => item.id === id)

    if (!transaction) {
      return null
    }

    return transaction
  }

  async deleteById(id: string) {
    const transactionIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(transactionIndex, 1)
  }

  async findManyByCurrencyId(currencyId: string, page: number) {
    const transactions = this.items.filter(
      (item) => item.currency_id === currencyId,
    )

    return transactions.slice((page - 1) * 7, page * 7)
  }

  async sumAmountByCurrencyId(currencyId: string) {
    const sum = this.items.reduce((sum, item) => {
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
