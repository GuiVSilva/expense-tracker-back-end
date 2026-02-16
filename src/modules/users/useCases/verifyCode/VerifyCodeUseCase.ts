import { inject, injectable } from 'tsyringe'
import type { IUserTokensRepository } from '../../repositories/IUserTokensRepository.js'
import { AppError } from '../../../../shared/errors/AppError.js'

@injectable()
export class VerifyCodeUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  async execute(code: string, email: string): Promise<void> {
    const userToken = await this.userTokensRepository.findByCodeAndEmail(
      code,
      email
    )

    if (!userToken) {
      throw new AppError('Código inválido.')
    }

    if (new Date() > userToken.expires_at) {
      await this.userTokensRepository.delete(userToken.id)
      throw new AppError('Este código expirou. Solicite um novo.')
    }

    await this.userTokensRepository.delete(userToken.id)
  }
}
