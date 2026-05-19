import { verifyToken } from './auth'
import { NextRequest } from 'next/server'

export async function isAuthenticated(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }

  const token = authHeader.split(' ')[1]
  const payload = await verifyToken(token)

  return payload !== null
}
