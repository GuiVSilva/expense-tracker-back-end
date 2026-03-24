import type { Transaction } from '../../../../../generated/prisma/client.js'
import { TransactionType } from '../../../../../generated/prisma/enums.js'
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

  async findById(id: number): Promise<Transaction | null> {
    return await prisma.transaction.findUnique({ where: { id } })
  }

  async list(
    page: number,
    limit: number,
    search: string,
    type: string,
    category: string,
    sortBy: 'desc' | 'asc',
    dateFrom: string,
    dateTo: string,
    userId: string
  ): Promise<{
    transactions: Transaction[]
    total: number
    summary: { income: number; expense: number; balance: number }
  }> {
    const normalizedSearch = search.trim()
    const normalizedType =
      type === 'income'
        ? TransactionType.INCOME
        : type === 'expense'
          ? TransactionType.EXPENSE
          : undefined
    const normalizedCategory = category === 'all' ? undefined : Number(category)
    const startDate = !dateFrom
      ? undefined
      : new Date(`${dateFrom}T00:00:00.000Z`)
    const endDate = !dateTo ? undefined : new Date(`${dateTo}T23:59:59.999Z`)

    const where = {
      userId,
      description: {
        contains: normalizedSearch,
        mode: 'insensitive' as const
      },
      ...(normalizedType && { type: normalizedType }),
      ...(normalizedCategory && { categoryId: normalizedCategory }),
      active: true,
      ...(startDate &&
        endDate && {
          date: {
            gte: startDate,
            lte: endDate
          }
        })
    }

    const [transactions, total, incomeSummary, expenseSummary] =
      await prisma.$transaction([
        prisma.transaction.findMany({
          where,
          include: {
            category: {
              select: {
                id: true,
                name: true
              }
            }
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            date: sortBy
          }
        }),
        prisma.transaction.count({
          where
        }),
        prisma.transaction.aggregate({
          where: {
            ...where,
            type: TransactionType.INCOME
          },
          _sum: {
            amount: true
          }
        }),
        prisma.transaction.aggregate({
          where: {
            ...where,
            type: TransactionType.EXPENSE
          },
          _sum: {
            amount: true
          }
        })
      ])

    const income = Number(incomeSummary._sum.amount ?? 0)
    const expense = Number(expenseSummary._sum.amount ?? 0)

    return {
      transactions,
      total,
      summary: {
        income,
        expense,
        balance: income - expense
      }
    }
  }

  async save(transaction: Transaction): Promise<void> {
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: transaction
    })
  }

  async export(
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
  > {
    const normalizedCategory = category === 'all' ? undefined : Number(category)
    const startDate = new Date(`${dateFrom}T00:00:00.000Z`)
    const endDate = new Date(`${dateTo}T23:59:59.999Z`)

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        active: true,
        ...(normalizedCategory && { categoryId: normalizedCategory }),
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    return transactions.map(transaction => ({
      Descricao: transaction.description,
      Categoria: transaction.category.name,
      Data: transaction.date,
      Metodo: transaction.method,
      Valor: Number(transaction.amount)
    }))
  }
}
