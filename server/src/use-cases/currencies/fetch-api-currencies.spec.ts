import { ApiService } from '@/adapters/api-service'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchApiCurrenciesUseCase } from './fetch-api-currencies'
import { AxiosApiService } from '@/adapters/axios/axios-api-service'

describe('Fetch Currenties Use Case', () => {
  let apiService: ApiService
  let sut: FetchApiCurrenciesUseCase

  beforeEach(() => {
    apiService = new AxiosApiService()
    sut = new FetchApiCurrenciesUseCase(apiService)
  })

  it('should be able to fetch pagineted currencies', async () => {
    const { currencies } = await sut.execute({
      page: 1,
    })

    expect(currencies).toHaveLength(7)
  })
})
