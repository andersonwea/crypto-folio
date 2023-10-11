import { InvalidFormatError } from '@/use-cases/errors/invalid-formart-error'
import { UploadError } from '@/use-cases/errors/upload-error'
import { makeUploadUseCase } from '@/use-cases/factories/users/make-upload-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function upload(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  try {
    const file = await request.file({
      limits: {
        fileSize: 5_242_880, // 5mb
      },
    })

    if (!file) {
      return reply.status(400).send()
    }

    const uploadUseCase = makeUploadUseCase()

    const { avatarUrl } = await uploadUseCase.execute({
      userId,
      file,
    })

    return reply.status(201).send({ avatarUrl })
  } catch (err: any) {
    if (err instanceof UploadError) {
      return reply.status(500).send({ error: err.message })
    }

    if (err instanceof InvalidFormatError) {
      return reply.status(400).send({ error: err.message })
    }

    return reply.status(413).send({ error: err.message })
  }
}
