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
import {
  UpdateAccountController,
  type EditAccountBody
} from '../../../modules/financial-accounts/useCases/updateAccount/UpdateAccountController.js'
import {
  PaymentAccountController,
  type RegisterPaymentAccountBody
} from '../../../modules/financial-accounts/useCases/paymentAccount/PaymentAccountController.js'
import {
  DeleteAccountController,
  type DeleteAccountQuery
} from '../../../modules/financial-accounts/useCases/deleteAccount/DeleteAccountController.js'
import {
  ListAccountByMonthController,
  type ListAccountsByMonthQuery
} from '../../../modules/financial-accounts/useCases/listAccountByMonth/ListAccountByMonthController.js'

const createAccountController = new CreateAccountController()
const listAccountController = new ListAccountController()
const updateAccountController = new UpdateAccountController()
const paymentAccountController = new PaymentAccountController()
const deleteAccountController = new DeleteAccountController()
const listAccountByMonthController = new ListAccountByMonthController()

export async function financialAccountsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureAuthenticated)

  app.post<{ Body: CreateAccountBody }>('/', (request, reply) => {
    createAccountController.handle(request, reply)
  })

  app.get<{ Querystring: ListAccountsQuery }>('/', (request, reply) => {
    listAccountController.handle(request, reply)
  })

  app.put<{ Body: EditAccountBody }>('/', (request, reply) => {
    updateAccountController.handle(request, reply)
  })

  app.post<{ Body: RegisterPaymentAccountBody }>('/pay', (request, reply) => {
    paymentAccountController.handle(request, reply)
  })

  app.delete<{ Querystring: DeleteAccountQuery }>(
    '/delete',
    (request, reply) => {
      deleteAccountController.handle(request, reply)
    }
  )

  app.get<{ Querystring: ListAccountsByMonthQuery }>(
    '/by-month',
    (request, reply) => {
      listAccountByMonthController.handle(request, reply)
    }
  )
}
