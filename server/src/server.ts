import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import serveStatic from '@fastify/static'

import { memoriesRoutes } from './routes/memories.routes'
import { authRoutes } from './routes/auth.routes'
import { uploadRoutes } from './routes/upload.routes'
import config from './config'
import { resolve } from 'path'

const app = fastify()

// TODO: change origin in production
app.register(cors, { origin: true })
app.register(jwt, { secret: config.JWT_SECRET })
app.register(multipart)
app.register(serveStatic, {
  root: resolve(__dirname, '..', 'uploads'),
  prefix: '/uploads',
})

app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => console.log('Server running on http://localhost:3333'))
