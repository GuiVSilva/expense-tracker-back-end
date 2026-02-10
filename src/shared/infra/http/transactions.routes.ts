import type { FastifyInstance } from 'fastify'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated.js'

export async function transactionsRoutes(app: FastifyInstance) {
  // app.post('/transactions', { onRequest: [ensureAuthenticated] }, transactionController.handle)
}
