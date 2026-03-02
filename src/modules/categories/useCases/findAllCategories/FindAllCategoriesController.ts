import { container } from 'tsyringe'
import { FindAllCategoriesUseCase } from './FindAllCategoriesUseCase.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class FindAllCategoriesController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const findAllCategoriesUseCase = container.resolve(FindAllCategoriesUseCase)

    const data = await findAllCategoriesUseCase.execute()
    return reply.status(200).send(data)
  }
}
