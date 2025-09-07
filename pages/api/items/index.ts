import type { NextApiRequest, NextApiResponse } from 'next'
import Item from '../../../models/Item'
import { dbConnect } from '../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  if (req.method === 'GET') {
    const { category, minPrice, maxPrice, q } = req.query
    const filter: any = {}
    if (category) filter.category = category
    if (minPrice || maxPrice) filter.price = {
      ...(minPrice ? { $gte: Number(minPrice) } : {}),
      ...(maxPrice ? { $lte: Number(maxPrice) } : {}),
    }
    if (q) filter.title = { $regex: String(q), $options: 'i' }
    const items = await Item.find(filter).sort({ createdAt: -1 })
    return res.status(200).json(items)
  }
  if (req.method === 'POST') {
    const item = await Item.create(req.body)
    return res.status(201).json(item)
  }
  return res.status(405).end()
}
