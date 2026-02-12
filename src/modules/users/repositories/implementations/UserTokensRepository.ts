import type { UserToken } from '../../../../../generated/prisma/client.js'
import { prisma } from '../../../../../lib/prisma.js'
import type { ICreateUserTokensDTO } from '../../dto/ICreateUserTokensDTO.js'
import type { IUserTokensRepository } from '../IUserTokensRepository.js'

export class UserTokensRepository implements IUserTokensRepository {
  async create(data: ICreateUserTokensDTO): Promise<UserToken> {
    const userToken = await prisma.userToken.create({
      data
    })

    return userToken
  }

  async findByCodeAndEmail(
    code: string,
    email: string
  ): Promise<UserToken | null> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        code,
        user: {
          email
        }
      }
    })

    return userToken
  }

  async delete(id: string): Promise<void> {
    await prisma.userToken.delete({
      where: { id }
    })
  }
}
