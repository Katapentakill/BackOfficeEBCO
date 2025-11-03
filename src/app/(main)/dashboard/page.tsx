'use client'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard - Área privada</h1>
      <p>Bienvenido. Sólo visible si iniciaste sesión.</p>
      <button onClick={logout} style={{ marginTop: 16 }}>Cerrar sesión</button>
    </main>
  )
}