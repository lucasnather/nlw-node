import { FastifyInstance } from "fastify";

export async function voteResults(app: FastifyInstance) {

    app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
       
    })
}