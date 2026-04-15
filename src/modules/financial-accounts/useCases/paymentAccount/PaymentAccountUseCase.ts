import { inject, injectable } from 'tsyringe'
import type { IUsersRepository } from '../../../users/repositories/IUsersRepository.js'
import type { IFinancialAccountRepository } from '../../repositories/IFinancialAccountRepository.js'
import { AppError } from '../../../../shared/errors/AppError.js'
import type { RegisterPaymentAccountBody } from './PaymentAccountController.js'
import type { IFinancialAccountPaymentRepository } from '../../repositories/IFinancialAccountPaymentRepository.js'
import { financialAccountPaymentMethodMap } from '../../mappers/accountPaymentMethodMapper.js'
import {
  AccountStatus,
  AccountType,
  TransactionType
} from '../../../../../generated/prisma/enums.js'
import type { ITransactionRepository } from '../../../transactions/repositories/ITransactionRepository.js'

interface IRequest extends RegisterPaymentAccountBody {
  userId: string
}

@injectable()
export class PaymentAccountUseCase {
  constructor(
    @inject('FinancialAccountRepository')
    private financialAccountRepository: IFinancialAccountRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FinancialAccountPaymentRepository')
    private financialAccountPaymentRepository: IFinancialAccountPaymentRepository,

    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository
  ) {}

  async execute({ id, amount, method, date, userId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Usuário não encontrado')

    const account = await this.financialAccountRepository.findByIdAndUserId(
      id,
      userId
    )

    if (!account) throw new AppError('Conta não encontrada')

    const mappedMethod = financialAccountPaymentMethodMap[method]

    if (!mappedMethod) throw new AppError('Metodo de pagamento invalido')

    account.amountPaid = account.amountPaid.plus(amount)

    if (account.amountPaid.greaterThanOrEqualTo(account.amount)) {
      account.status = AccountStatus.PAID
    } else {
      account.status = AccountStatus.PARTIAL
    }

    account.updatedAt = new Date()

    const typeTransaction =
      account.type === AccountType.RECEIVABLE
        ? TransactionType.INCOME
        : TransactionType.EXPENSE

    await this.financialAccountRepository.save(account)

    await this.financialAccountPaymentRepository.create({
      financialAccountId: account.id,
      amount,
      method: mappedMethod,
      paymentDate: new Date(date)
    })

    await this.transactionRepository.create({
      description: `Pagamento da conta ${account.description}`,
      categoryId: account.categoryId,
      amount,
      type: typeTransaction,
      date: new Date(date),
      method: mappedMethod,
      userId
    })
  }
}
