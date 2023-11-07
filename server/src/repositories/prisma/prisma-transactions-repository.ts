import { Prisma, Transaction } from '@prisma/client'
import { SumAmount, TransactionsRepository } from '../transactions-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const amount = data.type === 'buy' ? data.amount : Number(data.amount) * -1
    const value = data.type === 'buy' ? data.value : Number(data.value) * -1

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type: data.type,
        value,
        created_at: data.created_at,
        currency_id: data.currency_id,
      },
    })

    return transaction
  }

  async save(data: Transaction) {
    const transaction = await prisma.transaction.update({
      data,
      where: {
        id: data.id,
      },
    })

    return transaction
  }

  async findById(id: string) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    })

    return transaction
  }

  async deleteById(id: string): Promise<void> {
    await prisma.transaction.delete({
      where: {
        id,
      },
    })
  }

  async findManyByCurrencyId(currencyId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        currency_id: currencyId,
      },
    })

    return transactions
  }

  async sumAmountByCurrencyId(currencyId: string) {
    const [sum] = await prisma.$queryRaw<SumAmount[]>`
      SELECT sum(amount) FROM transactions
      WHERE currency_id = ${currencyId}
    `
    return sum
  }
}
