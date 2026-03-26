import type { FastifyInstance } from 'fastify'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated.js'
import {
  CreateAccountController,
  type CreateAccountBody
} from '../../../modules/financial-accounts/useCases/createAccount/CreateAccountController.js'

const createAccountController = new CreateAccountController()

export async function financialAccountsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)

  app.post<{ Body: CreateAccountBody }>('/', (request, reply) => {
    createAccountController.handle(request, reply)
  })
}
