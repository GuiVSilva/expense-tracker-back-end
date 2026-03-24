import type { Transaction } from '../../../../generated/prisma/client.js'
import type { ICreateTransactionDTO } from '../dto/ICreateTransactionDTO.js'

export interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<void>
  findById(id: number): Promise<Transaction | null>
  list(
    page: number,
    limit: number,
    search: string,
    type: string,
    category: string,
    sortBy: string,
    dateFrom: string,
    dateTo: string,
    userId: string
  ): Promise<{
    transactions: Transaction[]
    total: number
    summary: { income: number; expense: number; balance: number }
  }>
  export(
    dateFrom: string,
    dateTo: string,
    category: string,
    userId: string
  ): Promise<
    {
      Descricao: string
      Categoria: string
      Data: Date
      Metodo: string
      Valor: number
    }[]
  >
  save(transaction: Transaction): Promise<void>
}
