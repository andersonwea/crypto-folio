import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateTransactionUseCaseRequest {
  type: 'buy' | 'sell'
  value: number
  amount: number
  currencyId: number
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: TransactionsRepository,
    private currenciesRepository: CurrenciesRepository,
  ) {}

  async execute({
    type,
    value,
    amount,
    currencyId,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const currency = await this.currenciesRepository.findById(currencyId)

    if (!currency) {
      throw new ResourceNotFoundError()
    }

    const transaction = await this.transactionRepository.create({
      type,
      value,
      amount,
      currency_id: currencyId,
    })

    return {
      transaction,
    }
  }
}
