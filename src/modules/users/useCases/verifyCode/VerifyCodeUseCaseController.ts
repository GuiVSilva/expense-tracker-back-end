import { container } from 'tsyringe'
import { z } from 'zod'
import { VerifyCodeUseCase } from './VerifyCodeUseCase.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class VerifyCodeController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const verifyCodeBodySchema = z.object({
      email: z.string().email(),
      code: z.string().length(6)
    })

    const { email, code } = verifyCodeBodySchema.parse(request.body)

    const verifyCodeUseCase = container.resolve(VerifyCodeUseCase)

    await verifyCodeUseCase.execute(code, email)
    return reply.status(200).send()
  }
}
