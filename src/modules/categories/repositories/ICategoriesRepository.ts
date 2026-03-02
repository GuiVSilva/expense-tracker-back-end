import type { Categories } from '../../../../generated/prisma/client.js'

export interface ICategoriesRepository {
  findAll(): Promise<Categories[]>
}
