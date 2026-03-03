import type { ICreateTransactionDTO } from '../dto/ICreateTransactionDTO.js'

export interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<void>
}
