"use client";

import { useState } from "react";
import {
  MdOutlineBarChart,
  MdOutlineFileDownload,
  MdOutlineTimeline,
  MdWarning,
  MdTrendingUp,
  MdTrendingDown,
  MdRemove,
} from "react-icons/md";
import ProjectSGraph, { SCurveDataPoint } from "@/components/ui/ProjectSGraph";

export default function DashboardAnalisisPage() {
  // Datos de ejemplo para diferentes proyectos (Curva S de Valor Ganado)
  const projectsData: Record<string, { name: string; data: SCurveDataPoint[]; currentDateIndex: number }> = {
    "torre-central": {
      name: "Torre Central",
      currentDateIndex: 6, // Semana 24 (índice 6)
      data: [
        { period: "Semana 0", pv: 0, ev: 0, ac: 0 },
        { period: "Semana 4", pv: 2500000, ev: 2200000, ac: 2400000 },
        { period: "Semana 8", pv: 6000000, ev: 5500000, ac: 5800000 },
        { period: "Semana 12", pv: 12500000, ev: 11500000, ac: 12200000 },
        { period: "Semana 16", pv: 22500000, ev: 21000000, ac: 21800000 },
        { period: "Semana 20", pv: 34000000, ev: 32500000, ac: 33200000 },
        { period: "Semana 24", pv: 42500000, ev: 40800000, ac: 41800000 },
        { period: "Semana 28", pv: 47500000, ev: null, ac: null },
        { period: "Semana 32", pv: 49500000, ev: null, ac: null },
        { period: "Semana 36", pv: 50000000, ev: null, ac: null },
      ],
    },
    "residencial-norte": {
      name: "Residencial Norte",
      currentDateIndex: 5, // Semana 20 (índice 5)
      data: [
        { period: "Semana 0", pv: 0, ev: 0, ac: 0 },
        { period: "Semana 4", pv: 1800000, ev: 1700000, ac: 1750000 },
        { period: "Semana 8", pv: 4200000, ev: 4000000, ac: 4100000 },
        { period: "Semana 12", pv: 8500000, ev: 8200000, ac: 8400000 },
        { period: "Semana 16", pv: 15000000, ev: 14500000, ac: 14800000 },
        { period: "Semana 20", pv: 22000000, ev: 21500000, ac: 21800000 },
        { period: "Semana 24", pv: 28000000, ev: null, ac: null },
        { period: "Semana 28", pv: 31000000, ev: null, ac: null },
        { period: "Semana 32", pv: 32000000, ev: null, ac: null },
      ],
    },
    "hospital-costanera": {
      name: "Hospital Costanera",
      currentDateIndex: 7, // Semana 28 (índice 7)
      data: [
        { period: "Semana 0", pv: 0, ev: 0, ac: 0 },
        { period: "Semana 4", pv: 3200000, ev: 3000000, ac: 3100000 },
        { period: "Semana 8", pv: 7500000, ev: 7200000, ac: 7400000 },
        { period: "Semana 12", pv: 15500000, ev: 15000000, ac: 15200000 },
        { period: "Semana 16", pv: 28000000, ev: 27500000, ac: 27800000 },
        { period: "Semana 20", pv: 42000000, ev: 41500000, ac: 41800000 },
        { period: "Semana 24", pv: 52500000, ev: 52000000, ac: 52300000 },
        { period: "Semana 28", pv: 59000000, ev: 58500000, ac: 58800000 },
        { period: "Semana 32", pv: 62000000, ev: null, ac: null },
        { period: "Semana 36", pv: 65000000, ev: null, ac: null },
      ],
    },
  };

  const [selectedProject, setSelectedProject] = useState<string>("torre-central");

  // KPIs por proyecto
  const kpisByProject: Record<string, {
    spi: { value: number; color: string; bgColor: string; status: string };
    cpi: { value: number; color: string; bgColor: string; status: string };
    avance: { value: number; color: string; bgColor: string };
    alertas: { value: number; color: string; bgColor: string };
  }> = {
    "torre-central": {
      spi: { value: 0.92, color: "#ef4444", bgColor: "#fee2e2", status: "Retraso" },
      cpi: { value: 0.98, color: "#f59e0b", bgColor: "#fef3c7", status: "Leve sobrecosto" },
      avance: { value: 88, color: "#2563eb", bgColor: "#dbeafe" },
      alertas: { value: 3, color: "#ef4444", bgColor: "#fee2e2" },
    },
    "residencial-norte": {
      spi: { value: 0.97, color: "#f59e0b", bgColor: "#fef3c7", status: "Atención" },
      cpi: { value: 1.02, color: "#16a34a", bgColor: "#dcfce7", status: "Bajo presupuesto" },
      avance: { value: 75, color: "#2563eb", bgColor: "#dbeafe" },
      alertas: { value: 2, color: "#f59e0b", bgColor: "#fef3c7" },
    },
    "hospital-costanera": {
      spi: { value: 0.95, color: "#f59e0b", bgColor: "#fef3c7", status: "Atención" },
      cpi: { value: 0.99, color: "#f59e0b", bgColor: "#fef3c7", status: "Leve sobrecosto" },
      avance: { value: 92, color: "#2563eb", bgColor: "#dbeafe" },
      alertas: { value: 1, color: "#16a34a", bgColor: "#dcfce7" },
    },
  };

  // Obtener KPIs del proyecto seleccionado
  const currentKPIs = kpisByProject[selectedProject];
  const costData = [
    { category: "Mano de Obra", budget: 50, actual: 52 },
    { category: "Subcontratos (EEPP)", budget: 120, actual: 125 },
    { category: "Materiales y Suministros (ABO)", budget: 80, actual: 78 },
    { category: "Seguros y Garantías", budget: 10, actual: 10 },
  ];

  // Datos para el gráfico de dona
  const costBreakdown = [
    { label: "Mano de Obra", value: 52, color: "#3b82f6" },
    { label: "Subcontratos", value: 125, color: "#16a34a" },
    { label: "Materiales", value: 78, color: "#f59e0b" },
    { label: "Seguros", value: 10, color: "#ef4444" },
  ];

  const totalCost = costBreakdown.reduce((sum, item) => sum + item.value, 0);

  // Obtener datos del proyecto seleccionado
  const selectedProjectData = projectsData[selectedProject];

  // Datos de disciplinas por proyecto
  const disciplinesByProject: Record<string, Array<{
    name: string;
    actual: number;
    planned: number;
    performance: number | null;
    performanceColor: string;
  }>> = {
    "torre-central": [
      {
        name: "Hormigón",
        actual: 90,
        planned: 90,
        performance: 1.05,
        performanceColor: "#16a34a",
      },
      {
        name: "Enfierradura",
        actual: 85,
        planned: 88,
        performance: 0.95,
        performanceColor: "#ef4444",
      },
      {
        name: "Moldaje",
        actual: 82,
        planned: 85,
        performance: 0.98,
        performanceColor: "#f59e0b",
      },
      {
        name: "Excavación Manual",
        actual: 95,
        planned: 90,
        performance: 1.10,
        performanceColor: "#16a34a",
      },
      {
        name: "Eléctrico",
        actual: 70,
        planned: 75,
        performance: null,
        performanceColor: "#6b7280",
      },
      {
        name: "Sanitario",
        actual: 72,
        planned: 75,
        performance: null,
        performanceColor: "#6b7280",
      },
    ],
    "residencial-norte": [
      {
        name: "Hormigón",
        actual: 75,
        planned: 78,
        performance: 0.96,
        performanceColor: "#f59e0b",
      },
      {
        name: "Enfierradura",
        actual: 80,
        planned: 82,
        performance: 0.98,
        performanceColor: "#f59e0b",
      },
      {
        name: "Moldaje",
        actual: 78,
        planned: 80,
        performance: 0.98,
        performanceColor: "#f59e0b",
      },
      {
        name: "Excavación Manual",
        actual: 88,
        planned: 85,
        performance: 1.08,
        performanceColor: "#16a34a",
      },
      {
        name: "Eléctrico",
        actual: 65,
        planned: 70,
        performance: null,
        performanceColor: "#6b7280",
      },
      {
        name: "Sanitario",
        actual: 68,
        planned: 72,
        performance: null,
        performanceColor: "#6b7280",
      },
    ],
    "hospital-costanera": [
      {
        name: "Hormigón",
        actual: 92,
        planned: 92,
        performance: 1.02,
        performanceColor: "#16a34a",
      },
      {
        name: "Enfierradura",
        actual: 88,
        planned: 90,
        performance: 0.98,
        performanceColor: "#f59e0b",
      },
      {
        name: "Moldaje",
        actual: 85,
        planned: 88,
        performance: 0.97,
        performanceColor: "#f59e0b",
      },
      {
        name: "Excavación Manual",
        actual: 98,
        planned: 95,
        performance: 1.12,
        performanceColor: "#16a34a",
      },
      {
        name: "Eléctrico",
        actual: 75,
        planned: 78,
        performance: null,
        performanceColor: "#6b7280",
      },
      {
        name: "Sanitario",
        actual: 78,
        planned: 80,
        performance: null,
        performanceColor: "#6b7280",
      },
    ],
  };

  // Obtener disciplinas del proyecto seleccionado
  const disciplines = disciplinesByProject[selectedProject] || [];

  // Función para generar puntos de la Curva S
  const generateSCurvePoints = (values: number[], height: number, maxVal: number = 100) => {
    return values
      .map((value, index) => {
        if (value === null) return null;
        const x = (index / (values.length - 1)) * 100;
        const y = height - (value / maxVal) * height;
        return `${x},${y}`;
      })
      .filter((point) => point !== null)
      .join(" ");
  };

  // Función para generar una Curva S realista basada en el valor final
  const generateRealisticSCurve = (finalValue: number, numPoints: number = 6) => {
    const points: number[] = [];
    for (let i = 0; i < numPoints; i++) {
      const t = i / (numPoints - 1); // 0 a 1
      // Función sigmoide ajustada para crear forma de S
      // Inicio lento, aceleración media, desaceleración final
      const sigmoid = 1 / (1 + Math.exp(-12 * (t - 0.5))); // Curva S centrada
      const value = finalValue * sigmoid;
      points.push(Math.max(0, Math.min(finalValue, value)));
    }
    return points;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-4 md:space-y-6 max-w-full overflow-x-hidden">
      {/* Título y KPIs Principales */}
      <section className="bg-white rounded-lg shadow-sm p-4 md:p-6" style={{ borderColor: "var(--color-brand-line)", borderWidth: "1px", borderStyle: "solid" }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ink">Módulo 3: Dashboard de Gestión</h1>
          {/* Selector de Proyecto */}
          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
            <label htmlFor="project-select-kpis" className="text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap">
              Proyecto:
            </label>
            <select
              id="project-select-kpis"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-3 md:px-4 py-2 border rounded-lg bg-white text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent flex-1 md:flex-none"
              style={{ borderColor: "var(--color-brand-line)" }}
            >
              {Object.entries(projectsData).map(([key, project]) => (
                <option key={key} value={key}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* SPI */}
          <div className="bg-white border-l-4 rounded-lg p-6 shadow-sm relative overflow-hidden" style={{ borderLeftColor: currentKPIs.spi.color, borderColor: "#e5e7eb", borderWidth: "1px", borderLeftWidth: "4px" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">SPI</span>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${currentKPIs.spi.color}15` }}>
                {currentKPIs.spi.value < 0.95 ? (
                  <MdTrendingDown className="w-5 h-5" style={{ color: currentKPIs.spi.color }} />
                ) : currentKPIs.spi.value >= 1.0 ? (
                  <MdTrendingUp className="w-5 h-5" style={{ color: currentKPIs.spi.color }} />
                ) : (
                  <MdRemove className="w-5 h-5" style={{ color: currentKPIs.spi.color }} />
                )}
              </div>
            </div>
            <p className="text-4xl font-extrabold mb-1" style={{ color: currentKPIs.spi.color }}>{currentKPIs.spi.value.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mb-2">Índice Rendimiento Programa</p>
            <p className="text-xs font-semibold" style={{ color: currentKPIs.spi.color }}>{currentKPIs.spi.status}</p>
          </div>

          {/* CPI */}
          <div className="bg-white border-l-4 rounded-lg p-6 shadow-sm relative overflow-hidden" style={{ borderLeftColor: currentKPIs.cpi.color, borderColor: "#e5e7eb", borderWidth: "1px", borderLeftWidth: "4px" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">CPI</span>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${currentKPIs.cpi.color}15` }}>
                {currentKPIs.cpi.value < 1.0 ? (
                  <MdTrendingDown className="w-5 h-5" style={{ color: currentKPIs.cpi.color }} />
                ) : (
                  <MdTrendingUp className="w-5 h-5" style={{ color: currentKPIs.cpi.color }} />
                )}
              </div>
            </div>
            <p className="text-4xl font-extrabold mb-1" style={{ color: currentKPIs.cpi.color }}>{currentKPIs.cpi.value.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mb-2">Índice Rendimiento Costo</p>
            <p className="text-xs font-semibold" style={{ color: currentKPIs.cpi.color }}>{currentKPIs.cpi.status}</p>
          </div>

          {/* Avance General */}
          <div className="bg-white border-l-4 rounded-lg p-6 shadow-sm relative overflow-hidden" style={{ borderLeftColor: currentKPIs.avance.color, borderColor: "#e5e7eb", borderWidth: "1px", borderLeftWidth: "4px" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Avance General</span>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${currentKPIs.avance.color}15` }}>
                <MdOutlineTimeline className="w-5 h-5" style={{ color: currentKPIs.avance.color }} />
              </div>
            </div>
            <p className="text-4xl font-extrabold mb-1" style={{ color: currentKPIs.avance.color }}>{currentKPIs.avance.value}%</p>
            <p className="text-xs text-gray-400 mb-3">ISP (Índice de Seguimiento)</p>
            <div className="bg-gray-100 rounded-full h-2">
              <div className="h-2 rounded-full transition-all" style={{ width: `${currentKPIs.avance.value}%`, background: currentKPIs.avance.color }}></div>
            </div>
          </div>

          {/* Alertas Semanales */}
          <div className="bg-white border-l-4 rounded-lg p-6 shadow-sm relative overflow-hidden" style={{ borderLeftColor: currentKPIs.alertas.color, borderColor: "#e5e7eb", borderWidth: "1px", borderLeftWidth: "4px" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Alertas Semanales</span>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${currentKPIs.alertas.color}15` }}>
                <MdWarning className="w-5 h-5" style={{ color: currentKPIs.alertas.color }} />
              </div>
            </div>
            <p className="text-4xl font-extrabold mb-1" style={{ color: currentKPIs.alertas.color }}>{currentKPIs.alertas.value}</p>
            <p className="text-xs text-gray-400">Requieren atención</p>
          </div>
        </div>
      </section>

      {/* Control de Costo (Mensual) */}
      <section className="bg-white rounded-lg shadow-sm p-4 md:p-6" style={{ borderColor: "var(--color-brand-line)", borderWidth: "1px", borderStyle: "solid" }}>
        <h2 className="text-xl md:text-2xl font-bold ink mb-6">Control de Costo (Mensual)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          {/* Gráfico de Barras - Variación de Costos */}
          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-semibold ink mb-6">Variación de Costos</h3>
            <div className="space-y-6 md:space-y-8">
              {costData.map((item, index) => {
                const maxBar = Math.max(item.budget, item.actual);
                const budgetWidth = (item.budget / maxBar) * 100;
                const actualWidth = (item.actual / maxBar) * 100;
                const variance = ((item.actual - item.budget) / item.budget) * 100;
                const varianceColor = variance > 0 ? "#ef4444" : variance < 0 ? "#16a34a" : "#6b7280";

                return (
                  <div key={index} className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-xs md:text-sm font-semibold text-gray-800 break-words">{item.category}</span>
                      <div className="flex items-center gap-3 md:gap-6 text-xs flex-wrap">
                        <span className="text-gray-500 whitespace-nowrap">Presup. ${item.budget}M</span>
                        <span className="text-gray-700 font-medium whitespace-nowrap">Real ${item.actual}M</span>
                        <span
                          className="text-base md:text-lg font-bold whitespace-nowrap"
                          style={{ color: varianceColor }}
                        >
                          {variance >= 0 ? "+" : ""}
                          {variance.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                      {/* Barra presupuestada (gris) */}
                      <div
                        className="absolute top-0 left-0 h-full bg-gray-300 rounded-full"
                        style={{ width: `${budgetWidth}%` }}
                      ></div>
                      {/* Barra real (azul) - más fina */}
                      <div
                        className="absolute top-0 left-0 h-3 rounded-full mt-1.5"
                        style={{ width: `${actualWidth}%`, background: "#2563eb" }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gráfico de Dona - Desglose de Costos */}
          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-semibold ink mb-6">Desglose de Costos</h3>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  {(() => {
                    let currentAngle = 0;
                    return costBreakdown.map((item, index) => {
                      const percentage = (item.value / totalCost) * 100;
                      const angle = (percentage / 100) * 360;
                      const startAngle = currentAngle;
                      const endAngle = currentAngle + angle;
                      currentAngle += angle;

                      const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
                      const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
                      const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
                      const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);

                      const largeArc = angle > 180 ? 1 : 0;

                      const pathData = [
                        `M 50 50`,
                        `L ${x1} ${y1}`,
                        `A 50 50 0 ${largeArc} 1 ${x2} ${y2}`,
                        `Z`,
                      ].join(" ");

                      return (
                        <path
                          key={index}
                          d={pathData}
                          fill={item.color}
                          stroke="white"
                          strokeWidth="2"
                        />
                      );
                    });
                  })()}
                  <circle cx="50" cy="50" r="30" fill="white" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-bold ink">${totalCost}M</p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Leyenda horizontal debajo del gráfico */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {costBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs md:text-sm p-2 rounded hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }}></div>
                    <span className="text-gray-700 truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="font-semibold text-gray-900">${item.value}M</span>
                    <span className="text-gray-500">
                      {((item.value / totalCost) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programa y Avance (Semanal) */}
      <section className="bg-white rounded-lg shadow-sm p-4 md:p-6" style={{ borderColor: "var(--color-brand-line)", borderWidth: "1px", borderStyle: "solid" }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold ink">Programa y Avance (Semanal)</h2>
          {/* Selector de Proyecto */}
          <div className="flex items-center gap-3">
            <label htmlFor="project-select" className="text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap">
              Proyecto:
            </label>
            <select
              id="project-select"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-3 md:px-4 py-2 border rounded-lg bg-white text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent w-full md:w-auto"
              style={{ borderColor: "var(--color-brand-line)" }}
            >
              {Object.entries(projectsData).map(([key, project]) => (
                <option key={key} value={key}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Curva S de Valor Ganado */}
        <div className="mb-6 overflow-x-auto">
          <div className="min-w-[600px]">
            <ProjectSGraph
              data={selectedProjectData.data.map((point) => ({
                period: point.period,
                pv: point.pv,
                ev: point.ev ?? 0,
                ac: point.ac ?? 0,
              }))}
              projectName={selectedProjectData.name}
              currentDateIndex={selectedProjectData.currentDateIndex}
            />
          </div>
        </div>

        {/* Indicadores */}
        <div>
          <h3 className="text-base md:text-lg font-semibold ink mb-6">Indicadores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disciplines.map((discipline, index) => {
              // Generar datos para la minicurva S con forma realista
              const plannedPoints = generateRealisticSCurve(discipline.planned, 6);
              const actualPoints = generateRealisticSCurve(discipline.actual, 6);

              const miniHeight = 50;
              const performanceValue = discipline.performance ?? 0;
              // Gauge: 0 = 0°, 1.0 = 90° (centro), 2.0 = 180°
              // Para valores < 1.0: mapear de 0 a 90°
              // Para valores >= 1.0: mapear de 90° a 180°
              const performanceAngle = performanceValue < 1.0 
                ? performanceValue * 90 
                : 90 + (performanceValue - 1.0) * 90;
              const circumference = Math.PI * 40; // Radio 40
              const dashOffset = circumference - (performanceAngle / 180) * circumference;

              return (
                <div
                  key={index}
                  className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <h4 className="text-sm font-bold ink mb-4">{discipline.name}</h4>

                  <div className="grid grid-cols-[1fr,80px] gap-4 items-center">
                    {/* Minigráfico Curva S */}
                    <div className="space-y-2 min-w-0">
                      <div style={{ height: `${miniHeight}px` }}>
                        <svg width="100%" height={miniHeight} className="overflow-visible">
                          {/* Línea programada */}
                          <polyline
                            points={generateSCurvePoints(plannedPoints, miniHeight, 100)}
                            fill="none"
                            stroke="#9ca3af"
                            strokeWidth="1.5"
                            strokeDasharray="2 2"
                          />
                          {/* Línea real */}
                          <polyline
                            points={generateSCurvePoints(actualPoints, miniHeight, 100)}
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Prog: <span className="font-semibold text-gray-700">{discipline.planned}%</span></span>
                        <span className={`font-semibold ${discipline.actual < discipline.planned ? "text-red-600" : discipline.actual > discipline.planned ? "text-green-600" : "text-gray-700"}`}>
                          Real: {discipline.actual}%
                        </span>
                      </div>
                    </div>

                    {/* Gauge Chart para Rendimiento */}
                    {discipline.performance !== null ? (
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="relative w-16 h-16 md:w-20 md:h-20">
                          <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                            {/* Fondo del gauge */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="8"
                            />
                            {/* Arco de rendimiento */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke={discipline.performanceColor}
                              strokeWidth="8"
                              strokeDasharray={circumference}
                              strokeDashoffset={dashOffset}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span
                              className="text-sm md:text-lg font-bold"
                              style={{ color: discipline.performanceColor }}
                            >
                              {discipline.performance.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">Rendimiento</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-20 flex-shrink-0">
                        <span className="text-xs text-gray-400">N/A</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
