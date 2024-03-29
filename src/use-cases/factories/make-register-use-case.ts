import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase () {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(prismaUsersRepository)

  return useCase
}
