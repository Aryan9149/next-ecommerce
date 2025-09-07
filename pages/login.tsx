import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('')
  const router = useRouter()
  const mergeGuestCart = async () => {
    try {
      const guest = JSON.parse(localStorage.getItem('guest_cart') || '[]')
      for (const it of guest) {
        await fetch('/api/cart', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ itemId: it.itemId, qty: it.qty }) })
      }
      localStorage.removeItem('guest_cart')
    } catch {}
  }
  const submit = async () => {
    const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
    if (res.ok) { await mergeGuestCart(); router.push('/shop') } else { alert('Login failed') }
  }
  return (
    <div style={{padding:20}}>
      <h1>Login</h1>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
      <button onClick={submit}>Login</button>
    </div>
  )
}
