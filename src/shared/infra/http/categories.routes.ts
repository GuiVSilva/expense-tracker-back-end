import type { FastifyInstance } from 'fastify'
import { FindAllCategoriesController } from '../../../modules/categories/useCases/findAllCategories/FindAllCategoriesController.js'

const findAllCategoriesController = new FindAllCategoriesController()

export async function categoriesRoutes(app: FastifyInstance) {
  app.get('/all-categories', (request, reply) =>
    findAllCategoriesController.handle(request, reply)
  )
}
