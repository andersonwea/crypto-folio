import { ApiService } from '@/adapters/api-service'
import { beforeEach, describe, expect, it } from 'vitest'
import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { FetchApiCurrencyUseCase } from './fetch-api-currency'

describe('Fetch Currenties Use Case', () => {
  let apiService: ApiService
  let sut: FetchApiCurrencyUseCase

  beforeEach(() => {
    apiService = new AxiosApiService()
    sut = new FetchApiCurrencyUseCase(apiService)
  })

  it('should be able to fetch a currency', async () => {
    const { currency } = await sut.execute({
      id: 1,
    })

    expect(currency).toEqual(
      expect.objectContaining({
        id: 1,
      }),
    )
  })
})
