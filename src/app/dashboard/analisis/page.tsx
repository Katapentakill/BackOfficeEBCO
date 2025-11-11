"use client";

import {
  MdOutlineBarChart,
  MdOutlineFileDownload,
  MdOutlineTimeline,
  MdWarning,
  MdTrendingUp,
  MdTrendingDown,
  MdRemove,
} from "react-icons/md";

export default function DashboardAnalisisPage() {
  // Datos para el gráfico de barras de costos
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

  // Datos para la Curva S principal
  const sCurveData = [
    { week: 0, planned: 0, actual: 0, projected: 0 },
    { week: 4, planned: 15, actual: 12, projected: 12 },
    { week: 8, planned: 30, actual: 28, projected: 28 },
    { week: 12, planned: 50, actual: 48, projected: 48 },
    { week: 16, planned: 70, actual: 68, projected: 68 },
    { week: 20, planned: 85, actual: 82, projected: 82 },
    { week: 24, planned: 95, actual: 88, projected: 90 },
    { week: 28, planned: 100, actual: null, projected: 95 },
  ];

  const maxValue = 100;
  const chartHeight = 300;

  // Datos para las disciplinas
  const disciplines = [
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
  ];

  // Función para generar puntos de la Curva S
  const generateSCurvePoints = (values: number[], height: number) => {
    return values
      .map((value, index) => {
        if (value === null) return null;
        const x = (index / (values.length - 1)) * 100;
        const y = height - (value / maxValue) * height;
        return `${x},${y}`;
      })
      .filter((point) => point !== null)
      .join(" ");
  };

  return (
    <div className="space-y-8 p-6">
      {/* Título y KPIs Principales */}
      <section>
        <h1 className="text-4xl font-bold ink mb-6">Módulo 3: Dashboard de Gestión</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* SPI */}
          <div className="bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: "var(--color-brand-line)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600">SPI</span>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "#fee2e2" }}>
                <MdTrendingDown className="w-6 h-6" style={{ color: "#ef4444" }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: "#ef4444" }}>0.92</p>
            <p className="text-xs text-gray-500 mt-2">Índice Rendimiento Programa</p>
            <p className="text-xs text-red-600 mt-1 font-semibold">Retraso</p>
          </div>

          {/* CPI */}
          <div className="bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: "var(--color-brand-line)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600">CPI</span>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "#fef3c7" }}>
                <MdRemove className="w-6 h-6" style={{ color: "#f59e0b" }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: "#f59e0b" }}>0.98</p>
            <p className="text-xs text-gray-500 mt-2">Índice Rendimiento Costo</p>
            <p className="text-xs text-amber-600 mt-1 font-semibold">Leve sobrecosto</p>
          </div>

          {/* Avance General */}
          <div className="bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: "var(--color-brand-line)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600">Avance General</span>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "#dbeafe" }}>
                <MdOutlineTimeline className="w-6 h-6" style={{ color: "#2563eb" }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: "#2563eb" }}>88%</p>
            <p className="text-xs text-gray-500 mt-2">ISP (Índice de Seguimiento)</p>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: "88%" }}></div>
            </div>
          </div>

          {/* Alertas Semanales */}
          <div className="bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: "var(--color-brand-line)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600">Alertas Semanales</span>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "#fee2e2" }}>
                <MdWarning className="w-6 h-6" style={{ color: "#ef4444" }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: "#ef4444" }}>3</p>
            <p className="text-xs text-gray-500 mt-2">Requieren atención</p>
          </div>
        </div>
      </section>

      {/* Control de Costo (Mensual) */}
      <section>
        <h2 className="text-2xl font-bold ink mb-6">Control de Costo (Mensual)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          {/* Gráfico de Barras - Variación de Costos */}
          <div className="bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: "var(--color-brand-line)" }}>
            <h3 className="text-lg font-semibold ink mb-6">Variación de Costos</h3>
            <div className="space-y-6">
              {costData.map((item, index) => {
                const maxBar = Math.max(item.budget, item.actual);
                const budgetWidth = (item.budget / maxBar) * 100;
                const actualWidth = (item.actual / maxBar) * 100;
                const variance = ((item.actual - item.budget) / item.budget) * 100;

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-700">{item.category}</span>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-gray-500">Presup. ${item.budget}M</span>
                        <span className="text-blue-600 font-semibold">Real ${item.actual}M</span>
                        <span
                          className={`font-semibold ${variance >= 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          {variance >= 0 ? "+" : ""}
                          {variance.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="relative h-8 bg-gray-100 rounded">
                      {/* Barra presupuestada (gris) */}
                      <div
                        className="absolute top-0 left-0 h-full bg-gray-400 rounded"
                        style={{ width: `${budgetWidth}%` }}
                      ></div>
                      {/* Barra real (azul) */}
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-500 rounded"
                        style={{ width: `${actualWidth}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gráfico de Dona - Desglose de Costos */}
          <div className="bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: "var(--color-brand-line)" }}>
            <h3 className="text-lg font-semibold ink mb-6">Desglose de Costos</h3>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
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
                    <p className="text-2xl font-bold ink">${totalCost}M</p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {costBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ background: item.color }}></div>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">${item.value}M</span>
                    <span className="text-xs text-gray-500">
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
      <section>
        <h2 className="text-2xl font-bold ink mb-6">Programa y Avance (Semanal)</h2>

        {/* Curva S Principal */}
        <div className="bg-white border rounded-xl p-6 shadow-sm mb-6" style={{ borderColor: "var(--color-brand-line)" }}>
          <h3 className="text-lg font-semibold ink mb-6">Curva S - Avance General (ISP)</h3>
          <div className="relative" style={{ height: `${chartHeight + 60}px` }}>
            <svg width="100%" height={chartHeight} className="overflow-visible">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((value) => {
                const y = chartHeight - (value / maxValue) * chartHeight;
                return (
                  <g key={value}>
                    <line
                      x1="0"
                      y1={y}
                      x2="100%"
                      y2={y}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <text x="0" y={y - 5} fontSize="12" fill="#6b7280">
                      {value}%
                    </text>
                  </g>
                );
              })}

              {/* Eje X - Semanas */}
              {sCurveData.map((point, index) => {
                const x = (index / (sCurveData.length - 1)) * 100;
                return (
                  <text
                    key={index}
                    x={`${x}%`}
                    y={chartHeight + 20}
                    fontSize="11"
                    fill="#6b7280"
                    textAnchor="middle"
                  >
                    Sem {point.week}
                  </text>
                );
              })}

              {/* Línea Base Programada (gris) */}
              <polyline
                points={generateSCurvePoints(
                  sCurveData.map((d) => d.planned),
                  chartHeight
                )}
                fill="none"
                stroke="#9ca3af"
                strokeWidth="3"
                strokeDasharray="5 5"
              />

              {/* Línea de Avance Real (azul sólida) */}
              <polyline
                points={generateSCurvePoints(
                  sCurveData.map((d) => d.actual ?? 0),
                  chartHeight
                )}
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
              />

              {/* Línea Proyectada (azul punteada) */}
              <polyline
                points={generateSCurvePoints(
                  sCurveData.map((d) => d.projected),
                  chartHeight
                )}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity="0.7"
              />

              {/* Puntos de datos */}
              {sCurveData.map((point, index) => {
                if (point.actual === null) return null;
                const x = (index / (sCurveData.length - 1)) * 100;
                const y = chartHeight - (point.actual / maxValue) * chartHeight;
                return (
                  <circle
                    key={index}
                    cx={`${x}%`}
                    cy={y}
                    r="4"
                    fill="#2563eb"
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>

            {/* Leyenda */}
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-gray-400" style={{ borderTop: "2px dashed #9ca3af" }}></div>
                <span className="text-gray-600">Línea Base Programada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-blue-500"></div>
                <span className="text-gray-600">Avance Real (88%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-blue-400" style={{ borderTop: "2px dashed #3b82f6" }}></div>
                <span className="text-gray-600">Línea Proyectada</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cuadrícula de Indicadores de Disciplina */}
        <div className="bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: "var(--color-brand-line)" }}>
          <h3 className="text-lg font-semibold ink mb-6">Indicadores por Disciplina</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disciplines.map((discipline, index) => {
              // Generar datos para la minicurva S
              const miniSCurve = [
                { week: 0, planned: 0, actual: 0 },
                { week: 4, planned: discipline.planned * 0.2, actual: discipline.actual * 0.2 },
                { week: 8, planned: discipline.planned * 0.4, actual: discipline.actual * 0.4 },
                { week: 12, planned: discipline.planned * 0.6, actual: discipline.actual * 0.6 },
                { week: 16, planned: discipline.planned * 0.8, actual: discipline.actual * 0.8 },
                { week: 20, planned: discipline.planned, actual: discipline.actual },
              ];

              const miniHeight = 60;
              const miniMax = 100;

              return (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  style={{ borderColor: "var(--color-brand-line)" }}
                >
                  <h4 className="text-sm font-semibold ink mb-3">{discipline.name}</h4>

                  {/* Minigráfico Curva S */}
                  <div className="mb-3" style={{ height: `${miniHeight}px` }}>
                    <svg width="100%" height={miniHeight} className="overflow-visible">
                      {/* Línea programada */}
                      <polyline
                        points={generateSCurvePoints(
                          miniSCurve.map((d) => d.planned),
                          miniHeight
                        )}
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                      {/* Línea real */}
                      <polyline
                        points={generateSCurvePoints(
                          miniSCurve.map((d) => d.actual),
                          miniHeight
                        )}
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-gray-500">Real: {discipline.actual}%</span>
                      <span className="text-gray-500">Prog: {discipline.planned}%</span>
                    </div>
                  </div>

                  {/* Rendimiento */}
                  <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--color-brand-line)" }}>
                    <span className="text-xs text-gray-600">Rendimiento:</span>
                    {discipline.performance !== null ? (
                      <span
                        className="text-sm font-bold"
                        style={{ color: discipline.performanceColor }}
                      >
                        {discipline.performance.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
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
