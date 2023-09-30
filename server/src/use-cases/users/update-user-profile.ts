import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ResourceAlreadyExitsError } from '../errors/resource-already-exists-error'

interface UpdateUserProfileUseCaseRequest {
  userId: string
  nickname: string
  avatarUrl?: string | null
}

interface UpdateUserProfileUseCaseResponse {
  updatedUser: User
}

export class UpdateUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

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
      throw new ResourceAlreadyExitsError()
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
