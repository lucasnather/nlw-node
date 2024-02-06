import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function createVotes(app: FastifyInstance) {

    app.post('/polls/:pollId/votes', async (request, reply) => {

        const getParamsSchema = z.object({
            pollId: z.string().uuid()
        })

        const getBodySchema = z.object({
            pollsOptionId: z.string().uuid()
        })

        const { pollId } = getParamsSchema.parse(request.params)
        const { pollsOptionId } = getBodySchema.parse(request.body)

        let { sessionId } = request.cookies

        if(sessionId) {
            const findVotesPoll = await prisma.votes.findUnique({
                where: {
                    sessionId_pollId: {
                        sessionId,
                        pollId
                    }
                }
            })

            if(findVotesPoll && findVotesPoll.pollsOptionId !== pollsOptionId) {
                await prisma.votes.delete({
                    where: {
                        id: findVotesPoll.id
                    }
                })
            } else if(findVotesPoll) {
                return reply.send({
                    message: 'You already voted in this poll'
                })
            }
        }

        if(!sessionId) {
            sessionId = randomUUID()

            reply.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30, //30days,
                signed: true,
                httpOnly: true,
                sameSite: true
            })
        }

        await prisma.votes.create({
            data: {
                sessionId,
                pollId,
                pollsOptionId
            }
        })

        return reply.status(201).send()
    })
}