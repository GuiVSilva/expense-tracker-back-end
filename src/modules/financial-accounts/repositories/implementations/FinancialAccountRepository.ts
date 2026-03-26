import type { FinancialAccount } from '../../../../../generated/prisma/client.js'
import { prisma } from '../../../../../lib/prisma.js'
import type { ICreateFinancialAccountDTO } from '../../dto/ICreateFinancialAccountDTO.js'
import type { IFinancialAccountRepository } from '../IFinancialAccountRepository.js'

export class FinancialAccountRepository implements IFinancialAccountRepository {
  async create(data: ICreateFinancialAccountDTO): Promise<FinancialAccount> {
    const financialAccount = await prisma.financialAccount.create({ data })
    return financialAccount
  }
}
