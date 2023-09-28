type Values = {
  price: number
  marketCap: number
  volume24h: number
  high24h: number
  low24h: number
  percentChange24h: number
  percentChange7d: number
  percentChange30d: number
  percentChange3m: number
  percentChange6m: number
}

export interface ApiCurrency {
  id: number
  rank: number
  name: string
  symbol: string
  image: string
  values: Values
  maxSupply: number
  circulatingSupply: number
}

export interface ApiService {
  fetchMany(page: number): Promise<ApiCurrency[]>
  fetchById(id: number): Promise<ApiCurrency>
  fetchManyByIds(ids: number[]): Promise<ApiCurrency[]>
}
