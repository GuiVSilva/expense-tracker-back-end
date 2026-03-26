import type { FinancialAccount } from '../../../../generated/prisma/client.js'
import type { ICreateFinancialAccountDTO } from '../dto/ICreateFinancialAccountDTO.js'

export interface IFinancialAccountRepository {
  create(data: ICreateFinancialAccountDTO): Promise<FinancialAccount>
}
