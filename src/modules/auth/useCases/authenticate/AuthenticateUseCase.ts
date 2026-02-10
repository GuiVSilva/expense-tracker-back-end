import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import type { IUsersRepository } from '../../../users/repositories/IUsersRepository.js'
import type { IAuthenticateDTO } from '../../dto/IAuthenticateDTO.js'
import { AppError } from '../../../../shared/errors/AppError.js'

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    { email, password }: IAuthenticateDTO,
    signToken: (payload: object) => Promise<string>
  ): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('Email ou senha incorretos.', 401)

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new AppError('Email ou senha incorretos.', 401)

    const token = await signToken({ sub: user.id })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }
  }
}
