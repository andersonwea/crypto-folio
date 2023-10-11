import { S3Service } from '@/adapters/s3aws/s3-service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserProfileUseCase } from '@/use-cases/users/update-user-profile'

export function makeUpdateUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const s3Service = new S3Service()
  const updateUserProfileUseCase = new UpdateUserProfileUseCase(
    usersRepository,
    s3Service,
  )

  return updateUserProfileUseCase
}
