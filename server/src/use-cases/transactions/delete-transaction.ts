import { TransactionsRepository } from '@/repositories/transactions-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteTransactionUseCaseRequest {
  transactionId: string
}

export class DeleteTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    transactionId,
  }: DeleteTransactionUseCaseRequest): Promise<void> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)

    if (!transaction) {
      throw new ResourceNotFoundError()
    }

    await this.transactionsRepository.deleteById(transactionId)
  }
}
