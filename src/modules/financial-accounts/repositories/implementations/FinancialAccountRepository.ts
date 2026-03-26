import type { FinancialAccount } from '../../../../../generated/prisma/client.js'
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

  async list(
    page: number,
    limit: number,
    search: string,
    type: string,
    status: string,
    category: string,
    userId: string
  ): Promise<{ accounts: FinancialAccount[]; total: number }> {
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

    const where = {
      userId,
      description: {
        contains: normalizedSearch,
        mode: 'insensitive' as const
      },
      ...(normalizedType && { type: normalizedType }),
      ...(normalizedStatus && { status: normalizedStatus }),
      ...(normalizedCategory && { categoryId: normalizedCategory })
    }

    const [accounts, total] = await prisma.$transaction([
      prisma.financialAccount.findMany({
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
          createdAt: 'desc'
        }
      }),
      prisma.financialAccount.count({ where })
    ])
    return { accounts, total }
  }
}
