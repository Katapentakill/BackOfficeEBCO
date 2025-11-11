"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdLocalShipping,
  MdShoppingCart,
  MdAnalytics,
  MdHome,
  MdMenu,
  MdChevronLeft,
  MdOutlineBarChart,
} from "react-icons/md";
import { useSidebar } from "./SidebarContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "INICIO", href: "/home", icon: <MdHome size={20} /> },
  { label: "MANUAL OP. BACK OFFICE", href: "/manual", icon: <MdDashboard size={20} /> },
  { label: "ÁREA LOGÍSTICA", href: "/logistica", icon: <MdLocalShipping size={20} /> },
  { label: "ÁREA PRODUCTOS Y SOPORTES", href: "/productos", icon: <MdShoppingCart size={20} /> },
  { label: "ÁREA ANÁLISIS DE DATOS", href: "/analisis", icon: <MdAnalytics size={20} /> },
];

const dashboardLinks: NavItem[] = [
  { label: "Resumen general", href: "/dashboard/general", icon: <MdOutlineBarChart size={18} /> },
  { label: "Logística", href: "/dashboard/logistica", icon: <MdLocalShipping size={18} /> },
  { label: "Productos", href: "/dashboard/productos", icon: <MdShoppingCart size={18} /> },
  { label: "Análisis", href: "/dashboard/analisis", icon: <MdAnalytics size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [isDashboardOpen, setIsDashboardOpen] = useState(pathname.startsWith("/dashboard"));

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      setIsDashboardOpen(true);
    }
  }, [pathname]);

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-brand-dark text-brand-text-light flex flex-col border-r transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      style={{ borderColor: "var(--color-brand-line)" }}
    >
      {/* Logo & Toggle */}
      <div className={`border-b ${isCollapsed ? 'p-4' : 'p-6'}`} style={{ borderColor: "var(--color-brand-line)" }}>
        <div className={`flex items-center ${isCollapsed ? 'flex-col justify-center gap-3' : 'justify-between gap-3'}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <img
                src="/Logo.png"
                alt="EBCO"
                className="w-12 h-12 object-contain flex-shrink-0"
                 style={{ imageRendering: "auto" as any }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <h1 className="text-2xl font-bold text-brand-red">
                EBCO<br />
                <span className="text-sm text-brand-text-light">BACK OFFICE</span>
              </h1>
            </div>
          )}
          {isCollapsed && (
            <img
              src="/Logo.png"
              alt="EBCO"
              className="w-12 h-12 object-contain mx-auto"
                 style={{ imageRendering: "auto" as any }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded hover:bg-brand-bg-light hover:text-brand-text-dark transition-colors flex-shrink-0 ${isCollapsed ? 'w-full' : ''}`}
            title={isCollapsed ? "Expandir" : "Colapsar"}
          >
            {isCollapsed ? <MdMenu size={20} /> : <MdChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-brand text-brand-text-light"
                  : "text-brand-text-light hover:bg-brand-bg-light hover:text-brand-text-dark"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setIsDashboardOpen((prev) => !prev)}
            className={`w-full flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-4 py-3 rounded-lg transition-colors ${
              pathname.startsWith("/dashboard")
                ? "bg-brand text-brand-text-light"
                : "text-brand-text-light hover:bg-brand-bg-light hover:text-brand-text-dark"
            }`}
          >
            <div className={`flex items-center ${isCollapsed ? "" : "gap-3"}`}>
              <span className="flex-shrink-0"><MdOutlineBarChart size={20} /></span>
              {!isCollapsed && <span className="text-sm font-medium uppercase tracking-wide">Dashboard</span>}
            </div>
            {!isCollapsed && (
              <MdChevronLeft
                size={18}
                className={`transition-transform ${isDashboardOpen ? "-rotate-90" : "rotate-90"}`}
              />
            )}
          </button>

          {isDashboardOpen && (
            <div className={`space-y-1 ${isCollapsed ? "" : "pl-6"}`}>
              {dashboardLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center ${isCollapsed ? "justify-center" : "gap-2"} px-4 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-[#1f2937] text-white"
                        : "text-brand-text-light hover:bg-brand-bg-light hover:text-brand-text-dark"
                    }`}
                    title={isCollapsed ? link.label : undefined}
                  >
                    <span className="flex-shrink-0">{link.icon}</span>
                    {!isCollapsed && <span>{link.label}</span>}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Footer info */}
      <div className={`p-6 border-t text-xs text-center ${isCollapsed ? 'px-2' : ''}`} style={{ borderColor: "var(--color-brand-line)", color: "#94a3b8" }}>
        {!isCollapsed && <p>© 2025 EBCO</p>}
        {isCollapsed && <p>© 2025</p>}
      </div>
    </aside>
  );
}
