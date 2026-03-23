import { container } from 'tsyringe'
import { DeleteTransactionUseCase } from './DeleteTransactionUseCase.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export type DeleteTransactionBody = {
  id: string
}

export class DeleteTransactionController {
  async handle(
    request: FastifyRequest<{ Body: DeleteTransactionBody }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { id } = request.body

    const deleteTransactionUseCase = container.resolve(DeleteTransactionUseCase)

    const data = await deleteTransactionUseCase.execute({
      id: Number(id),
      userId: request.user.sub
    })

    return reply.status(200).send(data)
  }
}
