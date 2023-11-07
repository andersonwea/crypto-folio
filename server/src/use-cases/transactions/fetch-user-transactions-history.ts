import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface FetchUserTransactionsHistoryRequest {
  userId: string
  page: number
}

interface FetchUserTransactionsHistoryResponse {
  transactions: Transaction[]
  totalTransactions: number
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
    const currencies =
      await this.currenciesRepository.findManyWithTransactionsOnUserId(userId)

    const transactionsByCurrency = await Promise.all(
      currencies.map((currency) =>
        this.transactionsRepository.findManyByCurrencyId(currency.id),
      ),
    )

    const transactionsHistory = transactionsByCurrency.reduce(
      (transactions, currencyTransaction) => {
        currencyTransaction.map((transaction) => transactions.push(transaction))

        return transactions
      },
      [],
    )

    const transactions = transactionsHistory.slice((page - 1) * 7, page * 7)

    const totalTransactions = transactionsHistory.length

    return {
      transactions,
      totalTransactions,
    }
  }
}
