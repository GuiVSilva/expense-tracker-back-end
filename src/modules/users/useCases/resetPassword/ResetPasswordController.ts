import { type FastifyReply, type FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ResetPasswordUseCase } from './ResetPasswordUseCase.js'

export class ResetPasswordController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const resetPasswordBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(8)
    })

    const { email, password } = resetPasswordBodySchema.parse(request.body)

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase)

    await resetPasswordUseCase.execute(email, password)
    return reply.status(204).send()
  }
}
