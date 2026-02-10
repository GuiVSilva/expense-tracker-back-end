import type { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '../../../errors/AppError.js'

export async function ensureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify()
  } catch (err) {
    throw new AppError('Sessão inválida ou expirada.', 401)
  }
}
