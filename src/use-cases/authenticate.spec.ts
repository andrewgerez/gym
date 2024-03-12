import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository= new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const email = 'drewdev@dev.com'

    await usersRepository.create({
      name: 'Drew Developer',
      email,
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email,
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(async () => {
      await sut.execute({
        email: 'drewdev@dev.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'drewdev@dev.com'

    await usersRepository.create({
      name: 'Drew Developer',
      email,
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email,
        password: '123123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
