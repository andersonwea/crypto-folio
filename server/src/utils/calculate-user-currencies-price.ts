import { ApiCurrency } from '@/adapters/api-service'
import { CurrencyWithTransactions } from '@/repositories/currencies-repository'

interface UserCurrencyPrice {
  id: string
  price: number
}

export function calculateUserCurrenciesPrice(
  userApiCurrencies: ApiCurrency[],
  userCurrenciesWithTransactions: CurrencyWithTransactions[],
) {
  const userCurrenciesActualPrice = userCurrenciesWithTransactions.reduce(
    (acc, userCurrency) => {
      for (const userApiCurrency of userApiCurrencies) {
        if (userApiCurrency.id === userCurrency.cryptocurrency_id) {
          const currencyValue =
            userApiCurrency.values.price * userCurrency.amount.toNumber()

          acc.push({
            id: userCurrency.id,
            price: currencyValue,
          })
        }
      }

      return acc
    },
    [] as UserCurrencyPrice[],
  )

  return { userCurrenciesActualPrice }
}
