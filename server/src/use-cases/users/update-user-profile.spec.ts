import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserProfileUseCase } from './update-user-profile'
import { hash } from 'bcryptjs'
import { NicknameAlreadyExitsError } from '../errors/nickname-already-exists-error'
import { S3Service } from '@/adapters/s3aws/s3-service'

describe('Update User Profile Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let s3Service: S3Service
  let sut: UpdateUserProfileUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    s3Service = new S3Service()
    sut = new UpdateUserProfileUseCase(usersRepository, s3Service)
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
    ).rejects.toBeInstanceOf(NicknameAlreadyExitsError)
  })
})
