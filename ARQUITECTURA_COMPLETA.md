# Arquitectura Completa del Frontend - Back Office EBCO

## Visión General

El frontend del Back Office EBCO está construido con **Next.js 16** utilizando el **App Router** y **Tailwind CSS v4**. La arquitectura sigue un patrón modular que separa claramente la lógica de negocio, presentación y tipos de datos.

---

## Estructura de Directorios

```
frontend/
├── public/                          # Recursos estáticos (imágenes, fonts, etc.)
├── src/
│   ├── app/                        # Rutas y páginas (App Router de Next.js)
│   │   ├── layout.tsx              # Layout raíz con Sidebar y Footer
│   │   ├── page.tsx                # Página principal (Home)
│   │   ├── globals.css             # Estilos globales y configuración Tailwind v4
│   │   ├── (auth)/                 # Grupo de rutas para autenticación
│   │   │   └── register/
│   │   │       └── page.tsx        # Página de registro
│   │   ├── logistica/              # Área Logística
│   │   │   └── page.tsx
│   │   ├── productos/              # Área Productos y Soportes
│   │   │   └── page.tsx
│   │   ├── analisis/               # Área Análisis de Datos
│   │   │   └── page.tsx
│   │   ├── organigrama/            # Página Organigrama
│   │   │   └── page.tsx
│   │   └── manual/                 # Página Manual Operacional
│   │       └── page.tsx
│   │
│   ├── components/                 # Componentes reutilizables globales
│   │   ├── layout/                 # Componentes de estructura global
│   │   │   ├── Sidebar.tsx         # Barra lateral de navegación con menú
│   │   │   └── Footer.tsx          # Pie de página con información de oficinas
│   │   └── ui/                     # Componentes de interfaz reutilizables
│   │       ├── InfoCard.tsx        # Tarjeta de información (subáreas)
│   │       └── Tabs.tsx            # Sistema de pestañas para entregables
│   │
│   └── modules/                    # Módulos específicos por área de negocio
│       ├── logistica/              # MÓDULO: Logística
│       │   ├── a.txt               # Documentación de módulo
│       │   ├── components/         # Componentes específicos del módulo
│       │   │   └── a.txt
│       │   ├── hooks/              # Hooks personalizados (useLogisticaData, etc.)
│       │   │   └── a.txt
│       │   ├── services/           # Servicios y llamadas API
│       │   │   └── a.txt           # logisticaService.ts
│       │   ├── types/              # Interfaces y tipos TypeScript
│       │   │   └── a.txt           # index.ts (Material, Arriendo, etc.)
│       │   └── utils/              # Funciones utilitarias
│       │       └── a.txt           # calculateInventory, formatDeliveries, etc.
│       │
│       ├── productos/              # MÓDULO: Productos y Soportes
│       │   ├── a.txt
│       │   ├── components/         # Componentes específicos
│       │   │   └── a.txt
│       │   ├── hooks/              # Hooks personalizados
│       │   │   └── a.txt
│       │   ├── services/           # Servicios API
│       │   │   └── a.txt
│       │   ├── types/              # Tipos TypeScript
│       │   │   └── a.txt
│       │   └── utils/              # Funciones utilitarias
│       │       └── a.txt
│       │
│       ├── analisis/               # MÓDULO: Análisis de Datos
│       │   ├── a.txt
│       │   ├── components/         # Componentes específicos
│       │   │   └── a.txt
│       │   ├── hooks/              # Hooks personalizados
│       │   │   └── a.txt
│       │   ├── services/           # Servicios API
│       │   │   └── a.txt
│       │   ├── types/              # Tipos TypeScript
│       │   │   └── a.txt
│       │   └── utils/              # Funciones utilitarias
│       │       └── a.txt
│       │
│       ├── dashboard/              # MÓDULO: Dashboard (opcional)
│       │   ├── a.txt
│       │   ├── components/         # Componentes específicos
│       │   │   └── a.txt
│       │   ├── hooks/              # Hooks personalizados
│       │   │   └── a.txt
│       │   ├── services/           # Servicios API
│       │   │   └── a.txt
│       │   ├── types/              # Tipos TypeScript
│       │   │   └── a.txt
│       │   └── utils/              # Funciones utilitarias
│       │       └── a.txt
│       │
│       └── manual/                 # MÓDULO: Manual (opcional)
│           ├── a.txt
│           ├── components/         # Componentes específicos
│           │   └── a.txt
│           ├── hooks/              # Hooks personalizados
│           │   └── a.txt
│           ├── services/           # Servicios API
│           │   └── a.txt
│           ├── types/              # Tipos TypeScript
│           │   └── a.txt
│           └── utils/              # Funciones utilitarias
│               └── a.txt
│
├── tailwind.config.ts              # Configuración de Tailwind CSS
├── tsconfig.json                   # Configuración de TypeScript
├── next.config.ts                  # Configuración de Next.js
├── postcss.config.mjs              # Configuración de PostCSS
├── package.json                    # Dependencias del proyecto
├── package-lock.json               # Lock file de dependencias
├── ARQUITECTURA_COMPLETA.md        # Este archivo
└── .gitignore                      # Archivos a ignorar en Git
```

---

## Explicación Detallada de Carpetas

### 1. **`src/app/`** - Rutas y Páginas

**Responsabilidad:** Definir las rutas de la aplicación usando el **App Router** de Next.js 13+.

**Características clave:**
- Rutas automáticas basadas en carpetas
- Server Components por defecto
- Metadata SEO integrada
- Layouts jerárquicos

**Páginas disponibles:**

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `page.tsx` | Página principal - Home |
| `/logistica` | `logistica/page.tsx` | Área de Logística |
| `/productos` | `productos/page.tsx` | Productos y Soportes |
| `/analisis` | `analisis/page.tsx` | Análisis de Datos |
| `/organigrama` | `organigrama/page.tsx` | Estructura Organizacional |
| `/manual` | `manual/page.tsx` | Manual Operacional |
| `/register` | `(auth)/register/page.tsx` | Registro de usuarios |

---

### 2. **`src/components/`** - Componentes Globales Reutilizables

**Responsabilidad:** Almacenar componentes que se usan en múltiples páginas o áreas.

#### 2.1 **`components/layout/`**
Componentes de estructura global que enmarcan toda la aplicación.

- **`Sidebar.tsx`** - Barra lateral con menú de navegación
  - Navegación principal a las áreas
  - Marca la ruta activa
  - Fijo en el lado izquierdo

- **`Footer.tsx`** - Pie de página
  - Información de oficinas
  - Copyright
  - Datos de contacto

#### 2.2 **`components/ui/`**
Componentes reutilizables de interfaz de usuario sin lógica de negocio.

- **`InfoCard.tsx`** - Tarjeta de información genérica
  - Props: `icon`, `title`, `description`, `buttonText`, `buttonLink`, `badge`
  - Usado en múltiples páginas para mostrar subáreas

- **`Tabs.tsx`** - Sistema de pestañas interactivo
  - Props: `title`, `tabs` (array con label e items)
  - Usado para mostrar entregables por periodicidad

**Nota importante:** Los componentes globales NO incluyen lógica de negocio. Solo manejo de estado de UI simple.

---

### 3. **`src/modules/`** - Módulos Específicos por Área

**Responsabilidad:** Agrupar toda la lógica, servicios y componentes específicos de cada área de negocio.

**Estructura estándar de cada módulo:**

```
modulo/
├── a.txt                   # Documentación del módulo
├── components/             # Componentes específicos del área
├── hooks/                  # Hooks personalizados
├── services/               # Servicios y llamadas API
├── types/                  # Interfaces y tipos TypeScript
└── utils/                  # Funciones utilitarias
```

#### 3.1 **`modules/logistica/`** - Módulo Logística

Gestión de materiales y servicios de arriendo.

**Contenido típico:**
- `components/` - LogisticaHeader, MaterialesCard, ArriendosCard, DeliverablesList
- `hooks/` - useLogisticaData, useDeliverables, useMateriales
- `services/` - logisticaService.ts (getLogisticaData, createMaterial, updateArriendo, etc.)
- `types/` - Material, Arriendo, Entregable, Periodicidad
- `utils/` - calculateInventory, formatDeliveries, validateMaterial

#### 3.2 **`modules/productos/`** - Módulo Productos y Soportes

Gestión de subcontratos y especificaciones técnicas.

**Contenido típico:**
- `components/` - ProductosHeader, SubcontratosCard, MaterialesEECard
- `hooks/` - useProductosData, useSubcontratos, useMateriales
- `services/` - productosService.ts (getSubcontratos, updateCubicaciones, etc.)
- `types/` - Subcontrato, Material, EspecificacionTecnica, Cotizacion
- `utils/` - calculateQuotes, formatBudgets, validateSpecs

#### 3.3 **`modules/analisis/`** - Módulo Análisis de Datos

Control de costos y programación de trabajos.

**Contenido típico:**
- `components/` - AnalisisHeader, ControlCostosCard, ProgramaAvancesCard, Graficos
- `hooks/` - useAnalisisData, useControlCostos, useProgramaAvances
- `services/` - analisisService.ts (getCostos, getProgramacion, getMetricas, etc.)
- `types/` - Costo, Programa, Avance, Garantia, Seguro
- `utils/` - calculateMetrics, formatCharts, predictTrends

#### 3.4 **`modules/dashboard/`** - Módulo Dashboard (Opcional)

Panel principal con métricas y resúmenes.

#### 3.5 **`modules/manual/`** - Módulo Manual (Opcional)

Documentación y guías operacionales.

---

## Flujos de Datos

### Flujo típico de obtención de datos:

```
Page (app/logistica/page.tsx)
   ↓
useLogisticaData() [modules/logistica/hooks]
   ↓
logisticaService.getLogisticaData() [modules/logistica/services]
   ↓
API Backend (/api/logistica)
   ↓
Datos formateados con tipos [modules/logistica/types]
   ↓
Renderizar componentes específicos [modules/logistica/components]
```

### Flujo de presentación:

```
Page Component
   ↓
Components globales (Sidebar, Footer)
   ↓
Componentes específicos del módulo
   ↓
Componentes de UI reutilizables (InfoCard, Tabs)
   ↓
HTML renderizado
```

---

## Convenciones de Código

### Nombres de archivos

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes | PascalCase | `Sidebar.tsx`, `InfoCard.tsx`, `MaterialesCard.tsx` |
| Hooks | camelCase con `use` | `useLogisticaData.ts`, `useDeliverables.ts` |
| Servicios | camelCase con `Service` | `logisticaService.ts`, `productosService.ts` |
| Tipos | camelCase o `types.ts` | `types.ts`, `logisticaTypes.ts` |
| Utils | camelCase | `formatDeliveries.ts`, `calculateMetrics.ts` |

### Componentes Client vs Server

**Por defecto:** Server Components (Next.js 13+)

**Client Components:** Solo cuando se necesita interactividad

```tsx
"use client";

import { useState } from "react";

export default function ComponenteConEstado() {
  const [estado, setEstado] = useState(false);

  return (
    <div>{/* Contenido */}</div>
  );
}
```

---

## Estilos y Temas

### Tailwind CSS v4

**Sistema de colores definido en `src/app/globals.css`:**

```css
@theme {
  --color-brand-red: #D90429;           /* Rojo principal */
  --color-brand-dark: #212121;          /* Fondo oscuro */
  --color-brand-text-dark: #333333;     /* Texto oscuro */
  --color-brand-text-light: #FFFFFF;    /* Texto claro */
  --color-brand-bg-light: #F4F4F4;      /* Fondo gris claro */
  --color-brand-bg-white: #FFFFFF;      /* Fondo blanco */
}
```

**Uso en componentes:**

```tsx
<div className="bg-brand-red text-brand-text-light p-4 rounded-lg">
  Contenido con estilos brand
</div>
```

---

## Cómo Agregar una Nueva Funcionalidad

### Ejemplo: Crear nueva página `/reportes`

**1. Crear estructura de página:**
```bash
mkdir -p src/app/reportes
# Crear src/app/reportes/page.tsx
```

**2. Crear módulo para la lógica:**
```bash
mkdir -p src/modules/reportes/{components,hooks,services,types,utils}
```

**3. Crear tipos (`src/modules/reportes/types/index.ts`):**
```tsx
export interface Reporte {
  id: string;
  titulo: string;
  fechaGeneracion: Date;
}
```

**4. Crear servicio (`src/modules/reportes/services/reportesService.ts`):**
```tsx
import type { Reporte } from "../types";

export async function getReportes(): Promise<Reporte[]> {
  const response = await fetch("/api/reportes");
  return response.json();
}
```

**5. Crear hook (`src/modules/reportes/hooks/useReportesData.ts`):**
```tsx
"use client";

import { useState, useEffect } from "react";
import { getReportes } from "../services/reportesService";
import type { Reporte } from "../types";

export function useReportesData() {
  const [reportes, setReportes] = useState<Reporte[]>([]);

  useEffect(() => {
    getReportes().then(setReportes);
  }, []);

  return { reportes };
}
```

**6. Crear componente (`src/modules/reportes/components/ReportesHeader.tsx`):**
```tsx
export function ReportesHeader() {
  return <h1 className="text-3xl font-bold text-brand-red">Reportes</h1>;
}
```

**7. Crear página (`src/app/reportes/page.tsx`):**
```tsx
import { ReportesHeader } from "@/modules/reportes/components";
import { useReportesData } from "@/modules/reportes/hooks";

export default function ReportesPage() {
  // Para usar hook aquí, necesitarías hacer la página un Client Component
  // o usar el patrón de Server Component con acceso directo a datos

  return (
    <div className="p-8">
      <ReportesHeader />
      {/* Contenido */}
    </div>
  );
}
```

**8. Actualizar navegación en `src/components/layout/Sidebar.tsx`:**
```tsx
const navItems = [
  // ... items existentes
  { label: "REPORTES", href: "/reportes", icon: <MdDescription size={20} /> },
];
```

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
# Desarrollo con hot reload
npm run dev

# Compilación de producción
npm run build

# Ejecutar en producción
npm run start

# Linting
npm run lint

# Verificar tipos TypeScript
npx tsc --noEmit
```

---

## Mejores Prácticas

1. **Separación de responsabilidades:** Componentes no tienen lógica de negocio
2. **Reutilización:** Componentes globales para UI común
3. **Types primero:** Definir interfaces antes de implementar
4. **Naming claro:** Nombres descriptivos para archivos y funciones
5. **Documentación:** Archivos `a.txt` en cada carpeta
6. **Git friendly:** Estructura mantiene el repositorio limpio

---

## Próximos Pasos

1. ✅ Estructura creada
2. ⏳ Conectar APIs del backend
3. ⏳ Implementar autenticación
4. ⏳ Agregar testing (Jest + React Testing Library)
5. ⏳ Error handling y logging
6. ⏳ State management global si es necesario
7. ⏳ CI/CD pipeline

---

## Contacto

Para preguntas sobre la arquitectura, consulta los archivos `a.txt` en cada carpeta.
