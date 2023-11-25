import { BucketService } from '@/adapters/bucket-service'
import { MultipartFile } from '@fastify/multipart'
import { InvalidFormatError } from '../errors/invalid-formart-error'
import { randomUUID } from 'node:crypto'
import { extname } from 'node:path'
import { env } from '@/env'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UploadBucketImageUseCaseRequest {
  userId: string
  file: MultipartFile
}

interface UploadBucketImageUseCaseResponse {
  avatarUrl: string
}

export class UploadBucketImageUseCase {
  constructor(
    private bucketService: BucketService,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    file,
  }: UploadBucketImageUseCaseRequest): Promise<UploadBucketImageUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const mimeTypeRegex = /^(image)\/[a-zA-Z]+/

    const isValidFormat = mimeTypeRegex.test(file.mimetype)

    if (!isValidFormat) {
      throw new InvalidFormatError()
    }

    const imageId = randomUUID()
    const imageExtension = extname(file.filename)

    const imageName = imageId.concat(imageExtension)

    await this.bucketService.upload(await file.toBuffer(), imageName, userId)

    const imageUrl = new URL(env.APP_AWS_BASE_URL)

    imageUrl.pathname = `users/${userId}/${imageName}`

    const avatarUrl = imageUrl.toString()

    return {
      avatarUrl,
    }
  }
}
