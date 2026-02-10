import type { FastifyInstance } from 'fastify'
import { AuthenticateController } from '../../../modules/auth/useCases/authenticate/AuthenticateController.js'

const authenticateController = new AuthenticateController()

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', (request, reply) =>
    authenticateController.handle(request, reply)
  )
}
