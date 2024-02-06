import fastify from 'fastify'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'

export const app = fastify()

app.register(createPoll)
app.register(getPoll)