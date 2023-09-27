import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  private items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByNickname(nickname: string) {
    const user = this.items.find((item) => item.nickname === nickname)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: randomUUID(),
      nickname: data.nickname,
      avatarUrl: data.avatarUrl || null,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async update(userId: string, nickname: string, avatarUrl: string) {
    const userIndex = this.items.findIndex((item) => item.id === userId)

    if (userIndex >= 0) {
      this.items[userIndex].nickname = nickname
      this.items[userIndex].avatarUrl = avatarUrl
    }

    return this.items[userIndex]
  }
}
