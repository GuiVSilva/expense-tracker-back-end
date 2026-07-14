import { inject, injectable } from 'tsyringe'

import type { IUsersRepository } from '../../../users/repositories/IUsersRepository.js'
import { AppError } from '../../../../shared/errors/AppError.js'
import type { FinancialAccount } from '../../../../../generated/prisma/client.js'
import type { IFinancialAccountRepository } from '../../repositories/IFinancialAccountRepository.js'

interface IRequest {
  year: number
  month: number
  userId: string
}

@injectable()
export class ListAccountByMonthUseCase {
  constructor(
    @inject('FinancialAccountRepository')
    private financialAccountRepository: IFinancialAccountRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    year,
    month,
    userId
  }: IRequest): Promise<FinancialAccount[]> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Usuário não encontrado')

    return await this.financialAccountRepository.listByMonth(
      year,
      month,
      userId
    )
  }
}
