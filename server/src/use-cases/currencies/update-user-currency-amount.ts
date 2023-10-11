import { CurrenciesRepository } from '@/repositories/currencies-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Currency } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

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
    const currency = this.currenciesRepository.findById(currencyId)

    if (!currency) {
      throw new ResourceNotFoundError()
    }

    const { sum } =
      await this.transactionsRepository.sumAmountByCurrencyId(currencyId)
    const userCurrency = await this.currenciesRepository.save(currencyId, sum)

    return {
      userCurrency,
    }
  }
}
