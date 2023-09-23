import { api } from '@/lib/axios'
import { ApiService, Currency } from '../api-service'

export class AxiosApiService implements ApiService {
  async fetchMany(page: number) {
    const response = await api.get(
      `/currencies?optionalFields=images&limit=7&offset=${(page - 1) * 7}`,
    )

    const currencies: Currency[] = response.data.data.map((currency: any) => {
      return {
        id: currency.id,
        rank: currency.rank,
        name: currency.name,
        symbol: currency.symbol,
        image: currency.images['60x60'],
        values: currency.values,
        maxSupply: currency.maxSupply,
        circulatingSupply: currency.circulatingSupply,
      }
    })

    return currencies
  }
}
