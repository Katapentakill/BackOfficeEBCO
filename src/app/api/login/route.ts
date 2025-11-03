import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}))
  // credenciales de ejemplo: cámbialas por las reales o integra con tu backend
  const valid =
    (email === 'admin@example.com' && password === 'password123') ||
    (email === 'user@example.com' && password === 'password123')

  if (!valid) {
    return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  // cookie segura: httpOnly, path=/, duración 1h
  res.cookies.set('ebco_token', '1', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })
  return res
}