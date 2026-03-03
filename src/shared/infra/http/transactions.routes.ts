import type { FastifyInstance } from 'fastify'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated.js'
import { CreateTransactionController } from '../../../modules/transactions/useCases/createTransaction/CreateTransactionController.js'

const createTransactionController = new CreateTransactionController()

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)

  app.post('/', (request, reply) =>
    createTransactionController.handle(request, reply)
  )
}
