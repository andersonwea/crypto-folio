import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Currency } from '@prisma/client'

interface UpdateUserCurrencyAmountUseCaseRequest {
  userCurrencyId: string
}

interface UpdateUserCurrencyAmountUseCaseResponse {
  userCurrency: Currency
}

export class UpdateUserCurrencyAmountUseCase {
  constructor(
    private currenciesRepository: CurrenciesRepository,
    private transactionsRepository: TransactionsRepository,
  ) {}

  async execute({
    userCurrencyId,
  }: UpdateUserCurrencyAmountUseCaseRequest): Promise<UpdateUserCurrencyAmountUseCaseResponse> {
    const userCurrencyAmountSum =
      await this.transactionsRepository.sumAmountByCurrencyId(userCurrencyId)

    const userCurrency = await this.currenciesRepository.save(
      userCurrencyId,
      userCurrencyAmountSum,
    )

    return {
      userCurrency,
    }
  }
}
