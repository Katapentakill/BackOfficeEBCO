# Arquitectura del Frontend - Back Office EBCO

## Visión General

El frontend del Back Office EBCO está construido con **Next.js 16** utilizando el **App Router** y **Tailwind CSS v4**. La arquitectura sigue un patrón modular que separa claramente la lógica de negocio, presentación y tipos de datos.

---

## Estructura de Directorios

```
frontend/
├── public/                          # Recursos estáticos
├── src/
│   ├── app/                        # Rutas y páginas (App Router de Next.js)
│   │   ├── layout.tsx              # Layout raíz con Sidebar y Footer
│   │   ├── page.tsx                # Página principal (Home)
│   │   ├── globals.css             # Estilos globales y configuración Tailwind
│   │   ├── logistica/
│   │   │   └── page.tsx            # Página del área de Logística
│   │   ├── productos/
│   │   │   └── page.tsx            # Página de Productos y Soportes
│   │   ├── analisis/
│   │   │   └── page.tsx            # Página de Análisis de Datos
│   │   ├── organigrama/
│   │   │   └── page.tsx            # Página del Organigrama
│   │   └── manual/
│   │       └── page.tsx            # Página del Manual Operacional
│   │
│   ├── components/                 # Componentes reutilizables globales
│   │   ├── layout/                 # Componentes de estructura global
│   │   │   ├── Sidebar.tsx         # Barra lateral de navegación
│   │   │   └── Footer.tsx          # Pie de página con información de oficinas
│   │   └── ui/                     # Componentes de interfaz reutilizables
│   │       ├── InfoCard.tsx        # Tarjeta de información (reutilizable)
│   │       └── Tabs.tsx            # Sistema de pestañas para entregables
│   │
│   └── modules/                    # Módulos específicos por área de negocio
│       ├── logistica/              # Módulo Logística
│       │   ├── components/         # Componentes específicos de Logística
│       │   ├── hooks/              # Hooks personalizados (useLogistica, etc.)
│       │   ├── services/           # Servicios y llamadas API
│       │   └── types/              # Interfaces y tipos TypeScript
│       ├── productos/              # Módulo Productos y Soportes
│       │   ├── components/         # Componentes específicos de Productos
│       │   ├── hooks/              # Hooks personalizados
│       │   ├── services/           # Servicios y llamadas API
│       │   └── types/              # Interfaces y tipos TypeScript
│       └── analisis/               # Módulo Análisis de Datos
│           ├── components/         # Componentes específicos de Análisis
│           ├── hooks/              # Hooks personalizados
│           ├── services/           # Servicios y llamadas API
│           └── types/              # Interfaces y tipos TypeScript
│
├── tailwind.config.ts              # Configuración de Tailwind CSS
├── tsconfig.json                   # Configuración de TypeScript
├── next.config.ts                  # Configuración de Next.js
├── package.json                    # Dependencias del proyecto
└── ARQUITECTURA.md                 # Este archivo
```

---

## Descripción de Carpetas Clave

### 1. **`src/app/`** - Rutas y Páginas

Esta carpeta contiene la estructura de rutas usando el **App Router** de Next.js. Cada página se define con un archivo `page.tsx`.

**Características:**
- Rutas automáticas basadas en la estructura de carpetas
- Servidor por defecto (Server Components)
- Metadata y SEO integrados
- Layout jerárquico

**Páginas existentes:**
- `/` - Home (Manual Operacional)
- `/logistica` - Área Logística
- `/productos` - Productos y Soportes
- `/analisis` - Análisis de Datos
- `/organigrama` - Organigrama
- `/manual` - Manual Operacional

---

### 2. **`src/components/`** - Componentes Globales Reutilizables

Almacena componentes que se utilizan en múltiples páginas o áreas.

#### **`layout/`**
Componentes de estructura global:
- `Sidebar.tsx` - Navegación lateral fija con menú de áreas
- `Footer.tsx` - Pie de página con información de oficinas

#### **`ui/`**
Componentes de interfaz reutilizables:
- `InfoCard.tsx` - Tarjeta de información con icono, título, descripción y botón
- `Tabs.tsx` - Sistema de pestañas interactivas para entregables

**Nota:** Los componentes globales NO incluyen lógica de negocio. Solo manejan presentación y estado de UI básico.

---

### 3. **`src/modules/`** - Módulos Específicos por Área

Contiene la lógica de negocio, servicios y componentes específicos de cada área.

#### **Estructura de cada módulo (ej: `logistica/`):**

```
logistica/
├── components/              # Componentes específicos del módulo
│   ├── LogisticaHeader.tsx
│   ├── MaterialesCard.tsx
│   ├── ArriendosCard.tsx
│   └── DeliverablesList.tsx
├── hooks/                   # Hooks personalizados
│   ├── useLogisticaData.ts
│   └── useDeliverables.ts
├── services/                # Servicios y llamadas API
│   └── logisticaService.ts
└── types/                   # Interfaces y tipos
    └── index.ts             # Exporta: Material, Arriendo, Entregable, etc.
```

**Responsabilidades:**

- **`components/`** - Componentes específicos del módulo (no reutilizables globalmente)
- **`hooks/`** - Hooks personalizados para manejo de estado y efectos del módulo
- **`services/`** - Funciones para llamadas API, transformación de datos
- **`types/`** - Interfaces y tipos TypeScript específicos del módulo

**Ejemplo de uso en una página:**

```tsx
// app/logistica/page.tsx
import { LogisticaHeader } from "@/modules/logistica/components";
import { useLogisticaData } from "@/modules/logistica/hooks";
import type { Material } from "@/modules/logistica/types";
```

---

## Flujo de Datos

### 1. **Solicitud de Datos**
```
Página (page.tsx)
  ↓
Hooks del módulo (useLogisticaData)
  ↓
Servicios del módulo (logisticaService.ts)
  ↓
API Backend
```

### 2. **Presentación**
```
Página (page.tsx)
  ↓
Componentes globales (InfoCard, Tabs)
  ↓
Componentes del módulo (LogisticaHeader, MaterialesCard)
  ↓
HTML renderizado
```

---

## Convenciones de Código

### Nombres de Archivos
- **Componentes:** PascalCase (ej: `Sidebar.tsx`, `InfoCard.tsx`)
- **Hooks:** camelCase con prefijo `use` (ej: `useLogisticaData.ts`)
- **Servicios:** camelCase (ej: `logisticaService.ts`)
- **Tipos:** index.ts o camelCase (ej: `types.ts`)

### Componentes Client vs Server
- **Server Components** por defecto en Next.js 13+
- **Client Components** solo cuando se necesita interactividad (`"use client"`)

### Ejemplo de componente con estado:
```tsx
"use client";

import { useState } from "react";

export default function LogisticaDeliverables() {
  const [selectedTab, setSelectedTab] = useState("diarios");

  return (
    <div>
      {/* Contenido */}
    </div>
  );
}
```

---

## Estilos y Temas

### Tailwind CSS v4

**Configuración:**
- Colores definidos en `src/app/globals.css` con `@theme`
- Utiliza CSS variables para fácil personalización
- Colores brand:
  - `brand-red` (#D90429) - Principal
  - `brand-dark` (#212121) - Fondos oscuros
  - `brand-text-light` (#FFFFFF) - Texto claro
  - `brand-text-dark` (#333333) - Texto oscuro
  - `brand-bg-light` (#F4F4F4) - Fondo claro
  - `brand-bg-white` (#FFFFFF) - Fondo blanco

### Aplicar estilos en componentes:
```tsx
<div className="bg-brand-red text-brand-text-light p-4">
  Contenido
</div>
```

---

## Decisiones Arquitectónicas

### ¿Por qué esta estructura?

1. **Escalabilidad:** Cada módulo es independiente, facilitando el crecimiento
2. **Mantenibilidad:** La lógica está centralizada por área de negocio
3. **Reutilización:** Componentes globales para UI común, componentes específicos para lógica de negocio
4. **Claridad:** Separación clara entre presentación, lógica y tipos
5. **Testing:** Fácil de testear componentes, hooks y servicios de forma aislada

---

## Cómo Agregar una Nueva Página

### Ejemplo: Crear página `/reportes`

1. **Crear carpeta de página:**
   ```bash
   mkdir -p src/app/reportes
   ```

2. **Crear `src/app/reportes/page.tsx`:**
   ```tsx
   import { useReportesData } from "@/modules/reportes/hooks";
   import { ReportesHeader } from "@/modules/reportes/components";

   export default function ReportesPage() {
     return (
       <div className="p-8">
         <ReportesHeader />
         {/* Contenido */}
       </div>
     );
   }
   ```

3. **Crear módulo `src/modules/reportes/`:**
   ```bash
   mkdir -p src/modules/reportes/{components,hooks,services,types}
   ```

4. **Agregar componentes, hooks y servicios en el módulo**

5. **Actualizar navegación en `src/components/layout/Sidebar.tsx`**

---

## Dependencias Principales

```json
{
  "next": "16.0.0",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "react-icons": "^5.x",
  "tailwindcss": "^4"
}
```

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev          # Inicia servidor en http://localhost:3000

# Producción
npm run build        # Compila la aplicación
npm run start        # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint
```

---

## Próximos Pasos Recomendados

1. **API Integration:**
   - Crear servicios en `modules/*/services/` para conectar con backend
   - Usar `fetch` o librerías como `axios`

2. **State Management:**
   - Considera Context API para estado global
   - O usa Zustand/Redux si la complejidad aumenta

3. **Testing:**
   - Jest + React Testing Library
   - Tests en `__tests__` o `.test.ts` junto a los archivos

4. **Autenticación:**
   - Middleware de Next.js en `src/middleware.ts`
   - Proteger rutas según permisos

5. **Monitoreo:**
   - Sentry para error tracking
   - Analytics si es necesario

---

## Contacto y Soporte

Para preguntas sobre la arquitectura, consulta este documento o revisa los archivos `a.txt` en cada carpeta.
