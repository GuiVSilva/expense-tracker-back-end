import type { User } from '../../../../generated/prisma/client.js'
import type { ICreateUserDTO } from '../dto/ICreateUserDTO.js'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
