import { container } from 'tsyringe'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { CreateAccountUseCase } from './CreateAccountUseCase.js'
import type { AccountTypeKey } from '../../mappers/accountTypeMapper.js'
import type { AccountStatusKey } from '../../mappers/accountStatusMapper.js'

export type CreateAccountBody = {
  description: string
  type: AccountTypeKey
  category: string
  amount: string
  dueDate: string
  status: AccountStatusKey
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
