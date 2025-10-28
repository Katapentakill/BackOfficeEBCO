"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdLocalShipping, MdShoppingCart, MdAnalytics, MdHome } from "react-icons/md";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "INICIO", href: "/", icon: <MdHome size={20} /> },
  { label: "MANUAL OP. BACK OFFICE", href: "/manual", icon: <MdDashboard size={20} /> },
  { label: "ÁREA LOGÍSTICA", href: "/logistica", icon: <MdLocalShipping size={20} /> },
  { label: "ÁREA PRODUCTOS Y SOPORTES", href: "/productos", icon: <MdShoppingCart size={20} /> },
  { label: "ÁREA ANÁLISIS DE DATOS", href: "/analisis", icon: <MdAnalytics size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-brand-dark text-brand-text-light flex flex-col border-r border-gray-700">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-brand-red">
          EB CO<br />
          <span className="text-sm text-brand-text-light">BACK OFFICE</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-brand-red text-brand-text-light"
                  : "text-brand-text-light hover:bg-gray-700"
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="p-6 border-t border-gray-700 text-xs text-gray-400">
        <p>© 2025 EBCO</p>
      </div>
    </aside>
  );
}
