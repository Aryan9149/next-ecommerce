import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Signup() {
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('')
  const router = useRouter()
  const submit = async () => {
    const res = await fetch('/api/auth/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password }) })
    if (res.ok) router.push('/shop'); else alert('Failed')
  }
  return (
    <div style={{padding:20}}>
      <h1>Sign up</h1>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} /><br/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
      <button onClick={submit}>Sign up</button>
    </div>
  )
}
