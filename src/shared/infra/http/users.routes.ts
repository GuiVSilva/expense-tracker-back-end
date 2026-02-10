import type { FastifyInstance } from 'fastify'
import { CreateUserController } from '../../../modules/users/useCases/createUser/CreateUserController.js'

const createUserController = new CreateUserController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sign-up', (request, reply) =>
    createUserController.handle(request, reply)
  )
}
