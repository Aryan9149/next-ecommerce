import { useEffect, useState } from 'react'

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] as any[] })
  const [mode, setMode] = useState<'server'|'guest'>('server')

  const load = async () => {
    const res = await fetch('/api/cart')
    if (res.status === 401) {
      setMode('guest')
      const guest = JSON.parse(localStorage.getItem('guest_cart') || '[]')
      setCart({ items: guest.map((g:any)=>({ itemId: { _id: g.itemId, title: 'Guest item', price: 0 }, qty: g.qty })) })
    } else {
      setMode('server')
      const data = await res.json()
      setCart(data)
    }
  }

  useEffect(()=>{ load() }, [])

  const remove = async (id:string) => {
    if (mode==='guest') {
      const guest = JSON.parse(localStorage.getItem('guest_cart') || '[]').filter((it:any)=> it.itemId !== id)
      localStorage.setItem('guest_cart', JSON.stringify(guest))
      await load()
    } else {
      await fetch('/api/cart', { method: 'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ itemId: id }) })
      await load()
    }
  }

  const total = (cart.items||[]).reduce((s:any,it:any)=> s + (it.itemId?.price||0)*it.qty, 0)

  return (
    <div style={{padding:20}}>
      <h1>Your Cart</h1>
      <p>Mode: {mode}</p>
      <div style={{display:'grid', gap:8}}>
        {(cart.items||[]).map((it:any)=>(
          <div key={it.itemId?._id || Math.random()} style={{display:'flex', justifyContent:'space-between', border:'1px solid #ddd', padding:12, borderRadius:10}}>
            <div>
              <div style={{fontWeight:600}}>{it.itemId?.title}</div>
              <div style={{color:'#666'}}>Qty: {it.qty}</div>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <div>₹{(it.itemId?.price||0)*it.qty}</div>
              <button onClick={()=>remove(it.itemId?._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div><strong>Total: ₹{total}</strong></div>
        <button>Checkout</button>
      </div>
    </div>
  )
}
