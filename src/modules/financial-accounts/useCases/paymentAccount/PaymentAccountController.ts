import { container } from 'tsyringe'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { PaymentAccountUseCase } from './PaymentAccountUseCase.js'
import type { AccountPaymentMethod } from '../../mappers/accountPaymentMethodMapper.js'

export type RegisterPaymentAccountBody = {
  id: number
  amount: number
  method: AccountPaymentMethod
  date: string
}

export class PaymentAccountController {
  async handle(
    request: FastifyRequest<{ Body: RegisterPaymentAccountBody }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { id, amount, method, date } = request.body

    const paymentAccountUseCase = container.resolve(PaymentAccountUseCase)

    await paymentAccountUseCase.execute({
      id,
      amount,
      method,
      date,
      userId: request.user.sub
    })
    return reply.status(200).send()
  }
}
