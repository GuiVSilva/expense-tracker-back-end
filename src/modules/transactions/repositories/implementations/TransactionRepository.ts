import { prisma } from '../../../../../lib/prisma.js'
import type { ICreateTransactionDTO } from '../../dto/ICreateTransactionDTO.js'
import type { ITransactionRepository } from '../ITransactionRepository.js'

export class TransactionRepository implements ITransactionRepository {
  async create(data: ICreateTransactionDTO): Promise<void> {
    await prisma.transaction.create({
      data: {
        description: data.description,
        categoryId: data.categoryId,
        amount: data.amount,
        type: data.type,
        date: data.date,
        method: data.method,
        userId: data.userId
      }
    })
  }
}
