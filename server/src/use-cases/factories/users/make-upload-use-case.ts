import { S3Service } from '@/adapters/s3aws/s3-service'
import { UploadUseCase } from '@/use-cases/users/upload'

export function makeUploadUseCase() {
  const s3Service = new S3Service()
  const uploadUseCaase = new UploadUseCase(s3Service)

  return uploadUseCaase
}
