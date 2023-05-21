import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface User {
  sub: string
  name: string
  avatarUrl: string
}

export function getUser(): User {
  const jwt = cookies().get('jwt')?.value

  if (!jwt) throw new Error('Not Authenticated')

  const user: User = decode(jwt)

  return user
}
