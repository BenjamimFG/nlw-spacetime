import '@fastify/jwt'

declare module '@fastify/jwt' {
  // Declaration of interface for JWT info
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      avatarUrl: string
    }
  }
}
