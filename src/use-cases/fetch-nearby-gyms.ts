import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/prisma/gyms-repository'

interface FetchNearbyUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ 
    userLatitude,
    userLongitude
  }: FetchNearbyUseCaseRequest): Promise<FetchNearbyUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({ 
      latitude: userLatitude,
      longitude: userLongitude
    })

    return {
      gyms,
    }
  }
}
