import { makeUpdateUserProfileUseCase } from '@/use-cases/factories/users/make-update-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const updateProfileBodySchema = z.object({
    nickname: z.string(),
    avatarUrl: z.string().nullable(),
  })

  const { avatarUrl, nickname } = updateProfileBodySchema.parse(request.body)

  const updateUserProfileUseCase = makeUpdateUserProfileUseCase()

  const { updatedUser } = await updateUserProfileUseCase.execute({
    nickname,
    userId,
    avatarUrl,
  })

  return reply.status(200).send(updatedUser)
}
