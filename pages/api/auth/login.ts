import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import User from '../../../models/User'
import { dbConnect } from '../../../lib/db'
import { signJWT } from '../../../lib/jwt'
import cookie from 'cookie'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  await dbConnect()
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
  const token = signJWT({ id: user._id })
  res.setHeader('Set-Cookie', cookie.serialize('token', token, { httpOnly:true, path:'/', maxAge:60*60*24*7 }))
  return res.status(200).json({ id: user._id, email: user.email, name: user.name })
}
