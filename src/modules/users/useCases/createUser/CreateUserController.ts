import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import '@fastify/jwt'
import { CreateUserUseCase } from './CreateUserUseCase.js'

export class CreateUserController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6)
    })
    const { name, email, password } = createUserBodySchema.parse(request.body)

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const { user, token } = await createUserUseCase.execute(
      { name, email, password },
      async payload => await reply.jwtSign(payload)
    )

    return reply.status(201).send({ user, token })
  }
}
