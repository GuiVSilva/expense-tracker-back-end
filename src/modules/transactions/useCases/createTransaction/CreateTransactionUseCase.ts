import { inject, injectable } from 'tsyringe'

import type { CreateTransactionBody } from './CreateTransactionSchema.js'
import type { IUsersRepository } from '../../../users/repositories/IUsersRepository.js'
import { AppError } from '../../../../shared/errors/AppError.js'
import type { ICategoriesRepository } from '../../../categories/repositories/ICategoriesRepository.js'
import type { ITransactionRepository } from '../../repositories/ITransactionRepository.js'

interface IRequest extends CreateTransactionBody {
  userId: string
}

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    description,
    category,
    amount,
    type,
    date,
    method,
    userId
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Usuário não encontrado')

    const categories = await this.categoriesRepository.findById(
      Number(category)
    )

    if (!categories) throw new AppError('Categoria não encontrada')

    await this.transactionRepository.create({
      description,
      categoryId: categories.id,
      amount,
      type,
      date,
      method,
      userId: user.id
    })
  }
}
