import { ApiService, ApiCurrency } from '../api-service'
import axios, { AxiosInstance } from 'axios'
import { env } from '@/env'

export class AxiosApiService implements ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.cryptorank.io/v1/',
      params: {
        api_key: env.CRYPTO_RANK_API_KEY,
      },
    })
  }

  async fetchById(id: number): Promise<ApiCurrency> {
    const {
      data: { data },
    } = await this.api.get(`/currencies/${id}`)

    const currency: ApiCurrency = {
      id: data.id,
      rank: data.rank,
      name: data.name,
      symbol: data.symbol,
      image: data.images['60x60'],
      values: data.values.USD,
      maxSupply: data.maxSupply,
      circulatingSupply: data.circulatingSupply,
    }

    return currency
  }

  async fetchMany(page: number) {
    const {
      data: { data },
    } = await this.api.get(
      `/currencies?optionalFields=images&limit=7&offset=${(page - 1) * 7}`,
    )

    const currencies: ApiCurrency[] = data.map((currency: any) => {
      return {
        id: currency.id,
        rank: currency.rank,
        name: currency.name,
        symbol: currency.symbol,
        image: currency.images['60x60'],
        values: currency.values.USD,
        maxSupply: currency.maxSupply,
        circulatingSupply: currency.circulatingSupply,
      }
    })

    return currencies
  }
}
