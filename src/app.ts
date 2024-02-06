import fastify from 'fastify'
import { createPoll } from './routes/create-poll'

export const app = fastify()

app.register(createPoll)