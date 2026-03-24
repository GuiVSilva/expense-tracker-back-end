import { container } from 'tsyringe'
import { ExportTransactionsUseCase } from './ExportTransactionsUseCase.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export type ExportTransactionsQuery = {
  category: string
  dateFrom: string
  dateTo: string
}

export class ExportTransactionsController {
  async handle(
    request: FastifyRequest<{ Querystring: ExportTransactionsQuery }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { category, dateFrom, dateTo } = request.query

    const exportTransactionsUseCase = container.resolve(
      ExportTransactionsUseCase
    )

    const data = await exportTransactionsUseCase.execute({
      category,
      dateFrom,
      dateTo,
      userId: request.user.sub
    })

    return reply.status(200).send(data)
  }
}
