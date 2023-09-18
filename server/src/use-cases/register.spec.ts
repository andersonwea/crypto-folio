import { UsersRepository } from '@/repositories/users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'

describe('Register Use Case', () => {
  let usersRepository: UsersRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register user', async () => {
    const { user } = await sut.execute({
      nickname: 'pipoca',
      email: 'pipoca@example.com',
      password: await hash('123456', 6),
    })

    expect(user).toEqual(
      expect.objectContaining({
        nickname: 'pipoca',
        email: 'pipoca@example.com',
      }),
    )
  })
})
