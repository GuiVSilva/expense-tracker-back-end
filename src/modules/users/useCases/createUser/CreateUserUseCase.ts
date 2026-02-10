import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import type { ICreateUserDTO } from '../../dto/ICreateUserDTO.js'
import type { IUsersRepository } from '../../repositories/IUsersRepository.js'
import { AppError } from '../../../../shared/errors/AppError.js'

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    { name, email, password }: ICreateUserDTO,
    signToken: (payload: object) => Promise<string>
  ): Promise<IResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('Este e-mail já está em uso.')
    }

    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash
    })

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
