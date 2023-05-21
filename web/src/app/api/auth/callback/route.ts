import { api } from '@/services/api.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  const redirectTo = req.cookies.get('redirectTo')?.value

  const registerRes = await api.post('/register', { code })

  const { jwt } = registerRes.data

  const redirectUrl = redirectTo ?? new URL('/', req.url)

  // 7 days in seconds
  const cookieMaxAge = 7 * 24 * 60 * 60

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `jwt=${jwt}; Path=/; max-age=${cookieMaxAge};`,
    },
  })
}
