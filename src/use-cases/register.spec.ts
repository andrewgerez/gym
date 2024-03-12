import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const email = 'drewdev@dev.com'

    const { user } = await sut.execute({
      name: 'Drew Developer',
      email,
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Drew Developer',
      email: 'drewdev@dev.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'drewdev@dev.com'

    await sut.execute({
      name: 'Drew Developer',
      email,
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'Drew Developer',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlredyExistsError)
  })
})
