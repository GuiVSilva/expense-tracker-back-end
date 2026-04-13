import { container } from 'tsyringe'
import { DeleteAccountUseCase } from './DeleteAccountUseCase.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export type DeleteAccountQuery = {
  id: number
}

export class DeleteAccountController {
  async handle(
    request: FastifyRequest<{ Querystring: DeleteAccountQuery }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { id } = request.query

    const deleteAccountUseCase = container.resolve(DeleteAccountUseCase)

    const data = await deleteAccountUseCase.execute({
      id: Number(id),
      userId: request.user.sub
    })

    return reply.status(200).send(data)
  }
}
