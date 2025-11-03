# Back Office EBCO - Frontend

Sistema de gestión operacional para proyectos de construcción. Frontend moderno construido con **Next.js 16**, **Tailwind CSS v4** y **React 19**.

---

## Inicio Rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Documentación Principal

- **[ARQUITECTURA.md](./ARQUITECTURA.md)** - Estructura, carpetas y convenciones
- **[FLUJO_DESARROLLO.md](./FLUJO_DESARROLLO.md)** - Cómo agregar funcionalidades (con ejemplo Login)

---

## Estructura Resumida

```
src/
├── app/           # Páginas y rutas (App Router)
├── components/    # UI global (Sidebar, Footer, Cards, Tabs)
├── modules/       # Lógica por área (logistica, productos, analisis, auth, etc.)
├── lib/           # Config de Backend, tipos compartidos, cliente HTTP
└── providers/     # Context Providers globales (Auth, Theme)
```

---

## Características

✅ Autenticación con Context Provider
✅ Diseño Responsive (Tailwind CSS v4)
✅ Componentes reutilizables
✅ Separación clara de responsabilidades
✅ TypeScript en todas partes
✅ Estructura escalable y mantenible

---

## Comandos

```bash
npm run dev       # Desarrollo
npm run build     # Producción
npm run start     # Ejecutar build
npm run lint      # Linting
```

---

## Variables de Entorno

`.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Paleta de Colores

- `brand-red` #D90429 (Rojo principal)
- `brand-dark` #212121 (Fondo oscuro)
- `brand-bg-light` #F4F4F4 (Fondo página)

---

## Próximos Pasos

1. Leer [ARQUITECTURA.md](./ARQUITECTURA.md) para entender la estructura
2. Leer [FLUJO_DESARROLLO.md](./FLUJO_DESARROLLO.md) para saber cómo desarrollar
3. Crear nuevas funcionalidades siguiendo el flujo

---

Todos los derechos reservados © 2025 EBCO
