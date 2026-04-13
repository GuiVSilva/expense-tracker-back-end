import { FinancialAccountPaymentMethod } from '../../../../generated/prisma/enums.js'

export const financialAccountPaymentMethodMap = {
  money: FinancialAccountPaymentMethod.MONEY,
  pix: FinancialAccountPaymentMethod.PIX,
  ticket: FinancialAccountPaymentMethod.TICKET,
  credit_card: FinancialAccountPaymentMethod.CREDIT_CARD,
  debit_card: FinancialAccountPaymentMethod.DEBIT_CARD,
  transfer: FinancialAccountPaymentMethod.TRANSFER
} as const

export type AccountPaymentMethod =
  keyof typeof financialAccountPaymentMethodMap
