import type { FastifyInstance } from 'fastify'
import { CreateUserController } from '../../../modules/users/useCases/createUser/CreateUserController.js'
import { SendForgotPasswordMailController } from '../../../modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController.js'

const createUserController = new CreateUserController()
const sendForgotPasswordMailController = new SendForgotPasswordMailController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sign-up', (request, reply) =>
    createUserController.handle(request, reply)
  )

  app.post('/password/forgot', (request, reply) =>
    sendForgotPasswordMailController.handle(request, reply)
  )
}
