import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import '@fastify/jwt'
import { AuthenticateUseCase } from './AuthenticateUseCase.js'

export class AuthenticateController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUseCase = container.resolve(AuthenticateUseCase)

    const { user, token } = await authenticateUseCase.execute(
      { email, password },
      async payload => await reply.jwtSign(payload)
    )

    return reply.status(200).send({ user, token })
  }
}
