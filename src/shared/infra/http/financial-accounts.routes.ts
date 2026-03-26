import type { FastifyInstance } from 'fastify'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated.js'
import {
  CreateAccountController,
  type CreateAccountBody
} from '../../../modules/financial-accounts/useCases/createAccount/CreateAccountController.js'
import {
  ListAccountController,
  type ListAccountsQuery
} from '../../../modules/financial-accounts/useCases/listAccount/ListAccountController.js'

const createAccountController = new CreateAccountController()
const listAccountController = new ListAccountController()

export async function financialAccountsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)

  app.post<{ Body: CreateAccountBody }>('/', (request, reply) => {
    createAccountController.handle(request, reply)
  })

  app.get<{ Querystring: ListAccountsQuery }>('/', (request, reply) => {
    listAccountController.handle(request, reply)
  })
}
