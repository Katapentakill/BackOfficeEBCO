"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { SidebarProvider, useSidebar } from "@/components/layout/SidebarContext";
import UserMenu from "@/components/layout/UserMenu";

// Función para obtener el título del área según la ruta
function getAreaTitle(pathname: string): string {
  const routeMap: Record<string, string> = {
    "/home": "Back Office",
    "/logistica": "Logística",
    "/productos": "Productos y Soporte",
    "/analisis": "Análisis de Datos",
    "/manual": "Manual Operacional",
    "/organigrama": "Organigrama",
    "/dashboard/general": "Dashboard General",
    "/dashboard/logistica": "Dashboard Logística",
    "/dashboard/productos": "Dashboard Productos y Servicios",
    "/dashboard/analisis": "Dashboard Análisis",
  };

  // Buscar coincidencia exacta primero
  if (routeMap[pathname]) {
    return routeMap[pathname];
  }

  // Si no hay coincidencia exacta, buscar por prefijo
  for (const [route, title] of Object.entries(routeMap)) {
    if (pathname.startsWith(route)) {
      return title;
    }
  }

  return "Back Office EBCO";
}

// Función para obtener el color de la barra según el área
function getAreaColor(pathname: string): string {
  const colorMap: Record<string, string> = {
    "/home": "#dc2626", // Rojo EBCO
    "/logistica": "#2563eb", // Azul
    "/productos": "#16a34a", // Verde
    "/analisis": "#8b5cf6", // Púrpura
    "/manual": "#f59e0b", // Ámbar
    "/organigrama": "#ec4899", // Rosa
    "/dashboard/general": "#dc2626", // Rojo EBCO
    "/dashboard/logistica": "#2563eb", // Azul
    "/dashboard/productos": "#10b981", // Verde esmeralda (más elegante)
    "/dashboard/analisis": "#8b5cf6", // Púrpura
  };

  // Buscar coincidencia exacta primero
  if (colorMap[pathname]) {
    return colorMap[pathname];
  }

  // Si no hay coincidencia exacta, buscar por prefijo
  for (const [route, color] of Object.entries(colorMap)) {
    if (pathname.startsWith(route)) {
      return color;
    }
  }

  return "#dc2626"; // Rojo EBCO por defecto
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  const areaTitle = getAreaTitle(pathname);
  const areaColor = getAreaColor(pathname);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div 
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: isCollapsed ? "80px" : "256px" }}
      >
        {/* Barra superior con título del área */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-40" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-8 w-1 rounded-full" style={{ background: areaColor }}></div>
              <h1 className="text-2xl font-bold ink">{areaTitle}</h1>
            </div>
            <UserMenu />
          </div>
        </header>
        <main className="flex-1 bg-brand-bg-light">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
