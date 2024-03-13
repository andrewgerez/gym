import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../prisma/check-ins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const user = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameDate = this.items.find((checkIn) => checkIn.user_id === userId)

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }
}
