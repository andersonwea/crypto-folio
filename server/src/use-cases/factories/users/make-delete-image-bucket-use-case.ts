import { S3Service } from '@/adapters/s3aws/s3-service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteBucketImageUseCase } from '@/use-cases/users/delete-bucket-image'

export function makeDeleteBucketImageUseCase() {
  const s3Service = new S3Service()
  const usersRepository = new PrismaUsersRepository()
  const deleteBucketImageUseCase = new DeleteBucketImageUseCase(
    s3Service,
    usersRepository,
  )

  return deleteBucketImageUseCase
}
