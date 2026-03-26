import { AccountType } from '../../../../generated/prisma/enums.js'

export const accountTypeMap = {
  payable: AccountType.PAYABLE,
  receivable: AccountType.RECEIVABLE
} as const
