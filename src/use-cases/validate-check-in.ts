import { CheckIn } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository"
import { GymsRepository } from "@/repositories/prisma/gyms-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { getDistanceBetweenCoordinate } from "@/utils/get-distance-between-coordinates"
import { Distance } from "@/enums"
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error"
import { MaxDistanceError } from "./errors/max-distance-error"
import dayjs from "dayjs"
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error"

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({ 
    checkInId
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)
    
    return {
      checkIn,
    }
  }
}
