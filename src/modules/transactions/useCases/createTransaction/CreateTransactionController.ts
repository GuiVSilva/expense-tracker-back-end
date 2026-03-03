import { container } from 'tsyringe'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { CreateTransactionUseCase } from './CreateTransactionUseCase.js'
import { createTransactionBodySchema } from './CreateTransactionSchema.js'

export class CreateTransactionController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { description, category, amount, type, date, method } =
      createTransactionBodySchema.parse(request.body)
    const createTransactionUseCase = container.resolve(CreateTransactionUseCase)

    await createTransactionUseCase.execute({
      description,
      category,
      amount,
      type,
      date,
      method,
      userId: request.user.sub
    })
    return reply.status(200).send()
  }
}
