import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findByNickname(nickname: string) {
    const user = await prisma.user.findUnique({
      where: {
        nickname,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async update(userId: string, nickname: string, avatarUrl: string | null) {
    const user = await prisma.user.update({
      data: {
        nickname,
        avatarUrl,
      },
      where: {
        id: userId,
      },
    })

    return user
  }
}
