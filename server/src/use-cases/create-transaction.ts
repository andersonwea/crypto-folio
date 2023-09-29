import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InvalidTransactionError } from './errors/invalid-transaction-error'

interface CreateTransactionUseCaseRequest {
  type: 'buy' | 'sell'
  value: number
  amount: number
  currencyId: string
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

    if (type === 'sell' && currency.amount.toNumber() < amount) {
      throw new InvalidTransactionError()
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
