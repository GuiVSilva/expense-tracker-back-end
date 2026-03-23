import { inject, injectable } from 'tsyringe'
import type { IUsersRepository } from '../../../users/repositories/IUsersRepository.js'
import { AppError } from '../../../../shared/errors/AppError.js'
import type { ITransactionRepository } from '../../repositories/ITransactionRepository.js'

interface IRequest {
  id: number
  userId: string
}

@injectable()
export class DeleteTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, userId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Usuário não encontrado')

    const transaction = await this.transactionRepository.findById(id)

    if (!transaction) throw new AppError('Transação não encontrada')

    transaction.active = false

    await this.transactionRepository.save(transaction)
  }
}
