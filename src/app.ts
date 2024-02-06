import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'

export const app = fastify()

app.register(cookie, {
    secret: 'talvez-seja-secreta',
    hook: 'onRequest'
})

app.register(createPoll)
app.register(getPoll)