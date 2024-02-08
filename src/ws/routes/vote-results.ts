import { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub";
import z from "zod";

export async function voteResults(app: FastifyInstance) {

    app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {

        const getParamsSchema = z.object({
            pollId: z.string().uuid()
        })

        const { pollId } = getParamsSchema.parse(request.params)
        
        voting.subscribe(pollId, (message) => {
            connection.socket.send(JSON.stringify(message))
        })
    })
}