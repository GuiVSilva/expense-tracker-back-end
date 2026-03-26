import type { FinancialAccount } from '../../../../generated/prisma/client.js'
import type { ICreateFinancialAccountDTO } from '../dto/ICreateFinancialAccountDTO.js'

export interface IFinancialAccountRepository {
  create(data: ICreateFinancialAccountDTO): Promise<FinancialAccount>
  list(
    page: number,
    limit: number,
    search: string,
    type: string,
    status: string,
    category: string,
    userId: string
  ): Promise<{
    accounts: FinancialAccount[]
    total: number
  }>
}
