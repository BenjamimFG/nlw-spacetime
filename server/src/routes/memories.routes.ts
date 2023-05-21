import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../services/prisma.service'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (req) => {
    await req.jwtVerify()
  })

  app.get('/memories', async (req) => {
    const userId = req.user.sub

    const memories = await prisma.memory.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
        createdAt: memory.createdAt,
      }
    })
  })

  app.get('/memories/:id', async (req, res) => {
    const userId = req.user.sub

    const paramsSchema = z.object({ id: z.string().uuid() })

    const { id } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId !== userId)
      return res.status(401).send()

    return memory
  })

  app.post('/memories', async (req) => {
    const userId = req.user.sub

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(req.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId,
      },
    })

    return memory
  })

  app.put('/memories/:id', async (req, res) => {
    const userId = req.user.sub

    const paramsSchema = z.object({ id: z.string().uuid() })
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { id } = paramsSchema.parse(req.params)
    const { content, coverUrl, isPublic } = bodySchema.parse(req.body)

    let memory = await prisma.memory.findUniqueOrThrow({ where: { id } })

    if (memory.userId !== userId) return res.status(401).send()

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    return memory
  })

  app.delete('/memories/:id', async (req, res) => {
    const userId = req.user.sub

    const paramsSchema = z.object({ id: z.string().uuid() })

    const { id } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.findUniqueOrThrow({ where: { id } })

    if (memory.userId !== userId) return res.status(401).send()

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
