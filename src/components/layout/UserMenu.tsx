"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MdAccountCircle,
  MdSettings,
  MdLogout,
  MdKeyboardArrowDown,
} from "react-icons/md";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center overflow-hidden">
          <Image
            src="https://i.pravatar.cc/150?img=12"
            alt="Usuario"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="text-left hidden md:block">
          <p className="text-sm font-semibold ink">Usuario Demo</p>
          <p className="text-xs text-gray-500">Administrador</p>
        </div>
        <MdKeyboardArrowDown
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="py-2">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
            >
              <MdAccountCircle className="w-5 h-5 text-gray-400" />
              Mi Perfil
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
            >
              <MdSettings className="w-5 h-5 text-gray-400" />
              Configuración
            </button>
            <div className="border-t my-1" style={{ borderColor: "var(--color-brand-line)" }}></div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
            >
              <MdLogout className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

