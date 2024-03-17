import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('E2E: Register', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Andrew Gerez',
        email: 'andrew_gerez@dev.com',
        password: 'password123',
      })

    expect(response.statusCode).toEqual(201)
  })
})
