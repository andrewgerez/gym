import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server)
    .post('/users')
    .send({
      name: 'Andrew Gerez',
      email: 'andrew_gerez@dev.com',
      password: 'password123',
    })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'andrew_gerez@dev.com',
      password: 'password123',
    })

  const { token } = authResponse.body

  return {
    token,
  }
}
