import { AxiosApiService } from '@/adapters/axios/axios-api-service'
import { PrismaCurrenciesRepository } from '@/repositories/prisma/prisma-currencies-repository'
import { GetUserMetricsUseCase } from '@/use-cases/users/get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const currenciesRepository = new PrismaCurrenciesRepository()
  const apiService = new AxiosApiService()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(
    currenciesRepository,
    apiService,
  )

  return getUserMetricsUseCase
}
