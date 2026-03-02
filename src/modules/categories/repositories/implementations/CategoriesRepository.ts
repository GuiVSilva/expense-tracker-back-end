import type { Categories } from '../../../../../generated/prisma/client.js'
import { prisma } from '../../../../../lib/prisma.js'
import type { ICategoriesRepository } from '../ICategoriesRepository.js'

export class CategoriesRepository implements ICategoriesRepository {
  async findAll(): Promise<Categories[]> {
    const categories = await prisma.categories.findMany()
    return categories
  }
}
