import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeCheckInUseCase () {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository, gymsRepository)

  return useCase
}
