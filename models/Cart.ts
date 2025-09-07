import { Schema, Types, models, model } from 'mongoose'

const CartSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', unique: true, required: true },
  items: [{
    itemId: { type: Types.ObjectId, ref: 'Item', required: true },
    qty: { type: Number, default: 1, min: 1 },
  }],
}, { timestamps: true })

export default models.Cart || model('Cart', CartSchema)
