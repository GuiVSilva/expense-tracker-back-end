import type { FastifyInstance } from 'fastify'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated.js'

export async function transactionsRoutes(app: FastifyInstance) {
  //app.addHook('onRequest', ensureAuthenticated)
  // app.post('/transactions', { onRequest: [ensureAuthenticated] }, transactionController.handle)
}
