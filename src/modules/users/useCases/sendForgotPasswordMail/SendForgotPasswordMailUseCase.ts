import { inject, injectable } from 'tsyringe'
import type { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider.js'
import type { IUsersRepository } from '../../repositories/IUsersRepository.js'
import type { IUserTokensRepository } from '../../repositories/IUserTokensRepository.js'
import { ResetPasswordTemplate } from '../../../../shared/container/providers/MailProvider/templates/ResetPasswordTemplate.js'

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) return

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    const expires_at = new Date()
    expires_at.setMinutes(expires_at.getMinutes() + 20)

    await this.userTokensRepository.create({
      code,
      user_id: user.id,
      expires_at
    })

    const htmlBody = ResetPasswordTemplate.generate({
      userName: user.name,
      resetCode: code,
      email,
      expiresIn: '20 minutos'
    })

    await this.mailProvider.sendMail(
      email,
      '🔐 Recuperação de Senha - ExpenseTracker',
      htmlBody
    )
  }
}
