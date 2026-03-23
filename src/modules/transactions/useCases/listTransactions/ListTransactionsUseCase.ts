import { inject, injectable } from 'tsyringe'
import type { ITransactionRepository } from '../../repositories/ITransactionRepository.js'
import type { IUsersRepository } from '../../../users/repositories/IUsersRepository.js'
import { AppError } from '../../../../shared/errors/AppError.js'
import type { Transaction } from '../../../../../generated/prisma/client.js'

interface IRequest {
  page: number
  limit: number
  search: string
  type: string
  category: string
  sortBy: string
  dateFrom: string
  dateTo: string
  userId: string
}

@injectable()
export class ListTransactionsUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    page,
    limit,
    search,
    type,
    category,
    sortBy,
    dateFrom,
    dateTo,
    userId
  }: IRequest): Promise<{
    transactions: Transaction[]
    total: number
    summary: { income: number; expense: number; balance: number }
  }> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Usuário não encontrado')

    const data = await this.transactionRepository.list(
      page,
      limit,
      search,
      type,
      category,
      sortBy,
      dateFrom,
      dateTo,
      userId
    )

    return data
  }
}
