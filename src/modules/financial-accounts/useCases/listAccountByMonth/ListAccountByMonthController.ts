import { container } from 'tsyringe'
import { ListAccountByMonthUseCase } from './ListAccountByMonthUseCase.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export type ListAccountsByMonthQuery = {
  year: number
  month: number
}

export class ListAccountByMonthController {
  async handle(
    request: FastifyRequest<{ Querystring: ListAccountsByMonthQuery }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { year, month } = request.query
    const listAccountByMonthUseCase = container.resolve(ListAccountByMonthUseCase)

    const data = await listAccountByMonthUseCase.execute({
      year,
      month,
      userId: request.user.sub
    })

    return reply.status(200).send(data)
  }
}
