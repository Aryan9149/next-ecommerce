import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import User from '../../../models/User'
import { dbConnect } from '../../../lib/db'
import { signJWT } from '../../../lib/jwt'
import cookie from 'cookie'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password, name } = req.body
  await dbConnect()
  const existing = await User.findOne({ email })
  if (existing) return res.status(400).json({ message: 'Email already registered' })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ email, passwordHash, name })
  const token = signJWT({ id: user._id })
  res.setHeader('Set-Cookie', cookie.serialize('token', token, { httpOnly:true, path:'/', maxAge:60*60*24*7 }))
  return res.status(201).json({ id: user._id, email: user.email, name: user.name })
}
