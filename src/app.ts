import fastify from 'fastify'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'
import { createPoll } from './http/routes/create-poll'
import { getPoll } from './http/routes/get-poll'
import { createVotes } from './http/routes/create-votes'
import { voteResults } from './ws/routes/vote-results'

export const app = fastify()

app.register(cookie, {
    secret: 'talvez-seja-secreta',
    hook: 'onRequest'
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(createVotes)
app.register(voteResults)