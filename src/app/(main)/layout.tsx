import '../globals.css'
import React from 'react'
import Sidebar from '../../components/layout/Sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <main style={{ flex: 1, marginLeft: 256 }}>{children}</main>
        </div>
      </body>
    </html>
  )
}
