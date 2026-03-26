import { container } from 'tsyringe'
import { ListAccountUseCase } from './ListAccountUseCase.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export type ListAccountsQuery = {
  page: string
  limit: string
  search: string
  type: string
  status: string
  category: string
}

export class ListAccountController {
  async handle(
    request: FastifyRequest<{ Querystring: ListAccountsQuery }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { page, limit, search, type, status, category } = request.query
    const listAccountUseCase = container.resolve(ListAccountUseCase)

    const data = await listAccountUseCase.execute({
      page: Number(page),
      limit: Number(limit),
      search,
      type,
      category,
      status,
      userId: request.user.sub
    })

    return reply.status(200).send(data)
  }
}
