import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  await req.jwtVerify()

  return reply.status(200).send()
}
