import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Currency } from '@prisma/client'

interface UpdateUserCurrencyAmountUseCaseRequest {
  currencyId: string
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
    currencyId,
  }: UpdateUserCurrencyAmountUseCaseRequest): Promise<UpdateUserCurrencyAmountUseCaseResponse> {
    const { sum } =
      await this.transactionsRepository.sumAmountByCurrencyId(currencyId)

    const userCurrency = await this.currenciesRepository.save(currencyId, sum)
    return {
      userCurrency,
    }
  }
}
