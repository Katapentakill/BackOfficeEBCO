import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // rutas públicas: página de login, API de login/logout, _next, assets, favicon...
  if (
    pathname === '/' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/public/')
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get('ebco_token')
  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// aplicar a todas las rutas de la app (excepto /_next, /api y archivos estáticos)
export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)']
}