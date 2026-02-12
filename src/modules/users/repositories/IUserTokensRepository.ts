import type { UserToken } from '../../../../generated/prisma/client.js'
import type { ICreateUserTokensDTO } from '../dto/ICreateUserTokensDTO.js'

export interface IUserTokensRepository {
  create(data: ICreateUserTokensDTO): Promise<UserToken>
  findByCodeAndEmail(code: string, email: string): Promise<UserToken | null>
  delete(id: string): Promise<void>
}
