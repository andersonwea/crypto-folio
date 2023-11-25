import { BucketService } from '@/adapters/bucket-service'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteBucketImageUseCaseRequest {
  userId: string
}

export class DeleteBucketImageUseCase {
  constructor(
    private bucketService: BucketService,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ userId }: DeleteBucketImageUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (!user.avatarUrl) {
      return null
    }

    const imageUrl = new URL(user.avatarUrl)

    const imageName = imageUrl.pathname.replace('/', '')

    await this.bucketService.delete(imageName)
  }
}
