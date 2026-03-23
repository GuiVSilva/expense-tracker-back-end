import { container } from 'tsyringe'
import { ListTransactionsUseCase } from './ListTransactionsUseCase.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export type ListTransactionsQuery = {
  page: string
  limit: string
  search: string
  type: string
  category: string
  sortBy: string
  dateFrom: string
  dateTo: string
}

export class ListTransactionsController {
  async handle(
    request: FastifyRequest<{ Querystring: ListTransactionsQuery }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { page, limit, search, type, category, sortBy, dateFrom, dateTo } =
      request.query

    const listTransactionsUseCase = container.resolve(ListTransactionsUseCase)

    const data = await listTransactionsUseCase.execute({
      page: Number(page),
      limit: Number(limit),
      search,
      type,
      category,
      sortBy,
      dateFrom,
      dateTo,
      userId: request.user.sub
    })

    return reply.status(200).send(data)
  }
}
