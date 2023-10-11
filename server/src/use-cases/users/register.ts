import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { EmailAreadyExistsError } from '../errors/email-already-exists-error'
import { NicknameAlreadyExitsError } from '../errors/nickname-already-exists-error'

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
    const isEmailAlreadyExists = await this.usersRepository.findByEmail(email)
    const isNicknameAlreadyExists =
      await this.usersRepository.findByNickname(nickname)

    if (isEmailAlreadyExists) {
      throw new EmailAreadyExistsError()
    }

    if (isNicknameAlreadyExists) {
      throw new NicknameAlreadyExitsError()
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
