"use client";

import { useState } from "react";
import {
  FileText,
  Medal,
  ArrowRightLeft,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// KPIs con colores vibrantes
const KPICards = [
  {
    icon: FileText,
    label: "Salud de Contratos",
    value: "34 total",
    color: "text-gray-900",
    footer: {
      left: { text: "3 En Riesgo", color: "text-red-600" },
      right: { text: "5 en Observación", color: "text-amber-600" },
    },
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    icon: Medal,
    label: "Eficiencia de Licitación",
    value: "25% Tasa de adjudicación",
    color: "text-emerald-600",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: ArrowRightLeft,
    label: "Flujo de Pagos (30d)",
    value: "$8.9M",
    subtitle: "($1.1M en validación)",
    color: "text-blue-700",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

// Embudo con colores vibrantes y diferenciados - Forma trapezoidal
const funnelData = [
  { name: "Propuestas Recibidas", value: 22, percentage: 35, color: "#1e40af" },
  { name: "En Evaluación", value: 15, percentage: 15, color: "#0f766e" },
  { name: "Ofertas Presentadas", value: 8, percentage: 16, color: "#7c3aed" },
  { name: "Adjudicado", value: 3, percentage: 3, color: "#be185d" },
];

// Barras de progreso con colores vibrantes
const paymentData = [
  { name: "Contratado", value: 8.9, percentage: 100, bgColor: "bg-blue-600", unit: "M" },
  { name: "Facturado", value: 1.7925, percentage: 70, bgColor: "bg-emerald-500", unit: "M" },
  { name: "Pagado", value: 0.6539, percentage: 40, bgColor: "bg-amber-500", unit: "M" },
];

export default function ProductsSupportDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="h-screen bg-slate-50 p-3 overflow-hidden flex flex-col">
      {/* Header Superior */}
      <div className="mb-3 flex-shrink-0">
        <h1 className="text-xl font-bold text-gray-900 mb-3">
          Dashboard Productos y Soporte
        </h1>
        
        {/* Tabs y Filtros */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-200 pb-2">
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 font-medium text-xs transition-colors relative whitespace-nowrap ${
                activeTab === "overview"
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Overview
              {activeTab === "overview" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("licitaciones")}
              className={`px-3 py-1.5 font-medium text-xs transition-colors relative whitespace-nowrap ${
                activeTab === "licitaciones"
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Licitaciones
              {activeTab === "licitaciones" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></span>
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select className="px-2 py-1 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-nowrap">
              <option>Últimos 30 días</option>
              <option>Últimos 90 días</option>
              <option>Este año</option>
            </select>
            <button className="px-2 py-1 border border-gray-300 rounded-lg text-xs bg-white hover:bg-gray-50 transition-colors whitespace-nowrap">
              Archivado
            </button>
          </div>
        </div>
      </div>

      {/* Fila de KPIs Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 flex-shrink-0">
        {KPICards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all border-0 shadow-md">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">{kpi.label}</p>
                  <div className={`${kpi.iconBg} p-2 rounded-lg`}>
                    <IconComponent className={`w-4 h-4 ${kpi.iconColor}`} />
                  </div>
                </div>
                <p className={`text-2xl font-bold ${kpi.color} mb-1`}>{kpi.value}</p>
                {kpi.subtitle && (
                  <p className="text-xs text-blue-600 font-medium">{kpi.subtitle}</p>
                )}
                {kpi.footer && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                    <span className={`text-xs font-semibold ${kpi.footer.left.color}`}>
                      {kpi.footer.left.text}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className={`text-xs font-semibold ${kpi.footer.right.color}`}>
                      {kpi.footer.right.text}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sección Principal - Grid 2 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
        {/* Columna Izquierda - Estado Licitaciones (Funnel) */}
        <div className="lg:col-span-5 flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="pb-2 flex-shrink-0">
              <CardTitle className="text-base font-bold text-gray-900">
                Estado Licitaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 flex flex-col p-3">
              {/* Gráfico Funnel con Forma Trapezoidal Real usando SVG */}
              <div className="flex-1 min-h-0 flex flex-col justify-center" style={{ minHeight: '200px' }}>
                <div className="relative w-full flex items-center" style={{ height: '200px' }}>
                  <div className="flex-1 relative" style={{ height: '200px' }}>
                    <svg width="100%" height="100%" viewBox="0 0 350 200" preserveAspectRatio="xMidYMid meet" className="absolute inset-0">
                      {funnelData.map((item, index) => {
                        const maxValue = funnelData[0].value;
                        const totalHeight = 200;
                        const segmentHeight = totalHeight / funnelData.length;
                        const yPosition = index * segmentHeight;
                        
                        // Calcular anchos para forma trapezoidal
                        const topWidthPercent = index === 0 ? 100 : (funnelData[index - 1].value / maxValue) * 100;
                        const bottomWidthPercent = (item.value / maxValue) * 100;
                        
                        const maxWidth = 250; // Ancho máximo del embudo
                        const centerX = 175; // Centro horizontal del viewBox
                        const topLeft = centerX - (maxWidth * topWidthPercent / 100) / 2;
                        const topRight = centerX + (maxWidth * topWidthPercent / 100) / 2;
                        const bottomLeft = centerX - (maxWidth * bottomWidthPercent / 100) / 2;
                        const bottomRight = centerX + (maxWidth * bottomWidthPercent / 100) / 2;
                        
                        return (
                          <g key={index}>
                            {/* Trapezoide del embudo */}
                            <polygon
                              points={`${topLeft},${yPosition} ${topRight},${yPosition} ${bottomRight},${yPosition + segmentHeight} ${bottomLeft},${yPosition + segmentHeight}`}
                              fill={item.color}
                              className="transition-all hover:opacity-90"
                              stroke="white"
                              strokeWidth="2"
                            />
                            {/* Texto dentro del trapezoide */}
                            <text
                              x={centerX}
                              y={yPosition + segmentHeight / 2 + 4}
                              textAnchor="middle"
                              fill="white"
                              fontSize="12"
                              fontWeight="bold"
                              className="pointer-events-none"
                            >
                              {item.value} ({item.percentage}%)
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  
                  {/* Etiquetas a la derecha */}
                  <div className="ml-4 flex flex-col justify-around h-full flex-shrink-0">
                    {funnelData.map((item, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-600">
                          ({item.value})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha - Control de Pagos */}
        <div className="lg:col-span-7 flex flex-col min-h-0 space-y-3">
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="pb-2 flex-shrink-0">
              <CardTitle className="text-base font-bold text-gray-900">
                Control de Pagos y Cierre
              </CardTitle>
              <p className="text-xs text-gray-600 mt-1">
                Contratado vs. Facturado vs. Pagado
              </p>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 flex flex-col p-3">
              {/* Barras de Progreso Delgadas y Elegantes */}
              <div className="space-y-5 flex-1 flex flex-col justify-center">
                {paymentData.map((item, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-800">{item.name}</span>
                      <span className="text-xs font-bold text-gray-900">
                        ${item.value.toFixed(item.value < 1 ? 4 : 1)}{item.unit}
                      </span>
                    </div>
                    <div className="relative w-full">
                      {/* Barra de fondo completa (100%) */}
                      <div className="h-3 bg-gray-100 rounded-full w-full"></div>
                      {/* Barra de progreso con color */}
                      <div
                        className={`absolute top-0 left-0 h-3 rounded-full transition-all ${item.bgColor}`}
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      ></div>
                      {/* Porcentaje a la derecha */}
                      <div className="absolute top-0 right-0 h-3 flex items-center">
                        <span className="text-xs font-semibold text-gray-600 ml-2">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alertas de Antigüedad con Colores Rose */}
          <Card className="flex-shrink-0 border-0 shadow-md">
            <CardContent className="p-3">
              <div className="bg-rose-50 border-2 border-rose-200 rounded-lg p-3 shadow-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-rose-800 mb-1">
                      Alertas de Antigüedad
                    </h4>
                    <p className="text-xs text-rose-700 leading-relaxed">
                      Notificaciones de procesos pendientes con más de 10 días sin actividad.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

