# Flujo de Desarrollo - Guía Completa

Este documento explica el flujo estándar para agregar nuevas funcionalidades en el frontend. Usamos **Login/Autenticación** como ejemplo práctico.

---

## Arquitectura General

```
LIB (Configuración Backend)
  ↓
MODULES (Lógica de Negocio)
  ├── components
  ├── hooks
  ├── services → usa lib/api
  ├── types
  └── utils
  ↓
COMPONENTS (UI Global)
  ├── layout (Sidebar, Footer)
  └── ui (InfoCard, Tabs, etc.)
  ↓
PROVIDERS (Estado Global)
  ├── AuthProvider
  ├── ThemeProvider
  └── RootProviders
  ↓
APP (Páginas y Rutas)
  └── (auth)/login/page.tsx
```

---

## Paso a Paso: Implementar Login

### PASO 1: Configurar `src/lib` (Backend Connection)

#### 1.1 Crear tipos de respuesta (`src/lib/types.ts`)

```typescript
// Interfaces de respuesta del backend
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    nombre: string;
    rol: string;
  };
  expiresIn: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
```

#### 1.2 Crear configuración (`src/lib/config.ts`)

```typescript
// Variables de entorno y configuración
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const config = {
  apiBaseUrl: API_BASE_URL,
  apiTimeout: 30000,
  retryAttempts: 3,
};

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    profile: "/auth/profile",
  },
  logistica: {
    list: "/logistica",
    create: "/logistica",
    update: "/logistica/:id",
  },
  // ... más endpoints
};
```

#### 1.3 Crear cliente HTTP (`src/lib/api.ts`)

```typescript
import { config, endpoints } from "./config";
import type { ApiResponse } from "./types";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error en la solicitud");
    }

    return response.json();
  }

  // Métodos HTTP
  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  // Token management
  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  }

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");
    }
    return null;
  }

  clearToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  }
}

export const apiClient = new ApiClient(config.apiBaseUrl);
```

#### 1.4 Crear `src/lib/errors.ts`

```typescript
export class ApiException extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "ApiException";
  }
}

export function handleApiError(error: unknown): never {
  if (error instanceof ApiException) {
    throw error;
  }

  if (error instanceof Error) {
    throw new ApiException("UNKNOWN_ERROR", error.message);
  }

  throw new ApiException("UNKNOWN_ERROR", "Error desconocido");
}
```

---

### PASO 2: Crear módulo de autenticación

#### 2.1 Crear tipos (`src/modules/auth/types/index.ts`)

```typescript
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  nombre: string;
  rol: "admin" | "user" | "viewer";
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
```

#### 2.2 Crear servicio (`src/modules/auth/services/authService.ts`)

```typescript
"use client";

import { apiClient } from "@/lib/api";
import { endpoints } from "@/lib/config";
import type { LoginResponse } from "@/lib/types";
import type { LoginCredentials, User } from "../types";

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      endpoints.auth.login,
      credentials
    );

    // Guardar token
    if (response.token) {
      apiClient.setToken(response.token);
    }

    return response;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post(endpoints.auth.logout, {});
    } finally {
      apiClient.clearToken();
    }
  },

  async getProfile(): Promise<User> {
    return apiClient.get<User>(endpoints.auth.profile);
  },

  async refreshToken(): Promise<string> {
    const response = await apiClient.post<{ token: string }>(
      endpoints.auth.refresh,
      {}
    );

    if (response.token) {
      apiClient.setToken(response.token);
    }

    return response.token;
  },

  getStoredToken(): string | null {
    return apiClient.getToken();
  },

  clearToken(): void {
    apiClient.clearToken();
  },
};
```

#### 2.3 Crear hook (`src/modules/auth/hooks/useAuth.ts`)

```typescript
"use client";

import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
```

#### 2.4 Crear hook de login (`src/modules/auth/hooks/useLogin.ts`)

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/authService";
import type { LoginCredentials } from "../types";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);

      // Redirigir al dashboard
      router.push("/");

      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
```

#### 2.5 Crear componente (`src/modules/auth/components/LoginForm.tsx`)

```typescript
"use client";

import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import type { LoginCredentials } from "../types";

export function LoginForm() {
  const { login, isLoading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-red text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}
```

---

### PASO 3: Crear Provider de Autenticación

#### 3.1 Crear `src/modules/auth/context/AuthProvider.tsx`

```typescript
"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { authService } from "@/modules/auth/services/authService";
import type { AuthState, User } from "@/modules/auth/types";

export const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    error: null,
    isAuthenticated: false,
  });

  // Verificar si el usuario está autenticado al montar
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = authService.getStoredToken();

        if (token) {
          const user = await authService.getProfile();

          setAuthState({
            user,
            token,
            isLoading: false,
            error: null,
            isAuthenticated: true,
          });
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Error al inicializar autenticación",
        }));
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await authService.login({ email, password });

      setAuthState({
        user: response.user,
        token: response.token,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error al iniciar sesión";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: message,
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

### PASO 4: Usar el Provider en layout.tsx

#### 4.1 Actualizar `src/app/layout.tsx`

El AuthProvider es GLOBAL (para toda la app), así que se integra en layout.tsx:

```typescript
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/modules/auth/context/AuthProvider";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Manual Operacional - Back Office EBCO",
  description: "Sistema de Back Office para gestión operacional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <AuthProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64">
              <main className="flex-1 bg-brand-bg-light">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

### PASO 5: Crear página de Login

#### 5.1 Crear `src/app/(auth)/login/page.tsx`

Nota: Usa Route Group `(auth)` para que la URL sea `/login` en lugar de `/(auth)/login`

```typescript
import { LoginForm } from "@/modules/auth/components";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg-light">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-brand-red mb-6 text-center">
          Back Office EBCO
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Inicia sesión para continuar
        </p>

        <LoginForm />

        <p className="text-center text-sm mt-6 text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-brand-red font-semibold hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
```

---

## Flujo Completo Resumido

```
1. Usuario accede a /login
   ↓
2. Página carga LoginForm component
   ↓
3. Usuario completa formulario y hace submit
   ↓
4. LoginForm llama useLogin hook
   ↓
5. useLogin llama authService.login()
   ↓
6. authService llama apiClient.post() (LIB)
   ↓
7. Backend responde con token y user
   ↓
8. apiClient guarda token en localStorage
   ↓
9. AuthProvider actualiza contexto global
   ↓
10. Redirige a /
```

---

## Variables de Entorno

Crear `.env.local` en la raíz del frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_TIMEOUT=30000
```

---

## Checklist para Nueva Funcionalidad

- [ ] Definir tipos en `src/lib/types.ts`
- [ ] Crear endpoint en `src/lib/config.ts`
- [ ] Crear servicio en `modules/*/services/`
- [ ] Crear hooks en `modules/*/hooks/`
- [ ] Crear componentes en `modules/*/components/`
- [ ] Crear página en `src/app/`
- [ ] Crear provider si maneja estado global
- [ ] Actualizar Sidebar con nueva ruta
- [ ] Testear flujo completo

---

## Estructura Final

```
src/
├── lib/                    # Configuración Backend
│   ├── api.ts
│   ├── config.ts
│   ├── types.ts
│   ├── errors.ts
│   └── a.txt
├── modules/auth/           # Módulo Autenticación
│   ├── components/
│   │   └── LoginForm.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useLogin.ts
│   ├── services/
│   │   └── authService.ts
│   ├── types/
│   │   └── index.ts
│   └── a.txt
├── providers/              # Proveedores globales
│   ├── AuthProvider.tsx
│   ├── RootProviders.tsx
│   └── a.txt
├── components/             # UI Global
│   ├── layout/
│   └── ui/
├── app/                    # Rutas y Páginas
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   └── layout.tsx
```

---

## Conclusión

Este es el flujo estándar para agregar cualquier funcionalidad:

1. **LIB** → Define interfaces y cliente HTTP
2. **MODULES** → Crea servicios, hooks, componentes, tipos
3. **PROVIDERS** → Si necesita estado global
4. **APP** → Crea las páginas
5. **SIDEBAR** → Agrega navegación

¡Ahora estás listo para desarrollar! 🚀
