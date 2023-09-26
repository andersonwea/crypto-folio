import { Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'
import { randomUUID } from 'crypto'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  private items: Transaction[] = []

  async findManyByCurrencyId(currencyId: string, page: number) {
    const transactions = this.items.filter(
      (item) => item.currency_id === currencyId,
    )

    return transactions.slice((page - 1) * 7, page * 7)
  }

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
}
