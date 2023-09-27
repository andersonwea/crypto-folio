import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserProfileUseCase } from './update-user-profile'
import { hash } from 'bcryptjs'
import { ResourceAlreadyExitsError } from './errors/resource-already-exists-error'

describe('Update User Profile Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: UpdateUserProfileUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserProfileUseCase(usersRepository)
  })

  it('should be able to update user profile', async () => {
    const user = await usersRepository.create({
      email: 'user@example.com',
      nickname: 'user',
      password_hash: await hash('123456', 6),
    })

    const { updatedUser } = await sut.execute({
      nickname: 'user-new-nickname',
      avatarUrl: 'user-avatarUrl',
      userId: user.id,
    })

    expect(updatedUser).toEqual(
      expect.objectContaining({
        nickname: 'user-new-nickname',
        avatarUrl: 'user-avatarUrl',
      }),
    )
  })

  it('should not to be able to update with a existing nickname', async () => {
    await usersRepository.create({
      email: 'user@example.com',
      nickname: 'first-user',
      password_hash: await hash('123456', 6),
    })

    const secondUser = await usersRepository.create({
      email: 'user-02@example.com',
      nickname: 'second-user',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        nickname: 'first-user',
        userId: secondUser.id,
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExitsError)
  })
})
