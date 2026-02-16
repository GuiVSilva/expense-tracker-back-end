import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import type { IUsersRepository } from '../../repositories/IUsersRepository.js'
import { AppError } from '../../../../shared/errors/AppError.js'

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(email: string, password: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário não encontrado.')
    }

    const passwordHash = await hash(password, 6)

    user.password = passwordHash

    await this.usersRepository.save(user)
  }
}
