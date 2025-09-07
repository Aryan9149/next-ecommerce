import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET) throw new Error('JWT_SECRET missing')

export function signJWT(payload: object, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyJWT(token: string) {
  try { return jwt.verify(token, JWT_SECRET) as any } catch { return null }
}
