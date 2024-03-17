import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'Andrew Gerez',
      email: 'andrew_gerez@dev.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    }
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'andrew_gerez@dev.com',
      password: '123456',
    })

  const { token } = authResponse.body

  return {
    token,
  }
}
