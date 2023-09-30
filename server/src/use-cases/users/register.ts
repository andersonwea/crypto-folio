import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ResourceAlreadyExitsError } from '../errors/resource-already-exists-error'

interface RegisterUseCaseRequest {
  nickname: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    nickname,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const isUserAlreadyExists = await this.usersRepository.findByEmail(email)

    if (isUserAlreadyExists) {
      throw new ResourceAlreadyExitsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      nickname,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
