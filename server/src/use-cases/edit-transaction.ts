import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Prisma, Transaction } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditTransactionUseCaseRequest {
  transactionId: string
  value: number
  amount: number
  createdAt: Date
}

interface EditTransactionUseCaseResponse {
  editedTransaction: Transaction
}

export class EditTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    transactionId,
    value,
    amount,
    createdAt,
  }: EditTransactionUseCaseRequest): Promise<EditTransactionUseCaseResponse> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)

    if (!transaction) {
      throw new ResourceNotFoundError()
    }

    transaction.amount = new Prisma.Decimal(amount)
    transaction.created_at = createdAt
    transaction.value = value

    const editedTransaction =
      await this.transactionsRepository.save(transaction)

    return {
      editedTransaction,
    }
  }
}
