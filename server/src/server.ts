import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { memoriesRoutes } from './routes/memories.routes'
import { authRoutes } from './routes/auth.routes'
import config from './config'

const app = fastify()

// TODO: change origin in production
app.register(cors, { origin: true })
app.register(jwt, { secret: config.JWT_SECRET })

app.register(memoriesRoutes)
app.register(authRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => console.log('Server running on http://localhost:3333'))
