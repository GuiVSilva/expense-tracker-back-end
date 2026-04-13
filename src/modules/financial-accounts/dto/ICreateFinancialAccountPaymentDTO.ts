import type { FinancialAccountPaymentMethod } from '../../../../generated/prisma/enums.js'

export interface ICreateFinancialAccountPaymentDTO {
  financialAccountId: number
  amount: number
  method: FinancialAccountPaymentMethod
  paymentDate: Date
}
