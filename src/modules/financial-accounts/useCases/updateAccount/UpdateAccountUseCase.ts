import { inject, injectable } from 'tsyringe'
import type { IUsersRepository } from '../../../users/repositories/IUsersRepository.js'
import type { ICategoriesRepository } from '../../../categories/repositories/ICategoriesRepository.js'
import type { IFinancialAccountRepository } from '../../repositories/IFinancialAccountRepository.js'
import type { EditAccountBody } from './UpdateAccountController.js'
import { AppError } from '../../../../shared/errors/AppError.js'
import { Prisma } from '../../../../../generated/prisma/client.js'

interface IRequest extends EditAccountBody {
  userId: string
}

@injectable()
export class UpdateAccountUseCase {
  constructor(
    @inject('FinancialAccountRepository')
    private financialAccountRepository: IFinancialAccountRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    id,
    description,
    category,
    amount,
    dueDate,
    userId
  }: IRequest): Promise<void> {
    const [user, categories] = await Promise.all([
      this.usersRepository.findById(userId),
      this.categoriesRepository.findById(Number(category))
    ])

    if (!user) throw new AppError('Usuário não encontrado')

    if (!categories) throw new AppError('Categoria não encontrada')

    const account = await this.financialAccountRepository.findByIdAndUserId(
      id,
      userId
    )

    if (!account) throw new AppError('Conta não encontrada')
    account.description = description
    account.categoryId = categories.id
    account.amount = new Prisma.Decimal(amount)
    account.dueDate = new Date(dueDate)

    await this.financialAccountRepository.save(account)
  }
}
