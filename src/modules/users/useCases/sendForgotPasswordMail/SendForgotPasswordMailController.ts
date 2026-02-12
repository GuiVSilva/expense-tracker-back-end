import { type FastifyReply, type FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase.js'

export class SendForgotPasswordMailController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const forgotPasswordBodySchema = z.object({
      email: z.string().email()
    })

    const { email } = forgotPasswordBodySchema.parse(request.body)

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    )

    await sendForgotPasswordMailUseCase.execute(email)

    return reply.status(200).send({
      message:
        'Se o e-mail existir em nossa base, um código de recuperação foi enviado.'
    })
  }
}
