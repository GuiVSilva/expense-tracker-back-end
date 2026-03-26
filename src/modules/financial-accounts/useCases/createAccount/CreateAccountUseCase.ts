import { inject, injectable } from 'tsyringe'
import type { IUsersRepository } from '../../../users/repositories/IUsersRepository.js'
import type { ICategoriesRepository } from '../../../categories/repositories/ICategoriesRepository.js'
import type { IFinancialAccountRepository } from '../../repositories/IFinancialAccountRepository.js'
import type { CreateAccountBody } from './CreateAccountController.js'
import { AppError } from '../../../../shared/errors/AppError.js'
import { accountTypeMap } from '../../mappers/accountTypeMapper.js'
import { accountStatusMap } from '../../mappers/accountStatusMapper.js'

interface IRequest extends CreateAccountBody {
  userId: string
}

@injectable()
export class CreateAccountUseCase {
  constructor(
    @inject('FinancialAccountRepository')
    private financialAccountRepository: IFinancialAccountRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    description,
    type,
    category,
    amount,
    dueDate,
    status,
    installments,
    splitInstallments,
    userId
  }: IRequest): Promise<void> {
    const [user, categories] = await Promise.all([
      this.usersRepository.findById(userId),
      this.categoriesRepository.findById(Number(category))
    ])

    if (!user) throw new AppError('Usuário não encontrado')

    if (!categories) throw new AppError('Categoria não encontrada')

    const mappedType = accountTypeMap[type]
    const mappedStatus = accountStatusMap[status]
    const baseDueDate = new Date(dueDate)
    const totalInstallments =
      installments && installments > 0 ? installments : 1
    const totalAmountInCents = Math.round(Number(amount) * 100)
    const baseInstallmentAmountInCents = splitInstallments
      ? Math.floor(totalAmountInCents / totalInstallments)
      : totalAmountInCents
    const remainderInCents = splitInstallments
      ? totalAmountInCents % totalInstallments
      : 0

    for (let i = 0; i < totalInstallments; i++) {
      const installmentAmountInCents = splitInstallments
        ? baseInstallmentAmountInCents + (i < remainderInCents ? 1 : 0)
        : baseInstallmentAmountInCents
      const installmentDueDate = new Date(baseDueDate)
      installmentDueDate.setMonth(baseDueDate.getMonth() + i)

      await this.financialAccountRepository.create({
        description,
        type: mappedType,
        categoryId: categories.id,
        dueDate: installmentDueDate,
        amount: installmentAmountInCents / 100,
        status: mappedStatus,
        installmentNumber: i + 1,
        installmentTotal: totalInstallments,
        userId: user.id
      })
    }
  }
}
