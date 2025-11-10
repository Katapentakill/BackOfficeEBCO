"use client";

import {
  MdOutlineHandshake,
  MdOutlineAssignment,
  MdOutlineInventory,
  MdOutlineTimeline,
  MdOutlineBarChart,
  MdOutlineFileDownload,
  MdOutlineCalendarToday,
} from "react-icons/md";

const productKpis = [
  {
    label: "Contratos activos",
    value: "34",
    detail: "4 en renovación",
    color: "#16a34a",
    background: "#dcfce7",
  },
  {
    label: "Cubicaciones aprobadas",
    value: "$9.8M",
    detail: "Semana 07",
    color: "#2563eb",
    background: "#dbeafe",
  },
  {
    label: "Solicitudes EE.TT",
    value: "27",
    detail: "Ciclo 2.4 días",
    color: "#f59e0b",
    background: "#fef3c7",
  },
  {
    label: "Propuestas en revisión",
    value: "8",
    detail: "Comité 22 feb",
    color: "#ef4444",
    background: "#fee2e2",
  },
];

const pipeline = [
  {
    name: "Subcontrato obras civiles",
    contractor: "Constructora E&A",
    amount: "$1.8M",
    status: "Revisión legal",
    expected: "26 feb",
  },
  {
    name: "Especialidad HVAC",
    contractor: "FríoAndes",
    amount: "$950K",
    status: "Adjudicación comité",
    expected: "29 feb",
  },
  {
    name: "Terminaciones interiores",
    contractor: "Diseño Integral",
    amount: "$1.2M",
    status: "Evaluación financiera",
    expected: "05 mar",
  },
];

const eeTTRequests = [
  {
    project: "Hospital Costanera",
    item: "Panel acústico premium",
    analyst: "Paula R.",
    status: "Despacho 23 feb",
  },
  {
    project: "Residencial Norte",
    item: "Carpintería aluminio",
    analyst: "Jorge L.",
    status: "En fabricación",
  },
  {
    project: "Campus Corporativo",
    item: "Sistemas FireProof",
    analyst: "Laura P.",
    status: "Importación",
  },
];

const deliverables = [
  {
    name: "Planilla EE.TT Febrero",
    date: "18 feb",
    owner: "Natalia V.",
  },
  {
    name: "Informe cubicaciones semana 07",
    date: "15 feb",
    owner: "Cristóbal R.",
  },
  {
    name: "Reporte comparativo subcontratos",
    date: "12 feb",
    owner: "Analía T.",
  },
];

const spendByCategory = [
  { label: "Obras civiles", value: 38, color: "#f97316" },
  { label: "Instalaciones", value: 27, color: "#16a34a" },
  { label: "Terminaciones", value: 22, color: "#2563eb" },
  { label: "Servicios", value: 13, color: "#ef4444" },
];

const monthlyApprovals = [
  { month: "Oct", value: 14 },
  { month: "Nov", value: 18 },
  { month: "Dic", value: 21 },
  { month: "Ene", value: 17 },
  { month: "Feb", value: 19 },
];

const productosReports = [
  {
    title: "Reporte contratos críticos",
    owner: "Control contratos",
    link: "#",
  },
  {
    title: "Comparativo proveedores EE.TT",
    owner: "Compras técnicas",
    link: "#",
  },
  {
    title: "Seguimiento cubicaciones",
    owner: "PMO",
    link: "#",
  },
];

export default function DashboardProductosPage() {
  return (
    <div className="space-y-10">
      <section className="bg-white border rounded-3xl p-8 shadow-sm grid gap-6 md:grid-cols-[2fr,1.2fr]" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="space-y-4">
          <span className="inline-block px-4 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-red/10 text-brand-red rounded-full">
            Productos & Subcontratos
          </span>
          <h1 className="text-3xl font-bold ink leading-snug">Monitoreo ejecutivo de contratación y EE.TT.</h1>
          <p className="text-sm text-gray-600 max-w-xl">
            Estado del pipeline de subcontratos, solicitudes de especificaciones técnicas y entregables clave para gerencia.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Contratos gestionados</span>
              <p className="text-lg font-semibold ink">34 activos</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Ciclo medio aprobación</span>
              <p className="text-lg font-semibold text-brand-red">8.6 días</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">EE.TT completadas</span>
              <p className="text-lg font-semibold text-gray-700">27 (feb)</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Último entregable</span>
              <p className="text-lg font-semibold ink">Planilla 18 feb</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {productKpis.map((card) => (
            <div key={card.label} className="rounded-2xl p-4 border bg-white" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wide text-gray-400">{card.label}</span>
                <span className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: card.background, color: card.color }}>
                  <MdOutlineHandshake className="w-5 h-5" />
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
            <h2 className="text-xl font-bold ink">Pipeline de subcontratos</h2>
            <span className="text-xs text-gray-500">Estado al 21 feb</span>
          </div>
          <div className="space-y-3">
            {pipeline.map((contract) => (
              <div key={contract.name} className="border rounded-xl p-4 flex flex-col gap-2 bg-white" style={{ borderColor: "var(--color-brand-line)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold ink">{contract.name}</span>
                  <span className="text-xs text-gray-500">{contract.status}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MdOutlineHandshake className="w-4 h-4" /> {contract.contractor}</span>
                  <span className="flex items-center gap-1"><MdOutlineBarChart className="w-4 h-4" /> {contract.amount}</span>
                  <span className="flex items-center gap-1"><MdOutlineTimeline className="w-4 h-4" /> Comité {contract.expected}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-3xl p-6 space-y-5" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <MdOutlineBarChart className="w-5 h-5 text-brand-red" /> Fondos por categoría
          </div>
          <div className="space-y-3">
            {spendByCategory.map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-xs text-gray-500">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: item.color }}></span>
                <span className="w-28 font-semibold text-gray-700">{item.label}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${item.value}%`, background: item.color }}></div>
                </div>
                <span className="w-10 text-right font-semibold text-gray-700">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="bg-white border rounded-3xl p-6 space-y-5" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold ink">Solicitudes EE.TT. en curso</h2>
            <span className="text-xs text-gray-500">Seguimiento semanal</span>
          </div>
          <div className="space-y-3">
            {eeTTRequests.map((request) => (
              <div key={request.project} className="border rounded-xl p-4" style={{ borderColor: "var(--color-brand-line)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold ink">{request.project}</span>
                  <span className="text-xs text-gray-500">Analista: {request.analyst}</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">Material: {request.item}</p>
                <p className="text-xs text-gray-500 mt-2">Estado: {request.status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-3xl p-6 space-y-5" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <MdOutlineTimeline className="w-5 h-5 text-brand-red" /> Aprobaciones mensuales
          </div>
          <div className="h-40 flex items-end gap-3">
            {monthlyApprovals.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-10 rounded-t-lg bg-gradient-to-br from-brand-red to-brand"
                  style={{ height: `${Math.max(item.value * 5, 20)}px` }}
                  title={`${item.value} aprobaciones`}
                ></div>
                <span className="text-xs text-gray-500">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <MdOutlineAssignment className="w-5 h-5 text-brand-red" /> Entregables recientes
          </div>
          <div className="space-y-3">
            {deliverables.map((deliverable) => (
              <button
                key={deliverable.name}
                className="border rounded-xl p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                style={{ borderColor: "var(--color-brand-line)" }}
              >
                <div>
                  <p className="text-sm font-semibold ink">{deliverable.name}</p>
                  <p className="text-xs text-gray-500">{deliverable.date} · {deliverable.owner}</p>
                </div>
                <MdOutlineFileDownload className="w-5 h-5 text-brand-red" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <h2 className="text-xl font-bold ink">Reportes disponibles</h2>
          <div className="space-y-3">
            {productosReports.map((report) => (
              <button
                key={report.title}
                className="w-full border rounded-xl p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                style={{ borderColor: "var(--color-brand-line)" }}
              >
                <div>
                  <p className="text-sm font-semibold ink">{report.title}</p>
                  <p className="text-xs text-gray-500">Equipo responsable: {report.owner}</p>
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
