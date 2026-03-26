import { AccountStatus } from '../../../../generated/prisma/enums.js'

export const accountStatusMap = {
  pending: AccountStatus.PENDING,
  paid: AccountStatus.PAID,
  partial: AccountStatus.PARTIAL,
  overdue: AccountStatus.OVERDUE
} as const
