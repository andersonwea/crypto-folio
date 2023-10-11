import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NicknameAlreadyExitsError } from '../errors/nickname-already-exists-error'
import { S3Service } from '@/adapters/s3aws/s3-service'

interface UpdateUserProfileUseCaseRequest {
  userId: string
  nickname: string
  avatarUrl?: string | null
}

interface UpdateUserProfileUseCaseResponse {
  updatedUser: User
}

export class UpdateUserProfileUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private s3Service: S3Service,
  ) {}

  async execute({
    userId,
    nickname,
    avatarUrl = null,
  }: UpdateUserProfileUseCaseRequest): Promise<UpdateUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const userWithSameNickname =
      await this.usersRepository.findByNickname(nickname)

    if (userWithSameNickname && userWithSameNickname.id !== userId) {
      throw new NicknameAlreadyExitsError()
    }

    if (avatarUrl && user.avatarUrl) {
      await this.s3Service.delete(user.avatarUrl)
    }

    const updatedUser = await this.usersRepository.update(
      userId,
      nickname,
      avatarUrl,
    )

    return {
      updatedUser,
    }
  }
}
