import type {
  AccountStatus,
  AccountType
} from '../../../../generated/prisma/enums.js'

export interface ICreateFinancialAccountDTO {
  description: string
  type: AccountType
  categoryId: number
  dueDate: Date
  amount: number
  amountPaid?: number
  status: AccountStatus
  installmentNumber: number
  installmentTotal: number
  userId: string
}
