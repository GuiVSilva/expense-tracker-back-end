import type { FastifyInstance } from 'fastify'
import { usersRoutes } from './users.routes.js'
import { authRoutes } from './auth.routes.js'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })
  app.register(authRoutes, { prefix: '/auth' })
}
