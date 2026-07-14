import type { FinancialAccount } from '../../../../../generated/prisma/client.js'
import { AccountStatus } from '../../../../../generated/prisma/enums.js'
import { prisma } from '../../../../../lib/prisma.js'
import type { ICreateFinancialAccountDTO } from '../../dto/ICreateFinancialAccountDTO.js'
import { accountStatusMap } from '../../mappers/accountStatusMapper.js'
import { accountTypeMap } from '../../mappers/accountTypeMapper.js'
import type { IFinancialAccountRepository } from '../IFinancialAccountRepository.js'

export class FinancialAccountRepository implements IFinancialAccountRepository {
  async create(data: ICreateFinancialAccountDTO): Promise<FinancialAccount> {
    const financialAccount = await prisma.financialAccount.create({ data })
    return financialAccount
  }

  async findById(id: number): Promise<FinancialAccount | null> {
    return await prisma.financialAccount.findUnique({ where: { id } })
  }

  async findByIdAndUserId(
    id: number,
    userId: string
  ): Promise<FinancialAccount | null> {
    return await prisma.financialAccount.findFirst({ where: { id, userId } })
  }

  async list(
    page: number,
    limit: number,
    search: string,
    type: string,
    status: string,
    category: string,
    userId: string
  ): Promise<{
    accounts: FinancialAccount[]
    total: number
    summary: { receive: number; payment: number; winning: number; late: number }
  }> {
    const normalizedSearch = search.trim()
    const normalizedType =
      type === 'all'
        ? undefined
        : accountTypeMap[type as keyof typeof accountTypeMap]

    const normalizedStatus =
      status === 'all'
        ? undefined
        : accountStatusMap[status as keyof typeof accountStatusMap]
    const normalizedCategory = category === 'all' ? undefined : Number(category)

    const now = new Date()
    const today = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    )
    const tomorrow = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    )

    const where = {
      userId,
      description: {
        contains: normalizedSearch,
        mode: 'insensitive' as const
      },
      ...(normalizedType && { type: normalizedType }),
      ...(normalizedStatus &&
        normalizedStatus !== AccountStatus.OVERDUE && {
          status: normalizedStatus
        }),
      ...(normalizedStatus === AccountStatus.OVERDUE && {
        dueDate: { lt: today },
        status: { notIn: [AccountStatus.PAID, AccountStatus.CANCELED] }
      }),
      ...(normalizedCategory && { categoryId: normalizedCategory })
    }

    const [
      accounts,
      total,
      receiveResult,
      paymentResult,
      winningResult,
      lateResult
    ] = await prisma.$transaction([
      prisma.financialAccount.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true
            }
          },
          financialAccountPayments: true
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.financialAccount.count({ where }),
      prisma.financialAccount.aggregate({
        where: {
          userId,
          type: 'RECEIVABLE',
          status: { notIn: [AccountStatus.PAID, AccountStatus.CANCELED] }
        },
        _sum: { amount: true }
      }),
      prisma.financialAccount.aggregate({
        where: {
          userId,
          type: 'PAYABLE',
          status: { notIn: [AccountStatus.PAID, AccountStatus.CANCELED] }
        },
        _sum: { amount: true }
      }),
      prisma.financialAccount.count({
        where: {
          userId,
          dueDate: {
            gte: today,
            lt: tomorrow
          },
          status: { notIn: [AccountStatus.PAID, AccountStatus.CANCELED] }
        }
      }),
      prisma.financialAccount.count({
        where: {
          userId,
          dueDate: { lt: today },
          status: { notIn: [AccountStatus.PAID, AccountStatus.CANCELED] }
        }
      })
    ])

    const receive = Number(receiveResult._sum.amount) || 0
    const payment = Number(paymentResult._sum.amount) || 0
    const winning = winningResult
    const late = lateResult

    return { accounts, total, summary: { receive, payment, winning, late } }
  }

  async listByMonth(
    year: number,
    month: number,
    userId: string
  ): Promise<FinancialAccount[]> {
    const startDate = new Date(Date.UTC(year, month - 1, 1))
    const endDate = new Date(Date.UTC(year, month, 0))
    endDate.setUTCHours(23, 59, 59, 999)

    const accounts = await prisma.financialAccount.findMany({
      where: {
        userId,
        dueDate: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return accounts
  }

  async delete(id: number): Promise<void> {
    await prisma.financialAccount.delete({ where: { id } })
  }

  async save(account: FinancialAccount): Promise<void> {
    await prisma.financialAccount.update({
      where: { id: account.id },
      data: account
    })
  }
}
