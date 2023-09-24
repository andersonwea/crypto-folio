import { Prisma, $Enums, Transaction } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
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
}
