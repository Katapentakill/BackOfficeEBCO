'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SidebarClient() {
  const [visible, setVisible] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const cookieHeader = typeof document !== 'undefined' ? document.cookie : ''
    const hasClient = cookieHeader
      .split(';')
      .map(s => s.trim())
      .some(s => s.startsWith('ebco_client=') || s.startsWith('ebco_token='))
    setVisible(hasClient)
  }, [])

  if (visible === null) return null
  if (!visible) return null

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    document.cookie = 'ebco_client=; path=/; max-age=0'
    document.cookie = 'ebco_token=; path=/; max-age=0'
    router.push('/')
  }

  return (
    <aside style={{ width: 260, background: '#111', color: '#fff', minHeight: '100vh' }}>
      <div style={{ padding: 20 }}>
        <h2 style={{ color: '#e31b2d', margin: 0 }}>EB CO</h2>
        <div style={{ fontSize: 13, opacity: 0.9, marginTop: 8 }}>BACK OFFICE</div>
        <nav style={{ marginTop: 24 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '12px 10px', background: '#c71d2b', color: '#fff', borderRadius: 8, marginBottom: 12 }}>Inicio</li>
            <li style={{ padding: '10px 8px', marginBottom: 8 }}>Manual Op. Back Office</li>
            <li style={{ padding: '10px 8px', marginBottom: 8 }}>Área Logística</li>
            <li style={{ padding: '10px 8px', marginBottom: 8 }}>Productos y Soportes</li>
            <li style={{ padding: '10px 8px' }}>Análisis de Datos</li>
          </ul>
        </nav>
        <button onClick={logout} style={{ marginTop: 20, background: '#222', color: '#fff', border: 0, padding: '8px 12px', borderRadius: 6 }}>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}