import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return (req: FastifyRequest, reply: FastifyReply) => {
    const { role } = req.user

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
