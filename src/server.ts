import 'dotenv/config'
import 'reflect-metadata'
import './shared/container/index.js'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { appRoutes } from './shared/infra/http/index.js'
import { AppError } from './shared/errors/AppError.js'

const app = fastify()

app.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message
    })
  }

  console.error('❌ Internal Error:', error)

  return reply.status(500).send({
    status: 'error',
    message: 'Internal server error.'
  })
})

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
})

app.register(jwt, {
  secret: process.env.JWT_SECRET || 'fallback-secret-apenas-para-dev',
  sign: {
    expiresIn: '1d'
  }
})

app.register(appRoutes)

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('🚀 Server running on http://localhost:3333')
})
