import { Prisma, Transaction } from '@prisma/client'
import { SumAmount, TransactionsRepository } from '../transactions-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({
      data,
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

  async findManyByCurrencyId(currencyId: string, page: number) {
    const transactions = await prisma.transaction.findMany({
      where: {
        currency_id: currencyId,
      },
      take: 7,
      skip: (page - 1) * 7,
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
