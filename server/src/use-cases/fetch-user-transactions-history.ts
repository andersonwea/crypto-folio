import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface FetchUserTransactionsHistoryRequest {
  userId: string
  page: number
}

interface FetchUserTransactionsHistoryResponse {
  transactions: Transaction[]
}

export class FetchUserTransactionsHistoryUseCase {
  constructor(
    private currenciesRepository: CurrenciesRepository,
    private transactionsRepository: TransactionsRepository,
  ) {}

  async execute({
    userId,
    page,
  }: FetchUserTransactionsHistoryRequest): Promise<FetchUserTransactionsHistoryResponse> {
    const currencies = await this.currenciesRepository.findManyByUserId(userId)

    const transactionsByCurrency = await Promise.all(
      currencies.map((currency) =>
        this.transactionsRepository.findManyByCurrencyId(currency.id, page),
      ),
    )

    const transactions = transactionsByCurrency.reduce(
      (transactions, currencyTransaction) => {
        currencyTransaction.map((transaction) => transactions.push(transaction))

        return transactions
      },
      [],
    )

    return {
      transactions,
    }
  }
}
