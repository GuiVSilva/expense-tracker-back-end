import { container } from 'tsyringe'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { CreateAccountUseCase } from './CreateAccountUseCase.js'

export type CreateAccountBody = {
  description: string
  type: 'payable' | 'receivable'
  category: string
  amount: string
  dueDate: string
  status: 'pending' | 'paid' | 'overdue' | 'partial'
  installments: number
  splitInstallments: boolean
}

export class CreateAccountController {
  async handle(
    request: FastifyRequest<{ Body: CreateAccountBody }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const {
      description,
      type,
      category,
      amount,
      dueDate,
      status,
      installments,
      splitInstallments
    } = request.body

    const createAccountUseCase = container.resolve(CreateAccountUseCase)

    await createAccountUseCase.execute({
      description,
      type,
      category,
      amount,
      dueDate,
      status,
      installments,
      splitInstallments,
      userId: request.user.sub
    })
    return reply.status(200).send()
  }
}
