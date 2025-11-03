"use client";

import { MdPhone, MdLocationOn } from "react-icons/md";

interface Office {
  city: string;
  address: string;
  phone: string;
}

const offices: Office[] = [
  {
    city: "Iquique",
    address: "Santiago Polanco 2075",
    phone: "+56 9 XXXX XXXX",
  },
  {
    city: "Concepción",
    address: "Camino a Coronel Km 10 Nº5580\nSan Pedro de la Paz",
    phone: "+56 41 2738421",
  },
  {
    city: "Antofagasta",
    address: "Eduardo Orchard 1438\nAntofagasta",
    phone: "224596586",
  },
  {
    city: "Puerto Montt",
    address: "Ruta 5 Sur Km 1025\nMegacentro 2 Bodega 1",
    phone: "+56 65 2636868",
  },
  {
    city: "Santiago",
    address: "Av. Santa María 2450\nProvidencia",
    phone: "+56 2 24644700",
  },
  {
    city: "Punta Arenas",
    address: "Calle Magallanes\nPunta Arenas",
    phone: "+56 9 3230 5260",
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-text-light">
      {/* Offices Section */}
      <div className="py-12 px-8 bg-brand-dark border-b border-gray-700">
        <h2 className="text-2xl font-bold mb-8 text-brand-red">NUESTRAS OFICINAS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {offices.map((office, index) => (
            <div key={index} className="text-sm">
              <h3 className="font-bold text-brand-red mb-2">{office.city}</h3>
              <div className="space-y-1 text-brand-text-light text-xs">
                <div className="flex items-start space-x-2">
                  <MdLocationOn size={14} className="flex-shrink-0 mt-0.5" />
                  <span>{office.address}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MdPhone size={14} className="flex-shrink-0 mt-0.5" />
                  <span>{office.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-brand-bg-light text-brand-text-dark py-6 px-8 text-center text-sm border-t border-gray-300">
        <div className="flex items-center justify-center gap-3">
          <img
            src="/logo-ebco.png"
            alt="EBCO"
            className="w-6 h-6 object-contain"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <p>© 2025 Sistema de Back Office EBCO - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
