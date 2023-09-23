import { ApiService } from '@/adapters/api-service'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchCurrencies } from './fetch-currencies'
import { AxiosApiService } from '@/adapters/axios/axios-api-service'

describe('Fetch Currenties Use Case', () => {
  let apiService: ApiService
  let sut: FetchCurrencies

  beforeEach(() => {
    apiService = new AxiosApiService()
    sut = new FetchCurrencies(apiService)
  })

  it('should be able to fetch pagineted currencies', async () => {
    const currencies = await sut.execute({
      page: 1,
    })

    expect(currencies).toHaveLength(7)
  })
})
