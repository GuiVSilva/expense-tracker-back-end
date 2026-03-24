import type { FastifyInstance } from 'fastify'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated.js'
import { CreateTransactionController } from '../../../modules/transactions/useCases/createTransaction/CreateTransactionController.js'
import { ListTransactionsController } from '../../../modules/transactions/useCases/listTransactions/ListTransactionsController.js'
import type { ListTransactionsQuery } from '../../../modules/transactions/useCases/listTransactions/ListTransactionsController.js'
import {
  DeleteTransactionController,
  type DeleteTransactionBody
} from '../../../modules/transactions/useCases/deleteTransaction/DeleteTransactionController.js'
import {
  ExportTransactionsController,
  type ExportTransactionsQuery
} from '../../../modules/transactions/useCases/exportTransactions/ExportTransactionsController.js'

const createTransactionController = new CreateTransactionController()
const listTransactionsController = new ListTransactionsController()
const deleteTransactionController = new DeleteTransactionController()
const exportTransactionsController = new ExportTransactionsController()

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)

  app.post('/', (request, reply) =>
    createTransactionController.handle(request, reply)
  )

  app.get<{ Querystring: ListTransactionsQuery }>('/', (request, reply) =>
    listTransactionsController.handle(request, reply)
  )

  app.put<{ Body: DeleteTransactionBody }>('/delete', (request, reply) =>
    deleteTransactionController.handle(request, reply)
  )

  app.get<{ Querystring: ExportTransactionsQuery }>(
    '/export',
    (request, reply) => exportTransactionsController.handle(request, reply)
  )
}
