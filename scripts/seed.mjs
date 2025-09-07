import mongoose from 'mongoose'
import 'dotenv/config'
import Item from '../models/Item.js'

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  await Item.deleteMany({})
  await Item.insertMany([
    { title: 'Wireless Headphones', description: 'ANC, Bluetooth 5.3', price: 2999, category: 'audio', imageUrl: '/placeholder.png' },
    { title: 'Mechanical Keyboard', description: 'Hot-swap, RGB', price: 4999, category: 'peripherals', imageUrl: '/placeholder.png' },
    { title: 'USB-C Charger', description: '65W GaN', price: 1999, category: 'power', imageUrl: '/placeholder.png' }
  ])
  console.log('Seeded')
  process.exit(0)
}
run()
