import type { NextApiRequest, NextApiResponse } from 'next'
import Item from '../../../models/Item'
import { dbConnect } from '../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  const { id } = req.query
  if (req.method === 'PUT') {
    const updated = await Item.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json(updated)
  }
  if (req.method === 'DELETE') {
    await Item.findByIdAndDelete(id)
    return res.status(204).end()
  }
  return res.status(405).end()
}
