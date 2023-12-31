import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByNickname(nickname: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  update(
    userId: string,
    nickname: string,
    avatarUrl: string | null,
  ): Promise<User>
}
