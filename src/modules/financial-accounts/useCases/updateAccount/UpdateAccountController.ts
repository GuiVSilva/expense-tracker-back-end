import { container } from 'tsyringe'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UpdateAccountUseCase } from './UpdateAccountUseCase.js'

export type EditAccountBody = {
  id: number
  description: string
  category: string
  amount: string
  dueDate: string
}

export class UpdateAccountController {
  async handle(
    request: FastifyRequest<{ Body: EditAccountBody }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { id, description, category, amount, dueDate } = request.body

    const updateAccountUseCase = container.resolve(UpdateAccountUseCase)

    await updateAccountUseCase.execute({
      id,
      description,
      category,
      amount,
      dueDate,
      userId: request.user.sub
    })
    return reply.status(200).send()
  }
}
