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
      name: data.name.toLowerCase(),
      symbol: data.symbol,
      image: data.images['60x60'],
      values: data.values.USD,
      maxSupply: data.totalSupply,
      circulatingSupply: data.circulatingSupply,
    }

    return currency
  }

  async fetchMany(page?: number, query?: string) {
    const {
      data: { data },
    } = await this.api.get(`/currencies?optionalFields=images`)

    const currencies: ApiCurrency[] = data.map((currency: any) => {
      return {
        id: currency.id,
        rank: currency.rank,
        name: currency.name.toLowerCase(),
        symbol: currency.symbol,
        image: currency.images['60x60'],
        values: currency.values.USD,
        maxSupply: currency.maxSupply,
        circulatingSupply: currency.circulatingSupply,
      }
    })

    if (page) {
      return currencies.slice((page - 1) * 7, page * 7)
    }

    if (query) {
      return currencies.filter((currency) =>
        currency.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
    }

    return currencies
  }

  async fetchManyByIds(ids: number[]) {
    const {
      data: { data },
    } = await this.api.get(
      `/currencies?optionalFields=images&ids=${ids.toString()}`,
    )

    const currencies: ApiCurrency[] = data.map((currency: any) => {
      return {
        id: currency.id,
        rank: currency.rank,
        name: currency.name.toLowerCase(),
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
