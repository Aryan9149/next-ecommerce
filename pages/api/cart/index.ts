import type { NextApiRequest, NextApiResponse } from 'next'
import Cart from '../../../models/Cart'
import { dbConnect } from '../../../lib/db'
import { verifyJWT } from '../../../lib/jwt'
import cookie from 'cookie'

function getTokenFromReq(req: NextApiRequest) {
  const header = req.headers.cookie || ''
  const parsed = cookie.parse(header || '')
  return parsed.token
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  const token = getTokenFromReq(req)
  const user = token ? verifyJWT(token) : null
  if (!user) return res.status(401).json({ message: 'Unauthorized' })

  if (req.method === 'GET') {
    const cart = await Cart.findOne({ userId: user.id }).populate('items.itemId')
    return res.status(200).json(cart || { userId: user.id, items: [] })
  }

  if (req.method === 'POST') {
    const { itemId, qty = 1 } = req.body
    const cart = (await Cart.findOne({ userId: user.id })) || await Cart.create({ userId: user.id, items: [] })
    const idx = cart.items.findIndex((it: any) => String(it.itemId) === String(itemId))
    if (idx >= 0) cart.items[idx].qty += qty
    else cart.items.push({ itemId, qty })
    await cart.save()
    return res.status(200).json(cart)
  }

  if (req.method === 'DELETE') {
    const { itemId } = req.body
    const cart = await Cart.findOne({ userId: user.id })
    if (!cart) return res.status(200).json({ userId: user.id, items: [] })
    cart.items = cart.items.filter((it: any) => String(it.itemId) !== String(itemId))
    await cart.save()
    return res.status(200).json(cart)
  }

  return res.status(405).end()
}
