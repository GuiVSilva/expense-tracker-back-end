import type { FinancialAccount } from '../../../../generated/prisma/client.js'
import type { ICreateFinancialAccountDTO } from '../dto/ICreateFinancialAccountDTO.js'

export interface IFinancialAccountRepository {
  create(data: ICreateFinancialAccountDTO): Promise<FinancialAccount>
  findById(id: number): Promise<FinancialAccount | null>
  findByIdAndUserId(
    id: number,
    userId: string
  ): Promise<FinancialAccount | null>
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
    summary: { receive: number; payment: number; winning: number; late: number }
  }>
  delete(id: number): Promise<void>
  save(account: FinancialAccount): Promise<void>
}
