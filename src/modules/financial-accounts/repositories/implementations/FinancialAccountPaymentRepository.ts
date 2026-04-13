import type { FinancialAccountPayment } from '../../../../../generated/prisma/client.js'
import { prisma } from '../../../../../lib/prisma.js'
import type { ICreateFinancialAccountPaymentDTO } from '../../dto/ICreateFinancialAccountPaymentDTO.js'
import type { IFinancialAccountPaymentRepository } from '../IFinancialAccountPaymentRepository.js'

export class FinancialAccountPaymentRepository implements IFinancialAccountPaymentRepository {
  async create(
    data: ICreateFinancialAccountPaymentDTO
  ): Promise<FinancialAccountPayment> {
    const payment = await prisma.financialAccountPayment.create({
      data
    })
    return payment
  }
}
