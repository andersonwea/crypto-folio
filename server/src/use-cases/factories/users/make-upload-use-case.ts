import { S3Service } from '@/adapters/s3aws/s3-service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UploadBucketImageUseCase } from '@/use-cases/users/upload-bucket-image'

export function makeUploadBucketImageUseCase() {
  const s3Service = new S3Service()
  const usersRepository = new PrismaUsersRepository()
  const uploadBucketImageUseCase = new UploadBucketImageUseCase(
    s3Service,
    usersRepository,
  )

  return uploadBucketImageUseCase
}
