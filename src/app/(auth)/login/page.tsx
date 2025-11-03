'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    setLoading(false)
    if (res.ok) {
      // cookie httpOnly la pone el servidor; añadimos cookie cliente para que SidebarClient la detecte
      document.cookie = 'ebco_client=1; path=/; max-age=3600'
      router.push('/dashboard')
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data?.message ?? 'Credenciales incorrectas')
    }
  }

  return (
    <main className="page">
      <h1 className="page-title">Bienvenido de Vuelta</h1>
      <p className="page-sub">Inicia sesión para continuar</p>

      <section className="card">
        <h2 className="card-title">Bienvenido</h2>
        <p className="card-sub">Ingresa a tu cuenta de EBCO</p>

        <form onSubmit={onSubmit} className="form" noValidate>
          <label className="field">
            <span className="label-text">Email</span>
            <div className="input-wrap">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
          </label>

          <label className="field">
            <span className="label-text">Contraseña</span>
            <div className="input-wrap">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </label>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
        </form>
      </section>
    </main>
  )
}
