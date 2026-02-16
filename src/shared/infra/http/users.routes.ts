import type { FastifyInstance } from 'fastify'
import { CreateUserController } from '../../../modules/users/useCases/createUser/CreateUserController.js'
import { SendForgotPasswordMailController } from '../../../modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController.js'
import { VerifyCodeController } from '../../../modules/users/useCases/verifyCode/VerifyCodeUseCaseController.js'
import { ResetPasswordController } from '../../../modules/users/useCases/resetPassword/ResetPasswordController.js'

const createUserController = new CreateUserController()
const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const verifyCodeController = new VerifyCodeController()
const resetPasswordController = new ResetPasswordController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sign-up', (request, reply) =>
    createUserController.handle(request, reply)
  )

  app.post('/password/forgot', (request, reply) =>
    sendForgotPasswordMailController.handle(request, reply)
  )

  app.post('/password/verify', (request, reply) =>
    verifyCodeController.handle(request, reply)
  )
  app.post('/password/reset', (request, reply) =>
    resetPasswordController.handle(request, reply)
  )
}
