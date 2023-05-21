import { FastifyInstance } from 'fastify'
import { URLSearchParams } from 'url'
import { z } from 'zod'

import { prisma } from '../services/prisma.service'
import config from '../config'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (req) => {
    const bodySchema = z.object({ code: z.string() })

    const { code } = bodySchema.parse(req.body)

    const urlParams = new URLSearchParams({
      code,
      client_id: config.GITHUB_CLIENT_ID,
      client_secret: config.GITHUB_CLIENT_SECRET,
    })

    const { access_token: accessToken } = await fetch(
      `https://github.com/login/oauth/access_token?${urlParams}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    ).then((res) => res.json())

    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json())

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userRes)

    let user = await prisma.user.findUnique({
      where: { githubId: userInfo.id },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
        },
      })
    }

    const jwt = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      { sub: user.id, expiresIn: '7 days' },
    )

    return {
      jwt,
    }
  })
}
