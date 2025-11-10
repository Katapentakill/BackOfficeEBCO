"use client";

import { useMemo, useState } from "react";
import {
  MdTrendingUp,
  MdTrendingDown,
  MdAttachMoney,
  MdOutlineCalendarToday,
  MdOutlineAssignment,
  MdOutlineDocumentScanner,
  MdOutlineFileDownload,
  MdCheckCircle,
  MdWarning,
  MdPieChart,
  MdOutlineTimeline,
} from "react-icons/md";
import Link from "next/link";

const summaryCards = [
  {
    label: "Ingresos acumulados",
    value: "$124.5M",
    detail: "+8.4% vs. mes anterior",
    icon: <MdAttachMoney className="w-6 h-6" />,
    color: "#16a34a",
    background: "#dcfce7",
  },
  {
    label: "Margen operativo",
    value: "18.7%",
    detail: "Meta corporativa: 20%",
    icon: <MdTrendingUp className="w-6 h-6" />,
    color: "#2563eb",
    background: "#dbeafe",
  },
  {
    label: "Proyectos en riesgo",
    value: "3",
    detail: "requieren comité semanal",
    icon: <MdWarning className="w-6 h-6" />,
    color: "#ef4444",
    background: "#fee2e2",
  },
  {
    label: "Reportes emitidos",
    value: "12",
    detail: "últimos 30 días",
    icon: <MdOutlineDocumentScanner className="w-6 h-6" />,
    color: "#f59e0b",
    background: "#fef3c7",
  },
];

const projectSnapshot = [
  {
    name: "Torre Central",
    stage: "Obra gruesa",
    spi: 0.92,
    cpi: 1.04,
    manager: "Carolina M.",
    risk: "Retraso suministro acero",
    nextReview: "26 feb",
  },
  {
    name: "Residencial Norte",
    stage: "Inicio",
    spi: 0.97,
    cpi: 1.08,
    manager: "Luis A.",
    risk: "Aprobación planos eléctricos",
    nextReview: "04 mar",
  },
  {
    name: "Hospital Costanera",
    stage: "Terminaciones",
    spi: 0.95,
    cpi: 0.99,
    manager: "María P.",
    risk: "Plan mitigación seguridad",
    nextReview: "22 feb",
  },
  {
    name: "Campus Corporativo",
    stage: "Cimentación",
    spi: 1.01,
    cpi: 1.12,
    manager: "Andrés V.",
    risk: "Revisión contratos HVAC",
    nextReview: "28 feb",
  },
];

const revenueTrend = [
  { month: "Oct", value: 92 },
  { month: "Nov", value: 104 },
  { month: "Dic", value: 117 },
  { month: "Ene", value: 121 },
  { month: "Feb", value: 124 },
];

const portfolioMix = [
  { label: "Vivienda", value: 42, color: "#f97316" },
  { label: "Hospitales", value: 28, color: "#2563eb" },
  { label: "Corporativo", value: 18, color: "#16a34a" },
  { label: "Infraestructura", value: 12, color: "#ef4444" },
];

const riskSummary = [
  { label: "Operacional", value: 35 },
  { label: "Financiero", value: 25 },
  { label: "Contratos", value: 18 },
  { label: "Seguridad", value: 12 },
  { label: "Clima", value: 10 },
];

const obraKPIs = [
  {
    title: "Avance Físico",
    value: "75%",
    subtitle: "vs 78% planificado",
    trend: "down" as const,
    color: "#f59e0b",
    icon: <MdTrendingUp className="w-6 h-6" />,
    bgColor: "#fef3c7",
  },
  {
    title: "Presupuesto Ejecutado",
    value: "$34.8M",
    subtitle: "de $45.2M total",
    trend: "on" as const,
    color: "#16a34a",
    icon: <MdAttachMoney className="w-6 h-6" />,
    bgColor: "#dcfce7",
  },
  {
    title: "CPI (Costo)",
    value: "1.08",
    subtitle: "> 1.0 = bajo presupuesto",
    trend: "up" as const,
    color: "#16a34a",
    icon: <MdOutlineTimeline className="w-6 h-6" />,
    bgColor: "#dcfce7",
  },
  {
    title: "SPI (Plazo)",
    value: "0.96",
    subtitle: "< 1.0 = atrasos",
    trend: "down" as const,
    color: "#f59e0b",
    icon: <MdOutlineTimeline className="w-6 h-6" />,
    bgColor: "#fef3c7",
  },
  {
    title: "Días de Retraso",
    value: "-8",
    subtitle: "8 días atrasado",
    trend: "down" as const,
    color: "#ef4444",
    icon: <MdWarning className="w-6 h-6" />,
    bgColor: "#fee2e2",
  },
  {
    title: "Mano de Obra",
    value: "42",
    subtitle: "de 40 planificados",
    trend: "up" as const,
    color: "#16a34a",
    icon: <MdCheckCircle className="w-6 h-6" />,
    bgColor: "#dcfce7",
  },
];

const projectsTable = [
  {
    name: "DS-49 Santa Marta",
    progress: 75,
    budget: "$45.2M",
    status: "En curso",
    statusColor: "#E30613",
    daysLeft: 45,
  },
  {
    name: "Conjunto Las Palmas",
    progress: 95,
    budget: "$32.8M",
    status: "Finalizando",
    statusColor: "#16a34a",
    daysLeft: 12,
  },
  {
    name: "Torre Central",
    progress: 42,
    budget: "$89.5M",
    status: "En curso",
    statusColor: "#E30613",
    daysLeft: 180,
  },
  {
    name: "Residencial Norte",
    progress: 28,
    budget: "$28.3M",
    status: "Inicio",
    statusColor: "#3b82f6",
    daysLeft: 320,
  },
];

const initialReports = [
  {
    id: "RPT-2402-001",
    project: "Torre Central",
    date: "2025-02-18",
    author: "Carolina M.",
    summary: "Se mantiene riesgo en fachada por retraso proveedor. Mitigación en curso.",
    link: "#",
  },
  {
    id: "RPT-2402-002",
    project: "Residencial Norte",
    date: "2025-02-16",
    author: "Luis A.",
    summary: "Avance dentro de rango. Solicitud de incremento cuadrilla eléctrica.",
    link: "#",
  },
  {
    id: "RPT-2402-003",
    project: "Hospital Costanera",
    date: "2025-02-14",
    author: "María P.",
    summary: "Se completa instalación drywall. Se programa prueba sanitaria.",
    link: "#",
  },
];

const upcomingMilestones = [
  {
    title: "Comité ejecutivo de proyectos",
    date: "Martes 27 feb",
    time: "09:00 hrs",
    owner: "Gerente de Operaciones",
  },
  {
    title: "Cierre financiero febrero",
    date: "Miércoles 28 feb",
    time: "11:30 hrs",
    owner: "Control Gestión",
  },
  {
    title: "Reporte mandante Hospital Costanera",
    date: "Viernes 01 mar",
    time: "08:00 hrs",
    owner: "PMO",
  },
];

export default function DashboardGeneralPage() {
  const [reports, setReports] = useState(initialReports);
  const [newReport, setNewReport] = useState({
    project: "Torre Central",
    date: "",
    author: "",
    summary: "",
  });

  const totalProjects = useMemo(() => projectSnapshot.length, []);
  const avgSPI = useMemo(
    () => (projectSnapshot.reduce((acc, p) => acc + p.spi, 0) / projectSnapshot.length).toFixed(2),
    []
  );
  const avgCPI = useMemo(
    () => (projectSnapshot.reduce((acc, p) => acc + p.cpi, 0) / projectSnapshot.length).toFixed(2),
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newReport.date || !newReport.author || !newReport.summary.trim()) {
      return;
    }
    const reportId = `RPT-${newReport.date.replace(/-/g, "").slice(2)}-${String(reports.length + 1).padStart(3, "0")}`;
    const formattedSummary = newReport.summary.trim();
    setReports((prev) => [
      {
        id: reportId,
        project: newReport.project,
        date: newReport.date,
        author: newReport.author,
        summary: formattedSummary,
        link: "#",
      },
      ...prev,
    ]);
    setNewReport({ project: newReport.project, date: "", author: "", summary: "" });
  };

  return (
    <div className="space-y-10">
      <section className="bg-white border rounded-3xl p-8 shadow-sm grid gap-6 md:grid-cols-[2fr,1.2fr]" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="space-y-4">
          <span className="inline-block px-4 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-red/10 text-brand-red rounded-full">
            Resumen ejecutivo
          </span>
          <h1 className="text-3xl font-bold ink leading-snug">Reporte integral de avance para gerencia</h1>
          <p className="text-sm text-gray-600 max-w-xl">
            Consolidado semanal del portafolio, indicadores operacionales y estados críticos por proyecto.
            Información limitada para uso estratégico.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Total proyectos</span>
              <p className="text-lg font-semibold ink">{totalProjects} activos</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Promedio SPI</span>
              <p className="text-lg font-semibold" style={{ color: Number(avgSPI) >= 1 ? "#16a34a" : "#ef4444" }}>{avgSPI}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Promedio CPI</span>
              <p className="text-lg font-semibold" style={{ color: Number(avgCPI) >= 1 ? "#16a34a" : "#ef4444" }}>{avgCPI}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Última actualización</span>
              <p className="text-lg font-semibold ink">21 feb 2025 - 07:45</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {summaryCards.map((card, idx) => (
            <div key={idx} className="rounded-2xl p-4 border bg-white" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wide text-gray-400">{card.label}</span>
                <span className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: card.background, color: card.color }}>
                  {card.icon}
                </span>
              </div>
              <p className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</p>
              <p className="text-xs text-gray-600 mt-2">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="bg-white border rounded-3xl p-6 space-y-5" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <MdPieChart className="w-5 h-5 text-brand-red" /> Evolución ingresos (MM USD)
            </div>
            <span className="text-xs text-gray-500">Últimos cinco meses</span>
          </div>
          <div className="h-40 flex items-end gap-3">
            {revenueTrend.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-10 rounded-t-lg bg-gradient-to-br from-brand-red to-brand"
                  style={{ height: `${Math.max(item.value / 1.5, 20)}px` }}
                  title={`USD ${item.value}M`}
                ></div>
                <span className="text-xs text-gray-500">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-3xl p-6 space-y-5" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <MdPieChart className="w-5 h-5 text-brand-red" /> Mix de portafolio
            </div>
            <span className="text-xs text-gray-500">Distribución por vertical</span>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full" style={{
                background: `conic-gradient(${portfolioMix
                  .map((item, idx) => `${item.color} ${idx === 0 ? 0 : portfolioMix.slice(0, idx).reduce((acc, cur) => acc + cur.value, 0)}% ${portfolioMix
                  .slice(0, idx + 1)
                  .reduce((acc, cur) => acc + cur.value, 0)}%`)
                  .join(", ")})`
              }}></div>
              <div className="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center text-xs text-gray-500">
                <span className="font-semibold text-brand-red">Portafolio</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {portfolioMix.map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-xs text-gray-500">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: item.color }}></span>
                <span className="font-semibold text-gray-700 w-28">{item.label}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${item.value}%`, background: item.color }}></div>
                </div>
                <span className="w-10 text-right font-semibold text-gray-700">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold ink">Visión por obra</h2>
          <span className="text-xs text-gray-500">Actualizado semanalmente</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#f7f8fa] text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">Proyecto</th>
                <th className="px-4 py-3 text-left">Etapa</th>
                <th className="px-4 py-3 text-left">SPI</th>
                <th className="px-4 py-3 text-left">CPI</th>
                <th className="px-4 py-3 text-left">Riesgo principal</th>
                <th className="px-4 py-3 text-left">Responsable</th>
                <th className="px-4 py-3 text-left">Próx. Revisión</th>
              </tr>
            </thead>
            <tbody>
              {projectSnapshot.map((project) => (
                <tr key={project.name} className="border-b" style={{ borderColor: "var(--color-brand-line)" }}>
                  <td className="px-4 py-4 font-semibold text-brand-text-dark">{project.name}</td>
                  <td className="px-4 py-4 text-gray-500">{project.stage}</td>
                  <td className="px-4 py-4 font-semibold" style={{ color: project.spi >= 1 ? "#16a34a" : "#f97316" }}>{project.spi.toFixed(2)}</td>
                  <td className="px-4 py-4 font-semibold" style={{ color: project.cpi >= 1 ? "#16a34a" : "#ef4444" }}>{project.cpi.toFixed(2)}</td>
                  <td className="px-4 py-4 text-gray-600">{project.risk}</td>
                  <td className="px-4 py-4 text-gray-600">{project.manager}</td>
                  <td className="px-4 py-4 text-gray-500">{project.nextReview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <MdOutlineAssignment className="w-5 h-5 text-brand-red" /> Historial de reportes a gerencia
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 bg-brand-bg-light border rounded-2xl p-4" style={{ borderColor: "var(--color-brand-line)" }}>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Proyecto</label>
              <select
                value={newReport.project}
                onChange={(e) => setNewReport((prev) => ({ ...prev, project: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-700"
                style={{ borderColor: "var(--color-brand-line)" }}
              >
                {projectSnapshot.map((project) => (
                  <option key={project.name} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Fecha informe</label>
              <input
                type="date"
                value={newReport.date}
                onChange={(e) => setNewReport((prev) => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-700"
                style={{ borderColor: "var(--color-brand-line)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Autor</label>
              <input
                type="text"
                value={newReport.author}
                onChange={(e) => setNewReport((prev) => ({ ...prev, author: e.target.value }))}
                placeholder="Nombre responsable"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-700"
                style={{ borderColor: "var(--color-brand-line)" }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-2">Resumen ejecutivo</label>
              <textarea
                rows={3}
                value={newReport.summary}
                onChange={(e) => setNewReport((prev) => ({ ...prev, summary: e.target.value }))}
                placeholder="Descripción breve para gerencia"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-700"
                style={{ borderColor: "var(--color-brand-line)" }}
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="btn btn-primary flex items-center gap-2"
              >
                <MdOutlineFileDownload className="w-5 h-5" />
                Registrar reporte
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="border rounded-2xl p-4 flex items-start justify-between gap-4 bg-white" style={{ borderColor: "var(--color-brand-line)" }}>
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wide mb-1">
                    <MdOutlineCalendarToday className="w-4 h-4" /> {report.date}
                    <span className="px-2 py-0.5 bg-brand-red/10 text-brand-red font-semibold rounded-full">{report.project}</span>
                  </div>
                  <p className="text-sm font-semibold ink">{report.id} · {report.author}</p>
                  <p className="text-xs text-gray-600 mt-2 max-w-3xl">{report.summary}</p>
                </div>
                <button className="text-brand-red text-xs font-semibold flex items-center gap-1">
                  Descargar
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5h8v14H5z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <MdCheckCircle className="w-5 h-5 text-brand-red" /> Próximos hitos / agenda
          </div>
          <div className="space-y-3">
            {upcomingMilestones.map((milestone) => (
              <div key={milestone.title} className="border rounded-xl p-4" style={{ borderColor: "var(--color-brand-line)" }}>
                <p className="text-sm font-semibold ink">{milestone.title}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                  <span className="flex items-center gap-1"><MdOutlineCalendarToday className="w-4 h-4" /> {milestone.date}</span>
                  <span>{milestone.time}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Responsable: {milestone.owner}</p>
              </div>
            ))}
          </div>
          <div className="border rounded-2xl p-4" style={{ borderColor: "var(--color-brand-line)" }}>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Resumen de riesgos</span>
            <div className="mt-3 space-y-2">
              {riskSummary.map((risk) => (
                <div key={risk.label} className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="w-24 font-semibold text-gray-700">{risk.label}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-brand-red" style={{ width: `${risk.value}%` }}></div>
                  </div>
                  <span className="w-10 text-right font-semibold text-gray-700">{risk.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold ink">Indicadores clave por obra (KPIs)</h2>
          <span className="text-xs text-gray-500">Datos operativos consolidados</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {obraKPIs.map((kpi, idx) => (
            <div
              key={idx}
              className="rounded-2xl border p-5 bg-white hover:shadow-md transition-shadow"
              style={{ borderColor: "var(--color-brand-line)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold ink">{kpi.title}</p>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow"
                  style={{ background: kpi.bgColor, color: kpi.color }}
                >
                  {kpi.icon}
                </div>
              </div>
              <p className="text-3xl font-extrabold" style={{ color: kpi.color }}>
                {kpi.value}
              </p>
              <p className="text-xs text-gray-500 mt-2">{kpi.subtitle}</p>
              <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: kpi.trend === "down" ? "#ef4444" : "#16a34a" }}>
                {kpi.trend === "down" ? <MdTrendingDown className="w-4 h-4" /> : <MdTrendingUp className="w-4 h-4" />}
                {kpi.trend === "down" ? "Requiere atención" : "En rango objetivo"}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold ink">Proyectos activos</h2>
          <Link href="/analisis" className="btn btn-outline text-sm">
            Ver análisis completo
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#f7f8fa] text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Proyecto</th>
                <th className="text-left px-4 py-3">Avance</th>
                <th className="text-left px-4 py-3">Presupuesto</th>
                <th className="text-left px-4 py-3">Estado</th>
                <th className="text-left px-4 py-3">Días restantes</th>
              </tr>
            </thead>
            <tbody>
              {projectsTable.map((project) => (
                <tr key={project.name} className="border-b" style={{ borderColor: "var(--color-brand-line)" }}>
                  <td className="px-4 py-4 font-semibold text-brand-text-dark">{project.name}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${project.progress}%`,
                            background: project.progress >= 75 ? "#16a34a" : project.progress >= 50 ? "#f59e0b" : "#3b82f6",
                          }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-600">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-600">{project.budget}</td>
                  <td className="px-4 py-4">
                    <span
                      className="chip"
                      style={{
                        background: project.status === "En curso" ? "#fee2e2" : project.status === "Finalizando" ? "#dcfce7" : "#dbeafe",
                        color: project.statusColor,
                        border: `1px solid ${project.statusColor}40`,
                      }}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{project.daysLeft} días</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
