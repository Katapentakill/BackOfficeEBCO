"use client";

import { MdEmail, MdPhone, MdVideoCall, MdPerson } from "react-icons/md";

interface Persona {
  nombre: string;
  cargo: string;
  email: string;
  anexo: string;
  linkTeams: string;
  fotoUrl: string;
  funciones: string[];
}

interface TarjetaContactoProps {
  persona: Persona;
}

export default function TarjetaContacto({ persona }: TarjetaContactoProps) {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow" style={{ borderColor: "var(--color-brand-line)" }}>
      {/* Sección Superior - Foto, Nombre y Cargo */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-brand-bg-light border-2" style={{ borderColor: "var(--color-brand-red)" }}>
            {persona.fotoUrl ? (
              <img 
                src={persona.fotoUrl} 
                alt={persona.nombre}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback si la imagen no carga
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-brand-red text-white text-2xl font-bold">${persona.nombre.charAt(0).toUpperCase()}</div>`;
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brand-red text-white text-2xl font-bold">
                {persona.nombre.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-brand-red mb-1">{persona.nombre}</h3>
          <p className="text-sm text-brand-text-muted">{persona.cargo}</p>
        </div>
      </div>

      {/* Divisor */}
      <hr className="my-4" style={{ borderColor: "var(--color-brand-line)" }} />

      {/* Sección de Contacto */}
      <div className="mb-4">
        <h4 className="text-sm font-bold text-brand-red mb-3 flex items-center gap-2">
          <MdPerson size={16} />
          Contacto
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-brand-text-dark">
            <MdEmail className="w-4 h-4 text-brand-red flex-shrink-0" />
            <a 
              href={`mailto:${persona.email}`}
              className="text-brand-text-dark hover:text-brand-red transition-colors truncate"
              title={persona.email}
            >
              {persona.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-brand-text-dark">
            <MdPhone className="w-4 h-4 text-brand-red flex-shrink-0" />
            <span>Anexo: {persona.anexo}</span>
          </div>
          <div className="pt-2">
            <a
              href={persona.linkTeams}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-sm w-full flex items-center justify-center gap-2"
            >
              <MdVideoCall size={16} />
              Iniciar Chat en Teams
            </a>
          </div>
        </div>
      </div>

      {/* Sección de Funciones */}
      <div>
        <h4 className="text-sm font-bold text-brand-red mb-3">Funciones Principales</h4>
        <ul className="space-y-1.5 text-sm text-brand-text-dark">
          {persona.funciones.map((funcion, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-brand-red mt-1 flex-shrink-0">•</span>
              <span>{funcion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

