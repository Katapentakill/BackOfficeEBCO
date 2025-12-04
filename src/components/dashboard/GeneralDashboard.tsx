"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Datos del Panel de Control de Gestión
const controlPanelKPIs = {
  promedioCPI: { value: "1.06", color: "text-emerald-600" },
  promedioSPI: { value: "0.96", color: "text-rose-600" },
  ingresos: { value: "$124.5M", color: "text-blue-900" },
  proyectosActivos: { value: "12", color: "text-gray-900" },
};

// Datos de Estado de Proyectos
const projectStatus = [
  {
    name: "Proyecto Alpha",
    progress: 85,
    status: "En Tiempo",
    statusColor: "text-green-600",
    barColor: "bg-green-500",
  },
  {
    name: "Proyecto Beta",
    progress: 60,
    status: "En Riesgo",
    statusColor: "text-yellow-600",
    barColor: "bg-yellow-500",
  },
  {
    name: "Proyecto Gamma",
    progress: 30,
    status: "Crítico",
    statusColor: "text-red-600",
    barColor: "bg-red-500",
  },
  {
    name: "Proyecto Delta",
    progress: 95,
    status: "Completado",
    statusColor: "text-green-600",
    barColor: "bg-green-500",
  },
];

// Matriz de Riesgos 5x5 - Array estático de colores exacto
const riskMatrixColors = [
  // Fila 5 (Superior - Alto Impacto)
  ["bg-amber-400", "bg-orange-400", "bg-red-500", "bg-red-500", "bg-red-600"],
  // Fila 4
  ["bg-emerald-400", "bg-amber-400", "bg-orange-400", "bg-red-500", "bg-red-500"],
  // Fila 3
  ["bg-emerald-500", "bg-emerald-400", "bg-amber-400", "bg-orange-400", "bg-red-500"],
  // Fila 2
  ["bg-emerald-500", "bg-emerald-500", "bg-emerald-400", "bg-amber-400", "bg-orange-400"],
  // Fila 1 (Inferior - Bajo Impacto)
  ["bg-emerald-600", "bg-emerald-500", "bg-emerald-500", "bg-emerald-400", "bg-amber-400"],
];

// Alertas Críticas
const criticalAlerts = [
  "Retraso en permisos (Beta)",
  "Sobrecosto de materiales (Gamma)",
  "Escasez de mano de obra (Beta)",
];

// Datos para gráficos de Hallazgos Operacionales
const concretePouringData = [
  { month: "Ene", value: 88 },
  { month: "Feb", value: 92 },
  { month: "Mar", value: 90 },
  { month: "Abr", value: 85 },
  { month: "May", value: 78 },
  { month: "Jun", value: 95 },
  { month: "Jul", value: 92 },
];

const deliverablesData = [
  { month: "Ene", value: 85 },
  { month: "Feb", value: 88 },
  { month: "Mar", value: 82 },
  { month: "Abr", value: 72 },
  { month: "May", value: 88 },
  { month: "Jun", value: 90 },
  { month: "Jul", value: 88 },
];

export default function GeneralDashboard() {
  return (
    <div className="h-screen bg-slate-50 p-2 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="mb-2 flex-shrink-0">
        <h1 className="text-lg font-bold text-gray-900">
          DASHBOARD GENERAL
        </h1>
      </div>

      {/* Panel de Control de Gestión */}
      <Card className="mb-2 flex-shrink-0 border border-orange-200 bg-orange-50/50 shadow-md">
        <CardHeader className="pb-2 pt-3 px-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold text-gray-900">
              PANEL DE CONTROL DE GESTIÓN
            </CardTitle>
            <select className="px-2 py-1 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>KPIs consolidados</option>
              <option>KPIs por proyecto</option>
              <option>KPIs por área</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <p className="text-xs text-gray-600 mb-0.5 font-medium">PROMEDIO CPI</p>
              <p className={`text-xl font-bold ${controlPanelKPIs.promedioCPI.color}`}>
                {controlPanelKPIs.promedioCPI.value}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-0.5 font-medium">PROMEDIO SPI</p>
              <p className={`text-xl font-bold ${controlPanelKPIs.promedioSPI.color}`}>
                {controlPanelKPIs.promedioSPI.value}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-0.5 font-medium">INGRESOS</p>
              <p className={`text-xl font-bold ${controlPanelKPIs.ingresos.color}`}>
                {controlPanelKPIs.ingresos.value}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-0.5 font-medium">PROYECTOS ACTIVOS</p>
              <p className={`text-xl font-bold ${controlPanelKPIs.proyectosActivos.color}`}>
                {controlPanelKPIs.proyectosActivos.value}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección Media - 3 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mb-2 flex-1 min-h-0">
        {/* Columna 1: Estado de Proyectos */}
        <Card className="lg:col-span-4 flex flex-col min-h-0">
          <CardHeader className="pb-1 pt-3 px-3 flex-shrink-0">
            <CardTitle className="text-sm font-bold text-gray-900">
              ESTADO DE PROYECTOS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 overflow-visible flex-1">
            <div className="space-y-2">
              {projectStatus.map((project, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">{project.name}</span>
                    <span className={`text-xs font-semibold ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${project.barColor} rounded-full transition-all`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 text-right">{project.progress}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Columna 2: Matriz Consolidada de Riesgos */}
        <Card className="lg:col-span-4 flex flex-col min-h-0">
          <CardHeader className="pb-1 pt-3 px-3 flex-shrink-0">
            <CardTitle className="text-sm font-bold text-gray-900">
              MATRIZ CONSOLIDADA DE RIESGOS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 overflow-visible flex-1 flex flex-col justify-center">
            <div className="flex flex-col items-center">
              {/* Contenedor de la Matriz - 5x5 Estático */}
              <div className="w-full">
                {/* Headers de columnas (Probabilidad) - Arriba */}
                <div className="flex mb-0.5">
                  <div className="w-5"></div>
                  <div className="grid grid-cols-5 gap-0.5 flex-1">
                    <div className="text-xs text-gray-500 text-center font-semibold">1</div>
                    <div className="text-xs text-gray-500 text-center font-semibold">2</div>
                    <div className="text-xs text-gray-500 text-center font-semibold">3</div>
                    <div className="text-xs text-gray-500 text-center font-semibold">4</div>
                    <div className="text-xs text-gray-500 text-center font-semibold">5</div>
                  </div>
                </div>

                {/* Contenedor principal con eje Y y matriz */}
                <div className="flex">
                  {/* Eje Y */}
                  <div className="flex flex-col pr-1 text-xs text-gray-500 font-semibold w-5">
                    <div className="h-8 flex items-center justify-end">5</div>
                    <div className="h-8 flex items-center justify-end">4</div>
                    <div className="h-8 flex items-center justify-end">3</div>
                    <div className="h-8 flex items-center justify-end">2</div>
                    <div className="h-8 flex items-center justify-end">1</div>
                  </div>

                  {/* Grilla 5x5 */}
                  <div className="grid grid-cols-5 gap-0.5 flex-1">
                    {/* Fila 5 (Superior) */}
                    <div className="bg-amber-400 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-orange-400 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-red-500 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-red-500 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-red-600 rounded-sm h-8 border border-gray-200"></div>

                    {/* Fila 4 */}
                    <div className="bg-emerald-400 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-amber-400 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-orange-400 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-red-500 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-red-500 rounded-sm h-8 border border-gray-200"></div>

                    {/* Fila 3 */}
                    <div className="bg-emerald-500 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-emerald-400 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-amber-400 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-orange-400 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-red-500 rounded-sm h-8 border border-gray-200"></div>

                    {/* Fila 2 */}
                    <div className="bg-emerald-500 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-emerald-500 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-emerald-400 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-amber-400 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-orange-400 rounded-sm h-8 border border-gray-200"></div>

                    {/* Fila 1 (Inferior) */}
                    <div className="bg-emerald-600 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-emerald-500 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-emerald-500 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-emerald-400 rounded-sm h-8 border border-gray-200"></div>
                    <div className="bg-amber-400 rounded-sm h-8 border border-gray-200"></div>
                  </div>
                </div>
              </div>
              
              {/* Leyenda */}
              <div className="flex items-center gap-2 mt-3 text-xs flex-wrap justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
                  <span className="text-gray-600">Bajo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-amber-400 rounded-sm"></div>
                  <span className="text-gray-600">Medio</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                  <span className="text-gray-600">Medio-Alto</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                  <span className="text-gray-600">Alto</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Columna 3: Alertas Críticas */}
        <Card className="lg:col-span-4 flex flex-col min-h-0">
          <CardHeader className="pb-1 pt-3 px-3 flex-shrink-0">
            <CardTitle className="text-sm font-bold text-gray-900">
              ALERTAS CRÍTICAS
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-2">
            <div className="border-2 border-red-500 rounded-lg p-2 bg-red-50 h-full flex flex-col">
              <p className="text-xs font-bold text-red-900 mb-2">
                3 proyectos en riesgo
              </p>
              <ul className="space-y-1.5 flex-1">
                {criticalAlerts.map((alert, index) => (
                  <li key={index} className="flex items-start gap-1.5">
                    <span className="text-red-600 mt-0.5 text-xs">•</span>
                    <span className="text-xs text-gray-800 leading-tight">{alert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección Inferior - Hallazgos Operacionales */}
      <Card className="flex-shrink-0">
        <CardHeader className="pb-1 pt-3 px-3">
          <CardTitle className="text-sm font-bold text-gray-900">
            HALLAZGOS OPERACIONALES
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Gráfico 1: Vaciado de Hormigón */}
            <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
              <h3 className="text-xs font-semibold text-gray-800 mb-2">
                Vaciado de Hormigón: 92% Cumplimiento
              </h3>
              <div className="w-full" style={{ height: "140px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={concretePouringData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 9, fill: "#6b7280" }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 9, fill: "#6b7280" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Cumplimiento"]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "6px 10px",
                      }}
                    />
                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico 2: Cumplimiento de Entregables */}
            <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
              <h3 className="text-xs font-semibold text-gray-800 mb-2">
                Cumplimiento de Entregables: 88%
              </h3>
              <div className="w-full" style={{ height: "140px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deliverablesData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 9, fill: "#6b7280" }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 9, fill: "#6b7280" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Cumplimiento"]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "6px 10px",
                      }}
                    />
                    <Bar dataKey="value" fill="#64748b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

