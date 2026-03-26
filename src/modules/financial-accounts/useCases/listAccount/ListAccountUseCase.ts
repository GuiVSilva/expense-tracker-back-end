import { inject, injectable } from 'tsyringe'

import type { IUsersRepository } from '../../../users/repositories/IUsersRepository.js'
import { AppError } from '../../../../shared/errors/AppError.js'
import type { FinancialAccount } from '../../../../../generated/prisma/client.js'
import type { IFinancialAccountRepository } from '../../repositories/IFinancialAccountRepository.js'

interface IRequest {
  page: number
  limit: number
  search: string
  type: string
  status: string
  category: string
  userId: string
}

@injectable()
export class ListAccountUseCase {
  constructor(
    @inject('FinancialAccountRepository')
    private financialAccountRepository: IFinancialAccountRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    page,
    limit,
    search,
    type,
    status,
    category,
    userId
  }: IRequest): Promise<{
    accounts: FinancialAccount[]
    total: number
  }> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Usuário não encontrado')

    return await this.financialAccountRepository.list(
      page,
      limit,
      search,
      type,
      status,
      category,
      userId
    )
  }
}
