import { inject, injectable } from 'tsyringe'
import type { IUsersRepository } from '../../../users/repositories/IUsersRepository.js'
import { AppError } from '../../../../shared/errors/AppError.js'
import type { IFinancialAccountRepository } from '../../repositories/IFinancialAccountRepository.js'
import type { IFinancialAccountPaymentRepository } from '../../repositories/IFinancialAccountPaymentRepository.js'

interface IRequest {
  id: number
  userId: string
}

@injectable()
export class DeleteAccountUseCase {
  constructor(
    @inject('FinancialAccountRepository')
    private financialAccountRepository: IFinancialAccountRepository,

    @inject('FinancialAccountPaymentRepository')
    private financialAccountPaymentRepository: IFinancialAccountPaymentRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, userId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Usuário não encontrado')

    const account = await this.financialAccountRepository.findByIdAndUserId(
      id,
      userId
    )

    if (!account) throw new AppError('Conta não encontrada!')

    const payments =
      await this.financialAccountPaymentRepository.findByAccountId(id)

    if (payments.length > 0) {
      throw new AppError(
        'Não é possivel excluir uma conta que possui pagamentos registrados'
      )
    }

    await this.financialAccountRepository.delete(id)
  }
}
