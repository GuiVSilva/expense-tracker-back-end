import type { TransactionType } from '../../../../generated/prisma/enums.js'

export interface ICreateTransactionDTO {
  description: string
  categoryId: number
  amount: number
  type: TransactionType
  date: Date
  method: string
  userId: string
}
