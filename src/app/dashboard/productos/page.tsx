"use client";

import { useState } from "react";
import {
  MdOutlineHandshake,
  MdOutlineAssignment,
  MdOutlineInventory,
  MdOutlineTimeline,
  MdOutlineBarChart,
  MdOutlineFileDownload,
  MdOutlineCalendarToday,
  MdWarning,
  MdCheckCircle,
  MdError,
  MdInfo,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
} from "react-icons/md";

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

// Datos por proyecto
const projectsData: Record<string, {
  name: string;
  contractHealth: {
    atRisk: number;
    underObservation: number;
    onTrack: number;
    total: number;
  };
  paymentFlow: {
    data: number[];
    totalPaid: number;
    inValidation: number;
  };
  biddingEfficiency: {
    rate: number;
    avgCycle: number;
    totalProposals: number;
    awarded: number;
  };
  ageAlerts: {
    count: number;
    details: Array<{ type: string; count: number }>;
  };
  funnelData: Array<{ stage: string; count: number; color: string }>;
  contractHealthTable: Array<{
    subcontract: string;
    status: string;
    progress: number;
    deviation: { days: number; type: string; color: string };
    alerts: { count: number; type: string; details?: string[] };
  }>;
  paymentData: {
    totalApproved: number;
    contracted: number;
    invoiced: number;
    paid: number;
    inReview: { count: number; amount: number };
  };
  paymentValidation: Array<{ ep: string; contract: string; status: string; type: string }>;
  closureProcesses: Array<{ contract: string; status: string; type: string }>;
  spendByCategory: Array<{ label: string; value: number; color: string }>;
}> = {
  "torre-central": {
    name: "Torre Central",
    contractHealth: {
      atRisk: 3,
      underObservation: 5,
      onTrack: 26,
      total: 34,
    },
    paymentFlow: {
      data: [2.1, 2.3, 2.0, 2.5],
      totalPaid: 8.9,
      inValidation: 1.1,
    },
    biddingEfficiency: {
      rate: 25,
      avgCycle: 18,
      totalProposals: 22,
      awarded: 3,
    },
    ageAlerts: {
      count: 4,
      details: [
        { type: "Propuestas en Comité", count: 2 },
        { type: "Solicitud de Pedido sin respuesta", count: 1 },
        { type: "Contrato SC en revisión legal", count: 1 },
      ],
    },
    funnelData: [
      { stage: "Propuestas Recibidas", count: 22, color: "#3b82f6" },
      { stage: "En Revisión Técnica (EE.TT.)", count: 15, color: "#8b5cf6" },
      { stage: "En Revisión Comercial (Cuadros Comp.)", count: 8, color: "#f59e0b" },
      { stage: "Adjudicado / En Contrato", count: 3, color: "#16a34a" },
    ],
    contractHealthTable: [
      {
        subcontract: "Obras Civiles EBA",
        status: "Activo",
        progress: 75,
        deviation: { days: 8, type: "delay", color: "#ef4444" },
        alerts: { count: 2, type: "critical", details: ["No entrega EEPP Caratulas", "Incumplimiento HES SC"] },
      },
      {
        subcontract: "HVAC - FríoAndes",
        status: "Activo",
        progress: 90,
        deviation: { days: -2, type: "ahead", color: "#16a34a" },
        alerts: { count: 0, type: "ok" },
      },
      {
        subcontract: "Terminaciones DI",
        status: "En Cierre",
        progress: 100,
        deviation: { days: 0, type: "on-time", color: "#6b7280" },
        alerts: { count: 1, type: "warning", details: ["Retención pendiente"] },
      },
    ],
    paymentData: {
      totalApproved: 9.8,
      contracted: 9.8,
      invoiced: 8.1,
      paid: 7.5,
      inReview: { count: 3, amount: 0.45 },
    },
    paymentValidation: [
      { ep: "EP #7", contract: "Obras Civiles EBA", status: "En revisión Back Office", type: "review" },
      { ep: "EP #4", contract: "HVAC FríoAndes", status: "Disputado (Requiere validación)", type: "disputed" },
      { ep: "EP #8", contract: "Terminaciones DI", status: "Aprobado para Pago", type: "approved" },
    ],
    closureProcesses: [
      { contract: "Terminaciones DI", status: "Pendiente Finiquito SC", type: "pending" },
      { contract: "Pinturas L&M", status: "Cerrado y Finiquitado", type: "closed" },
    ],
    spendByCategory: [
      { label: "Obras civiles", value: 38, color: "#f97316" },
      { label: "Instalaciones", value: 27, color: "#16a34a" },
      { label: "Terminaciones", value: 22, color: "#2563eb" },
      { label: "Servicios", value: 13, color: "#ef4444" },
    ],
  },
  "residencial-norte": {
    name: "Residencial Norte",
    contractHealth: {
      atRisk: 1,
      underObservation: 3,
      onTrack: 18,
      total: 22,
    },
    paymentFlow: {
      data: [1.5, 1.8, 1.6, 1.9],
      totalPaid: 6.8,
      inValidation: 0.8,
    },
    biddingEfficiency: {
      rate: 30,
      avgCycle: 15,
      totalProposals: 15,
      awarded: 4,
    },
    ageAlerts: {
      count: 2,
      details: [
        { type: "Propuestas en Comité", count: 1 },
        { type: "Contrato SC en revisión legal", count: 1 },
      ],
    },
    funnelData: [
      { stage: "Propuestas Recibidas", count: 15, color: "#3b82f6" },
      { stage: "En Revisión Técnica (EE.TT.)", count: 10, color: "#8b5cf6" },
      { stage: "En Revisión Comercial (Cuadros Comp.)", count: 6, color: "#f59e0b" },
      { stage: "Adjudicado / En Contrato", count: 4, color: "#16a34a" },
    ],
    contractHealthTable: [
      {
        subcontract: "Estructura Metálica",
        status: "Activo",
        progress: 65,
        deviation: { days: -3, type: "ahead", color: "#16a34a" },
        alerts: { count: 0, type: "ok" },
      },
      {
        subcontract: "Instalaciones Sanitarias",
        status: "Activo",
        progress: 45,
        deviation: { days: 5, type: "delay", color: "#ef4444" },
        alerts: { count: 1, type: "warning", details: ["Retraso en materiales"] },
      },
    ],
    paymentData: {
      totalApproved: 7.2,
      contracted: 7.2,
      invoiced: 6.0,
      paid: 5.5,
      inReview: { count: 2, amount: 0.3 },
    },
    paymentValidation: [
      { ep: "EP #5", contract: "Estructura Metálica", status: "Aprobado para Pago", type: "approved" },
      { ep: "EP #3", contract: "Instalaciones Sanitarias", status: "En revisión Back Office", type: "review" },
    ],
    closureProcesses: [
      { contract: "Pinturas L&M", status: "Cerrado y Finiquitado", type: "closed" },
    ],
    spendByCategory: [
      { label: "Obras civiles", value: 35, color: "#f97316" },
      { label: "Instalaciones", value: 30, color: "#16a34a" },
      { label: "Terminaciones", value: 25, color: "#2563eb" },
      { label: "Servicios", value: 10, color: "#ef4444" },
    ],
  },
  "hospital-costanera": {
    name: "Hospital Costanera",
    contractHealth: {
      atRisk: 5,
      underObservation: 8,
      onTrack: 32,
      total: 45,
    },
    paymentFlow: {
      data: [3.2, 3.5, 3.0, 3.8],
      totalPaid: 13.5,
      inValidation: 2.2,
    },
    biddingEfficiency: {
      rate: 20,
      avgCycle: 22,
      totalProposals: 30,
      awarded: 6,
    },
    ageAlerts: {
      count: 6,
      details: [
        { type: "Propuestas en Comité", count: 3 },
        { type: "Solicitud de Pedido sin respuesta", count: 2 },
        { type: "Contrato SC en revisión legal", count: 1 },
      ],
    },
    funnelData: [
      { stage: "Propuestas Recibidas", count: 30, color: "#3b82f6" },
      { stage: "En Revisión Técnica (EE.TT.)", count: 22, color: "#8b5cf6" },
      { stage: "En Revisión Comercial (Cuadros Comp.)", count: 12, color: "#f59e0b" },
      { stage: "Adjudicado / En Contrato", count: 6, color: "#16a34a" },
    ],
    contractHealthTable: [
      {
        subcontract: "Obras Civiles EBA",
        status: "Activo",
        progress: 85,
        deviation: { days: 12, type: "delay", color: "#ef4444" },
        alerts: { count: 3, type: "critical", details: ["No entrega EEPP Caratulas", "Incumplimiento HES SC", "Retraso en hitos"] },
      },
      {
        subcontract: "HVAC - FríoAndes",
        status: "Activo",
        progress: 92,
        deviation: { days: -1, type: "ahead", color: "#16a34a" },
        alerts: { count: 0, type: "ok" },
      },
      {
        subcontract: "Eléctrico - Spark",
        status: "Iniciando",
        progress: 20,
        deviation: { days: 0, type: "on-time", color: "#6b7280" },
        alerts: { count: 0, type: "ok" },
      },
    ],
    paymentData: {
      totalApproved: 15.2,
      contracted: 15.2,
      invoiced: 12.8,
      paid: 11.5,
      inReview: { count: 5, amount: 0.85 },
    },
    paymentValidation: [
      { ep: "EP #12", contract: "Obras Civiles EBA", status: "Disputado (Requiere validación)", type: "disputed" },
      { ep: "EP #9", contract: "HVAC FríoAndes", status: "En revisión Back Office", type: "review" },
      { ep: "EP #15", contract: "Eléctrico Spark", status: "Aprobado para Pago", type: "approved" },
    ],
    closureProcesses: [
      { contract: "Terminaciones DI", status: "Pendiente Finiquito SC", type: "pending" },
    ],
    spendByCategory: [
      { label: "Obras civiles", value: 42, color: "#f97316" },
      { label: "Instalaciones", value: 28, color: "#16a34a" },
      { label: "Terminaciones", value: 20, color: "#2563eb" },
      { label: "Servicios", value: 10, color: "#ef4444" },
    ],
  },
};

export default function DashboardProductosPage() {
  const [selectedProject, setSelectedProject] = useState<string>("torre-central");
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
  const [selectedAlertDetails, setSelectedAlertDetails] = useState<boolean>(false);

  // Obtener datos del proyecto seleccionado
  const projectData = projectsData[selectedProject];
  const contractHealthData = projectData.contractHealth;
  const paymentFlowData = projectData.paymentFlow;
  const biddingEfficiency = projectData.biddingEfficiency;
  const ageAlerts = projectData.ageAlerts;

  return (
    <div className="space-y-10">
      <section className="bg-white border rounded-3xl p-8 shadow-sm grid gap-6 md:grid-cols-[2fr,1.2fr]" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-block px-4 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-red/10 text-brand-red rounded-full">
              Productos & Subcontratos
            </span>
            {/* Selector de Proyecto */}
            <div className="flex items-center gap-3">
              <label htmlFor="project-select-products" className="text-xs font-semibold text-gray-600 whitespace-nowrap">
                Proyecto:
              </label>
              <select
                id="project-select-products"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="px-3 py-1.5 border rounded-lg bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
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
          <h1 className="text-3xl font-bold ink leading-snug">Monitoreo ejecutivo de contratación y EE.TT.</h1>
          <p className="text-sm text-gray-600 max-w-xl">
            Estado del pipeline de subcontratos, solicitudes de especificaciones técnicas y entregables clave para gerencia.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* 1. Salud de Contratos */}
          <div className="rounded-2xl p-4 border bg-white" style={{ borderColor: "var(--color-brand-line)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wide text-gray-400">Salud de Contratos</span>
              <MdOutlineHandshake className="w-5 h-5 text-brand-red" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {/* En Riesgo */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeDasharray={`${(contractHealthData.atRisk / contractHealthData.total) * 251.2} 251.2`}
                    strokeDashoffset="0"
                  />
                  {/* En Observación */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    strokeDasharray={`${(contractHealthData.underObservation / contractHealthData.total) * 251.2} 251.2`}
                    strokeDashoffset={-(contractHealthData.atRisk / contractHealthData.total) * 251.2}
                  />
                  {/* En Línea */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="8"
                    strokeDasharray={`${(contractHealthData.onTrack / contractHealthData.total) * 251.2} 251.2`}
                    strokeDashoffset={-((contractHealthData.atRisk + contractHealthData.underObservation) / contractHealthData.total) * 251.2}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700">{contractHealthData.total}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-600">En Riesgo: <span className="font-semibold text-red-600">{contractHealthData.atRisk}</span></span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span className="text-xs text-gray-600">Observación: <span className="font-semibold text-amber-600">{contractHealthData.underObservation}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-600">En Línea: <span className="font-semibold text-green-600">{contractHealthData.onTrack}</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Flujo de Pagos */}
          <div className="rounded-2xl p-4 border bg-white" style={{ borderColor: "var(--color-brand-line)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wide text-gray-400">Flujo de Pagos (Últimos 30d)</span>
              <MdOutlineBarChart className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-1">${paymentFlowData.totalPaid}M</p>
            <p className="text-xs text-gray-600 mb-3">${paymentFlowData.inValidation}M en validación</p>
            {/* Sparkline */}
            <div className="h-8 flex items-end gap-1">
              {paymentFlowData.data.map((value, idx) => {
                const maxValue = Math.max(...paymentFlowData.data);
                const height = (value / maxValue) * 100;
                return (
                  <div
                    key={idx}
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${height}%`, minHeight: "4px" }}
                    title={`Semana ${idx + 1}: $${value}M`}
                  ></div>
                );
              })}
            </div>
          </div>

          {/* 3. Eficiencia de Licitación */}
          <div className="rounded-2xl p-4 border bg-white" style={{ borderColor: "var(--color-brand-line)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wide text-gray-400">Eficiencia de Licitación</span>
              <MdOutlineTimeline className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600 mb-1">{biddingEfficiency.rate}%</p>
            <p className="text-xs text-gray-600 mb-2">Tasa de adjudicación</p>
            <p className="text-xs text-gray-500">Ciclo promedio: <span className="font-semibold">{biddingEfficiency.avgCycle} días</span></p>
            <p className="text-xs text-gray-400 mt-1">({biddingEfficiency.awarded} de {biddingEfficiency.totalProposals} adjudicadas)</p>
          </div>

          {/* 4. Alertas de Antigüedad */}
          <div className="rounded-2xl p-4 border bg-white relative" style={{ borderColor: "var(--color-brand-line)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wide text-gray-400">Alertas de Antigüedad</span>
              <MdWarning className="w-5 h-5 text-red-600" />
            </div>
            <button
              onClick={() => setSelectedAlertDetails(!selectedAlertDetails)}
              className="w-full text-left"
            >
              <p className="text-2xl font-bold text-red-600 mb-1">{ageAlerts.count}</p>
              <p className="text-xs text-gray-600">Procesos con &gt; 10 días sin movimiento</p>
            </button>
            {selectedAlertDetails && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg p-3 z-10" style={{ borderColor: "var(--color-brand-line)" }}>
                <p className="text-xs font-semibold mb-2 text-gray-700">Detalles de alertas:</p>
                <ul className="space-y-1">
                  {ageAlerts.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                      <span className="text-red-500 mt-0.5">•</span>
                      {detail.count} {detail.type}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Módulo 1: Estado Licitaciones */}
      <section className="bg-white border rounded-lg shadow-sm p-6" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold ink">Estado Licitaciones</h2>
          <span className="text-xs text-gray-500">Estado al 21 feb</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {projectData.funnelData.map((stage, index) => {
            const maxCount = projectData.funnelData[0].count;
            const widthPercent = (stage.count / maxCount) * 100;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full mb-2">
                  <div
                    className="h-8 rounded-lg flex items-center justify-center text-white text-sm font-semibold transition-all"
                    style={{ 
                      background: stage.color,
                      width: `${Math.max(widthPercent, 20)}%`,
                      minWidth: "60px"
                    }}
                  >
                    {stage.count}
                  </div>
                </div>
                <p className="text-xs text-gray-600 text-center font-medium mt-2">{stage.stage}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Módulo 2: Monitor de Salud de Contratos */}
      <section className="bg-white border rounded-lg shadow-sm p-6" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold ink">Monitor de Salud de Contratos</h2>
          <span className="text-xs text-gray-500">Actualizado hoy</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--color-brand-line)" }}>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Subcontrato</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Estado</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Avance Físico</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Desvío (Retraso)</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Alertas</th>
              </tr>
            </thead>
            <tbody>
              {projectData.contractHealthTable.map((contract, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--color-brand-line)" }}>
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold ink">{contract.subcontract}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      contract.status === "Activo" ? "bg-green-100 text-green-700" :
                      contract.status === "En Cierre" ? "bg-yellow-100 text-yellow-700" :
                      contract.status === "Cerrado" ? "bg-gray-100 text-gray-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{ width: `${contract.progress}%`, background: contract.status === "Cerrado" ? "#16a34a" : "#2563eb" }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-700">{contract.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      {contract.deviation.days > 0 && <MdOutlineTrendingUp className="w-4 h-4" style={{ color: contract.deviation.color }} />}
                      {contract.deviation.days < 0 && <MdOutlineTrendingDown className="w-4 h-4" style={{ color: contract.deviation.color }} />}
                      <span className="text-xs font-semibold" style={{ color: contract.deviation.color }}>
                        {contract.deviation.days > 0 ? `+${contract.deviation.days}` : contract.deviation.days} días
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="relative">
                      {contract.alerts.count > 0 ? (
                        <button
                          onClick={() => setSelectedAlert(selectedAlert === index ? null : index)}
                          className="flex items-center gap-1 text-xs font-semibold hover:opacity-80 transition-opacity"
                          style={{ color: contract.alerts.type === "critical" ? "#ef4444" : "#f59e0b" }}
                        >
                          {contract.alerts.type === "critical" ? (
                            <MdError className="w-4 h-4" />
                          ) : (
                            <MdWarning className="w-4 h-4" />
                          )}
                          {contract.alerts.count} {contract.alerts.count === 1 ? "Alerta" : "Alertas"}
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                          <MdCheckCircle className="w-4 h-4" />
                          OK
                        </div>
                      )}
                      {selectedAlert === index && contract.alerts.details && (
                        <div className="absolute left-0 top-6 z-10 bg-white border rounded-lg shadow-lg p-3 min-w-[250px]" style={{ borderColor: "var(--color-brand-line)" }}>
                          <p className="text-xs font-semibold mb-2 text-gray-700">Detalles de alertas:</p>
                          <ul className="space-y-1">
                            {contract.alerts.details.map((detail, idx) => (
                              <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                                <span className="text-red-500 mt-0.5">•</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Módulo 3: Control de Pagos y Cierre */}
      <section className="bg-white border rounded-lg shadow-sm p-6" style={{ borderColor: "var(--color-brand-line)" }}>
        <h2 className="text-xl md:text-2xl font-bold ink mb-6">Control de Pagos y Cierre</h2>
        
        {/* KPIs de Pagos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 border-l-4 rounded-lg p-4" style={{ borderLeftColor: "#2563eb" }}>
            <p className="text-xs text-gray-600 mb-1">Total Aprobado (Cubicaciones)</p>
            <p className="text-2xl font-bold ink">${projectData.paymentData.totalApproved}M</p>
          </div>
          <div className="bg-gray-50 border-l-4 rounded-lg p-4" style={{ borderLeftColor: "#6b7280" }}>
            <p className="text-xs text-gray-600 mb-1">Contratado</p>
            <p className="text-2xl font-bold text-gray-700">${projectData.paymentData.contracted}M</p>
          </div>
          <div className="bg-yellow-50 border-l-4 rounded-lg p-4" style={{ borderLeftColor: "#f59e0b" }}>
            <p className="text-xs text-gray-600 mb-1">Facturado</p>
            <p className="text-2xl font-bold" style={{ color: "#f59e0b" }}>${projectData.paymentData.invoiced}M</p>
          </div>
          <div className="bg-green-50 border-l-4 rounded-lg p-4" style={{ borderLeftColor: "#16a34a" }}>
            <p className="text-xs text-gray-600 mb-1">Pagado</p>
            <p className="text-2xl font-bold text-green-600">${projectData.paymentData.paid}M</p>
          </div>
        </div>

        {/* Gráfico de Barras Apiladas */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Total Facturado vs. Pagado</h3>
          <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
            {/* Barra de Contratado (fondo) */}
            <div
              className="absolute top-0 left-0 h-full bg-gray-300"
              style={{ width: "100%" }}
            ></div>
            {/* Barra de Facturado */}
            <div
              className="absolute top-0 left-0 h-full bg-yellow-500 opacity-80"
              style={{ width: `${(projectData.paymentData.invoiced / projectData.paymentData.contracted) * 100}%` }}
            ></div>
            {/* Barra de Pagado */}
            <div
              className="absolute top-0 left-0 h-full bg-green-500"
              style={{ width: `${(projectData.paymentData.paid / projectData.paymentData.contracted) * 100}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-semibold text-white">
              <span>Contratado: ${projectData.paymentData.contracted}M</span>
              <span>Facturado: ${projectData.paymentData.invoiced}M</span>
              <span>Pagado: ${projectData.paymentData.paid}M</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Validación de Pagos */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold ink">Validación de Pagos</h3>
              <span className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded-full">
                {projectData.paymentData.inReview.count} en revisión (${projectData.paymentData.inReview.amount}M)
              </span>
            </div>
            <div className="space-y-2">
              {projectData.paymentValidation.map((payment, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 flex items-center justify-between"
                  style={{ borderColor: "var(--color-brand-line)" }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold ink">{payment.ep}</p>
                    <p className="text-xs text-gray-600">{payment.contract}</p>
                    <p className={`text-xs mt-1 font-medium ${
                      payment.type === "approved" ? "text-green-600" :
                      payment.type === "disputed" ? "text-red-600" :
                      "text-yellow-600"
                    }`}>
                      {payment.status}
                    </p>
                  </div>
                  <div>
                    {payment.type === "approved" && <MdCheckCircle className="w-5 h-5 text-green-600" />}
                    {payment.type === "disputed" && <MdError className="w-5 h-5 text-red-600" />}
                    {payment.type === "review" && <MdInfo className="w-5 h-5 text-yellow-600" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Procesos de Cierre */}
          <div>
            <h3 className="text-base font-semibold ink mb-4">Procesos de Cierre</h3>
            <div className="space-y-2">
              {projectData.closureProcesses.map((process, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 flex items-center justify-between"
                  style={{ borderColor: "var(--color-brand-line)" }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold ink">{process.contract}</p>
                    <p className={`text-xs mt-1 font-medium ${
                      process.type === "closed" ? "text-green-600" : "text-yellow-600"
                    }`}>
                      {process.status}
                    </p>
                  </div>
                  <div>
                    {process.type === "closed" ? (
                      <MdCheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <MdOutlineTimeline className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border rounded-lg shadow-sm p-6" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-4">
          <MdOutlineBarChart className="w-5 h-5 text-brand-red" /> Fondos por categoría
        </div>
        <div className="space-y-3">
          {projectData.spendByCategory.map((item) => (
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
      </section>

      {/* Reportes disponibles */}
      <section className="bg-white border rounded-lg shadow-sm p-6" style={{ borderColor: "var(--color-brand-line)" }}>
        <h2 className="text-xl md:text-2xl font-bold ink mb-6">Reportes disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productosReports.map((report) => (
            <button
              key={report.title}
              className="border rounded-lg p-4 flex flex-col gap-2 text-left hover:bg-gray-50 transition-colors"
              style={{ borderColor: "var(--color-brand-line)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold ink mb-1">{report.title}</p>
                  <p className="text-xs text-gray-500">Equipo responsable: {report.owner}</p>
                </div>
                <MdOutlineFileDownload className="w-5 h-5 text-brand-red flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
