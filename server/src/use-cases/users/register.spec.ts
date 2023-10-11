import { UsersRepository } from '@/repositories/users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare, hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error'

describe('Register Use Case', () => {
  let usersRepository: UsersRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register user', async () => {
    const { user } = await sut.execute({
      nickname: 'jonh',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    expect(user).toEqual(
      expect.objectContaining({
        nickname: 'jonh',
        email: 'johndoe@example.com',
      }),
    )
  })

  it('should hash user password upn registration', async () => {
    const { user } = await sut.execute({
      nickname: 'jonh',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('should not to be able to register twice with same email', async () => {
    await sut.execute({
      nickname: 'jonh',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        nickname: 'jonh',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
