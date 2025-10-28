"use client";

import { useState } from "react";
import { MdExpandMore, MdPerson } from "react-icons/md";

interface OrganizationalUnit {
  name: string;
  description?: string;
  subUnits?: OrganizationalUnit[];
}

const organizationalStructure: OrganizationalUnit = {
  name: "COORDINADOR",
  subUnits: [
    {
      name: "LOGÍSTICA",
      subUnits: [
        { name: "Materiales" },
        { name: "Servicios de Arriendo" },
      ],
    },
    {
      name: "PRODUCTOS Y SERVICIOS",
      subUnits: [
        { name: "Subcontratos" },
        { name: "Materiales Especificaciones Técnicas" },
      ],
    },
    {
      name: "ANÁLISIS DE DATOS",
      subUnits: [
        { name: "Control de Costos" },
        { name: "Programa y Avance" },
      ],
    },
  ],
};

export default function OrganigramaPage() {
  const [expandedAreas, setExpandedAreas] = useState<string[]>([
    "LOGÍSTICA",
    "PRODUCTOS Y SERVICIOS",
    "ANÁLISIS DE DATOS",
  ]);

  const toggleArea = (areaName: string) => {
    setExpandedAreas((prev) =>
      prev.includes(areaName)
        ? prev.filter((a) => a !== areaName)
        : [...prev, areaName]
    );
  };

  return (
    <div className="p-8 bg-brand-dark min-h-screen text-brand-text-light">
      {/* Header Section */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <h1 className="text-4xl font-bold mb-6">
            ESTRUCTURA ORGANIZACIONAL<br />BACK OFFICE
          </h1>
          <p className="text-lg leading-relaxed mb-8 italic text-gray-300">
            "Somos el motor silencioso que organiza, conecta y potencia, para que cada proyecto
            avance con eficiencia, calidad y visión de futuro."
          </p>
          <button className="bg-brand-red text-brand-text-light px-8 py-3 rounded-md font-bold hover:opacity-90 transition-opacity flex items-center space-x-2">
            <span>VER PERFIL COMPLETO</span>
            <MdExpandMore size={20} />
          </button>
        </div>

        {/* Right Column - Organizational Chart */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">ORGANIGRAMA</h2>
          <div className="space-y-4">
            {/* Coordinator Box */}
            <div className="text-center mb-8">
              <div className="bg-brand-red px-6 py-3 rounded-lg inline-block font-bold text-lg">
                {organizationalStructure.name}
              </div>
            </div>

            {/* Areas */}
            <div className="space-y-3">
              {organizationalStructure.subUnits?.map((area) => (
                <div key={area.name} className="bg-gray-800 rounded-lg p-4">
                  <button
                    onClick={() => toggleArea(area.name)}
                    className="w-full flex items-center justify-between text-left font-bold hover:text-brand-red transition-colors"
                  >
                    <span className="flex items-center space-x-2">
                      <MdPerson size={20} />
                      <span>{area.name}</span>
                    </span>
                    <MdExpandMore
                      size={20}
                      className={`transform transition-transform ${
                        expandedAreas.includes(area.name) ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Sub-areas */}
                  {expandedAreas.includes(area.name) && area.subUnits && (
                    <div className="mt-3 pl-8 space-y-2 border-l-2 border-gray-700">
                      {area.subUnits.map((subArea) => (
                        <div key={subArea.name} className="text-gray-300 text-sm">
                          • {subArea.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Buttons Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {organizationalStructure.subUnits?.map((area) => (
          <button
            key={area.name}
            className="bg-brand-red hover:bg-red-700 text-brand-text-light font-bold py-4 px-6 rounded-lg transition-colors text-lg"
          >
            VER PERFIL - {area.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Detailed Structure Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-brand-red">ESTRUCTURA DETALLADA</h2>
        <div className="space-y-6">
          {organizationalStructure.subUnits?.map((area) => (
            <div
              key={area.name}
              className="bg-gray-800 rounded-lg p-6 border-l-4 border-brand-red"
            >
              <h3 className="text-2xl font-bold mb-4 text-brand-red">{area.name}</h3>
              {area.subUnits && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {area.subUnits.map((subArea) => (
                    <div
                      key={subArea.name}
                      className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <p className="font-semibold flex items-center space-x-2">
                        <MdPerson size={18} className="text-brand-red" />
                        <span>{subArea.name}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
