import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function createPoll(app: FastifyInstance) {

    app.post('/polls', async (request, reply) => {

        const getBodySchema = z.object({
            title: z.string(),
            options: z.array(z.string())
        })

        const { title, options } = getBodySchema.parse(request.body)

        const polls = await prisma.poll.create({
            data: {
                title,
                PollsOption: {
                    createMany: {
                        data: options.map(option => {
                            return { title: option }
                        })
                    }
                }
            }
        })

        return reply.status(201).send({
            polls
        })
    })
}