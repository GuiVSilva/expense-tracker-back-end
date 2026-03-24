import { inject, injectable } from 'tsyringe'
import type { ITransactionRepository } from '../../repositories/ITransactionRepository.js'
import type { IUsersRepository } from '../../../users/repositories/IUsersRepository.js'
import { AppError } from '../../../../shared/errors/AppError.js'
import { transactionMethodLabels } from '../../mappers/transactionMethodLabels.js'

interface IRequest {
  category: string
  dateFrom: string
  dateTo: string
  userId: string
}

@injectable()
export class ExportTransactionsUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ category, dateFrom, dateTo, userId }: IRequest): Promise<
    {
      Descricao: string
      Categoria: string
      Data: Date
      Metodo: string
      Valor: number
    }[]
  > {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Usuário não encontrado')

    const transactions = await this.transactionRepository.export(
      dateFrom,
      dateTo,
      category,
      user.id
    )

    return transactions.map(transaction => ({
      ...transaction,
      Metodo:
        transactionMethodLabels[
          transaction.Metodo as keyof typeof transactionMethodLabels
        ] ?? transaction.Metodo
    }))
  }
}
