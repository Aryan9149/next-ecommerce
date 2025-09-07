import { useEffect, useState } from 'react'

export default function Shop() {
  const [items, setItems] = useState([])

  async function fetchItems() {
    const res = await fetch('/api/items')
    const data = await res.json()
    setItems(data)
  }

  useEffect(()=>{ fetchItems() }, [])

  const add = async (id:string) => {
    const res = await fetch('/api/cart', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ itemId: id, qty: 1 }) })
    if (res.status === 401) {
      const guest = JSON.parse(localStorage.getItem('guest_cart') || '[]')
      const idx = guest.findIndex((it:any)=> it.itemId === id)
      if (idx>=0) guest[idx].qty += 1; else guest.push({ itemId: id, qty: 1 })
      localStorage.setItem('guest_cart', JSON.stringify(guest))
      alert('Added to cart (guest). Login to sync!')
    } else {
      alert('Added to cart')
    }
  }

  return (
    <div style={{padding:20}}>
      <h1>Shop</h1>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12}}>
        {items.map((it:any)=>(
          <div key={it._id} style={{border:'1px solid #ddd', padding:12, borderRadius:12}}>
            <h3>{it.title}</h3>
            <p>{it.description}</p>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <strong>₹{it.price}</strong>
              <button onClick={()=>add(it._id)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
