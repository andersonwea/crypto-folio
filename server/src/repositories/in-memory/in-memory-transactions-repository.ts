import { Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'
import { randomUUID } from 'crypto'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  private items: Transaction[] = []

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = {
      id: randomUUID(),
      type: data.type,
      value: data.value,
      amount: new Prisma.Decimal(data.amount.toString()),
      currency_id: data.currency_id,
      created_at: new Date(),
    }

    this.items.push(transaction)

    return transaction
  }

  async findManyByCurrencyId(currencyId: string, page: number) {
    const transactions = this.items.filter(
      (item) => item.currency_id === currencyId,
    )

    return transactions.slice((page - 1) * 7, page * 7)
  }

  async sumAmountByCurrencyId(currencyId: string) {
    const amountSum = this.items.reduce((sum, item) => {
      if (item.currency_id === currencyId) {
        sum += item.amount.toNumber()
      }

      return sum
    }, 0)

    return amountSum
  }
}
