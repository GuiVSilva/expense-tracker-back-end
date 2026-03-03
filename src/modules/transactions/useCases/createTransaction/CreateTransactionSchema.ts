import { z } from 'zod'
import { TransactionType } from '../../../../../generated/prisma/enums.js'

export const createTransactionBodySchema = z.object({
  description: z.string(),
  category: z.string(),
  amount: z.number(),
  type: z.enum(['income', 'expense']).transform(value =>
    value === 'income' ? TransactionType.INCOME : TransactionType.EXPENSE
  ),
  date: z.coerce.date(),
  method: z.enum([
    'pix',
    'credit_card',
    'debit_card',
    'transfer',
    'ticket',
    'money'
  ])
})

export type CreateTransactionBody = z.infer<typeof createTransactionBodySchema>
