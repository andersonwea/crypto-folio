import { BucketService } from '@/adapters/bucket-service'
import { MultipartFile } from '@fastify/multipart'
import { InvalidFormatError } from '../errors/invalid-formart-error'
import { randomUUID } from 'node:crypto'
import { extname } from 'node:path'
import { env } from '@/env'

interface UploadUseCaseRequest {
  userId: string
  file: MultipartFile
}

interface UploadUseCaseResponse {
  avatarUrl: string
}

export class UploadUseCase {
  constructor(private bucketService: BucketService) {}

  async execute({
    userId,
    file,
  }: UploadUseCaseRequest): Promise<UploadUseCaseResponse> {
    const mimeTypeRegex = /^(image)\/[a-zA-Z]+/

    const isValidFormat = mimeTypeRegex.test(file.mimetype)

    if (!isValidFormat) {
      throw new InvalidFormatError()
    }

    const imageId = randomUUID()
    const imageExtension = extname(file.filename)

    const imageName = imageId.concat(imageExtension)

    await this.bucketService.upload(await file.toBuffer(), imageName, userId)

    const imageUrl = new URL(env.AWS_BASE_URL)

    imageUrl.pathname = `users/${userId}/${imageName}`

    const avatarUrl = imageUrl.toString()

    return {
      avatarUrl,
    }
  }
}
