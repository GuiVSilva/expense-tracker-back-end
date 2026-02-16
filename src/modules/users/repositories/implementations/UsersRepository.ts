import type { User } from '../../../../../generated/prisma/client.js'
import { prisma } from '../../../../../lib/prisma.js'
import type { ICreateUserDTO } from '../../dto/ICreateUserDTO.js'
import type { IUsersRepository } from '../IUsersRepository.js'

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email }
    })
  }

  async create(data: ICreateUserDTO): Promise<User> {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
  }

  async save(user: User): Promise<User> {
    return await prisma.user.update({
      where: { id: user.id },
      data: user
    })
  }
}
