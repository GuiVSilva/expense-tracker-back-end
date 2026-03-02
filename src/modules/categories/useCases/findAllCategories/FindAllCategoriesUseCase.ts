import { inject, injectable } from 'tsyringe'
import type { ICategoriesRepository } from '../../repositories/ICategoriesRepository.js'
import type { Categories } from '../../../../../generated/prisma/client.js'

@injectable()
export class FindAllCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Categories[]> {
    return await this.categoriesRepository.findAll()
  }
}
