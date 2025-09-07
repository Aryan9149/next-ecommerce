import { Schema, models, model } from 'mongoose'

const ItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, index: true },
  imageUrl: { type: String, default: '/placeholder.png' },
}, { timestamps: true })

export default models.Item || model('Item', ItemSchema)
