"use client";

import {
  MdOutlineAutoGraph,
  MdOutlineBarChart,
  MdOutlineFileDownload,
  MdOutlineAssessment,
  MdOutlineTimeline,
  MdOutlineInsights,
} from "react-icons/md";

const analyticsKpis = [
  {
    label: "Curvas actualizadas",
    value: "87%",
    detail: "Semana 07",
    color: "#2563eb",
    background: "#dbeafe",
  },
  {
    label: "Reportes financieros",
    value: "12",
    detail: "Últimos 30 días",
    color: "#16a34a",
    background: "#dcfce7",
  },
  {
    label: "Alertas desvío",
    value: "4",
    detail: "SPI < 0.95",
    color: "#f59e0b",
    background: "#fef3c7",
  },
  {
    label: "Capex proyectado",
    value: "$329M",
    detail: "Escenario pesimista",
    color: "#ef4444",
    background: "#fee2e2",
  },
];

const varianceAnalysis = [
  {
    project: "Torre Central",
    variance: -3.2,
    comment: "Incremento costos subestructuras",
    responsible: "Finanzas",
    due: "22 feb",
  },
  {
    project: "Residencial Norte",
    variance: -1.8,
    comment: "Mano de obra indirecta",
    responsible: "Operaciones",
    due: "28 feb",
  },
  {
    project: "Hospital Costanera",
    variance: 0.5,
    comment: "Optimización contratista drywall",
    responsible: "PMO",
    due: "01 mar",
  },
];

const forecastScenarios = [
  {
    scenario: "Base",
    eac: "$312M",
    spi: 0.97,
    cpi: 1.05,
    note: "Considera riesgos mitigados",
  },
  {
    scenario: "Optimista",
    eac: "$305M",
    spi: 1.01,
    cpi: 1.08,
    note: "Sin contingencias adicionales",
  },
  {
    scenario: "Pesimista",
    eac: "$329M",
    spi: 0.94,
    cpi: 1.01,
    note: "Desviaciones en logística",
  },
];

const revenueRealization = [
  { quarter: "Q1", plan: 78, actual: 74 },
  { quarter: "Q2", plan: 85, actual: 83 },
  { quarter: "Q3", plan: 90, actual: 88 },
  { quarter: "Q4", plan: 92, actual: 94 },
];

const analyticsReports = [
  {
    title: "Reporte financiero consolidado",
    owner: "Control Gestión",
    link: "#",
  },
  {
    title: "Dashboard curvas de avance",
    owner: "Planning",
    link: "#",
  },
  {
    title: "Alertas SPI/CPI",
    owner: "PMO",
    link: "#",
  },
];

export default function DashboardAnalisisPage() {
  return (
    <div className="space-y-10">
      <section className="bg-white border rounded-3xl p-8 shadow-sm grid gap-6 md:grid-cols-[2fr,1.2fr]" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="space-y-4">
          <span className="inline-block px-4 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-red/10 text-brand-red rounded-full">
            Análisis & Finanzas
          </span>
          <h1 className="text-3xl font-bold ink leading-snug">Seguimiento financiero y desempeño operativo</h1>
          <p className="text-sm text-gray-600 max-w-xl">
            Indicadores de curvas de avance, variaciones presupuestarias y escenarios financieros para la toma de decisiones ejecutiva.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Última actualización</span>
              <p className="text-lg font-semibold ink">21 feb 2025 - 07:30</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Proyectos monitoreados</span>
              <p className="text-lg font-semibold text-brand-red">15 activos</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Alertas activas</span>
              <p className="text-lg font-semibold text-amber-600">4 (SPI/CPI)</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Reportes emitidos mes</span>
              <p className="text-lg font-semibold text-gray-700">12 consolidados</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {analyticsKpis.map((card) => (
            <div key={card.label} className="rounded-2xl p-4 border bg-white" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wide text-gray-400">{card.label}</span>
                <span className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: card.background, color: card.color }}>
                  <MdOutlineAssessment className="w-5 h-5" />
                </span>
              </div>
              <p className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</p>
              <p className="text-xs text-gray-600 mt-2">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold ink">Análisis de varianza (SPI / CPI)</h2>
            <span className="text-xs text-gray-500">Periodo feb 2025</span>
          </div>
          <div className="space-y-3">
            {varianceAnalysis.map((item) => (
              <div key={item.project} className="border rounded-xl p-4 flex flex-col gap-2" style={{ borderColor: "var(--color-brand-line)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold ink">{item.project}</span>
                  <span className="text-xs font-semibold" style={{ color: item.variance >= 0 ? "#16a34a" : "#ef4444" }}>
                    {item.variance >= 0 ? "+" : ""}{item.variance.toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-gray-600">{item.comment}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Responsable: {item.responsible}</span>
                  <span>{item.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-3xl p-6 space-y-5" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <MdOutlineInsights className="w-5 h-5 text-brand-red" /> Curvas de avance vs meta
          </div>
          <div className="space-y-3">
            {revenueRealization.map((item) => (
              <div key={item.quarter} className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">{item.quarter}</span>
                  <span className="text-gray-400">Meta {item.plan}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-brand-red" style={{ width: `${item.actual}%` }}></div>
                </div>
                <span className="text-[11px] text-gray-500">Real {item.actual}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <MdOutlineAutoGraph className="w-5 h-5 text-brand-red" /> Escenarios financieros (EAC)
          </div>
          <div className="space-y-3">
            {forecastScenarios.map((scenario) => (
              <div key={scenario.scenario} className="border rounded-xl p-4" style={{ borderColor: "var(--color-brand-line)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold ink">Escenario {scenario.scenario}</span>
                  <span className="text-lg font-bold text-brand-red">{scenario.eac}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                  <span>SPI: {scenario.spi.toFixed(2)}</span>
                  <span>CPI: {scenario.cpi.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{scenario.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <h2 className="text-xl font-bold ink">Reportes clave</h2>
          <div className="space-y-3">
            {analyticsReports.map((report) => (
              <button
                key={report.title}
                className="w-full border rounded-xl p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                style={{ borderColor: "var(--color-brand-line)" }}
              >
                <div>
                  <p className="text-sm font-semibold ink">{report.title}</p>
                  <p className="text-xs text-gray-500">Elaborado por: {report.owner}</p>
                </div>
                <MdOutlineFileDownload className="w-5 h-5 text-brand-red" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
