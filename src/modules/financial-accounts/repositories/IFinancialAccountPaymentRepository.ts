import type { FinancialAccountPayment } from '../../../../generated/prisma/client.js'
import type { ICreateFinancialAccountPaymentDTO } from '../dto/ICreateFinancialAccountPaymentDTO.js'

export interface IFinancialAccountPaymentRepository {
  create(
    data: ICreateFinancialAccountPaymentDTO
  ): Promise<FinancialAccountPayment>
}
