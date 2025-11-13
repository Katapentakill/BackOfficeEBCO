"use client";

import { useMemo, useState } from "react";
import {
  MdTrendingUp,
  MdTrendingDown,
  MdAttachMoney,
  MdOutlineCalendarToday,
  MdWarning,
  MdPieChart,
  MdOutlineTimeline,
  MdOutlineAssignment,
  MdOutlineCalculate,
} from "react-icons/md";
import Link from "next/link";

const executiveKpis = [
  {
    title: "Ingresos acumulados",
    value: "$124.5M",
    detail: "+8.4% vs. mes anterior",
    background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
    accent: "#0f172a",
    icon: <MdAttachMoney className="w-6 h-6" />,
  },
  {
    title: "Margen operativo",
    value: "18.7%",
    detail: "Meta corporativa: 20%",
    background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    accent: "#b45309",
    icon: <MdTrendingUp className="w-6 h-6" />,
  },
  {
    title: "Promedio CPI",
    value: "1.06",
    detail: "> 1.0 = bajo presupuesto",
    background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    accent: "#047857",
    icon: <MdOutlineTimeline className="w-6 h-6" />,
  },
  {
    title: "Promedio SPI",
    value: "0.96",
    detail: "< 1.0 = atrasos · activar recuperación",
    background: "linear-gradient(135deg, #f87171 0%, #f97316 100%)",
    accent: "#b91c1c",
    icon: <MdTrendingDown className="w-6 h-6" />,
  },
];

const controlPanelNotes = [
  "Patrones de riesgo de margen: brechas sostenidas e irregularidad sugieren Cuadrante I / III.",
  "Costo de moldaje: la reposición bordea el 6-8% del contrato. Monitorear rotación.",
];

const projectPerformance = [
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

const riskMatrix = [
  { label: "Operacional", value: 35, color: "#ef4444" },
  { label: "Financiero", value: 25, color: "#f97316" },
  { label: "Contratos", value: 18, color: "#facc15" },
  { label: "Seguridad", value: 12, color: "#9ca3af" },
  { label: "Clima", value: 10, color: "#94a3b8" },
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

const projectHighlights = [
  {
    name: "Torre Central (Obra gruesa)",
    spi: 0.92,
    cpi: 1.04,
    risk: "Retraso suministro acero. Comité especial convocado.",
    nextReview: "26 feb",
  },
  {
    name: "Hospital Costanera (Terminaciones)",
    spi: 0.95,
    cpi: 0.99,
    risk: "Plan de mitigación seguridad en ejecución.",
    nextReview: "22 feb",
  },
  {
    name: "Residencial Norte (Inicio)",
    spi: 0.97,
    cpi: 1.08,
    risk: "Aprobación planos eléctricos pendiente.",
    nextReview: "04 mar",
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

type ProjectIndicatorMetric = {
  title: string;
  value: string;
  subtitle: string;
  status: string;
  color: string;
};

const projectIndicatorsPanel: Record<
  string,
  {
    stage: string;
    spi: number;
    cpi: number;
    risk: string;
    nextReview: string;
    manager: string;
    metrics: ProjectIndicatorMetric[];
  }
> = {
  "DS-49 Santa Marta": {
    stage: "Montaje estructural",
    spi: 0.96,
    cpi: 1.03,
    risk: "Coordinacion permisos electricos con municipio",
    nextReview: "27 feb",
    manager: "Marcelo R.",
    metrics: [
      { title: "Avance Fisico", value: "75%", subtitle: "vs 78% planificado", status: "Requiere atencion", color: "#f97316" },
      { title: "Presupuesto Ejecutado", value: "$34.8M", subtitle: "de $45.2M total", status: "En rango objetivo", color: "#16a34a" },
      { title: "CPI (Costo)", value: "1.03", subtitle: "> 1.0 = bajo presupuesto", status: "En rango objetivo", color: "#16a34a" },
      { title: "SPI (Plazo)", value: "0.96", subtitle: "< 1.0 = atrasos", status: "Requiere atencion", color: "#ef4444" },
      { title: "Dias de Retraso", value: "8", subtitle: "Retraso acumulado", status: "Requiere atencion", color: "#ef4444" },
    ],
  },
  "Conjunto Las Palmas": {
    stage: "Terminaciones interiores",
    spi: 1.01,
    cpi: 0.99,
    risk: "Tramo final de punch list en departamentos torre B",
    nextReview: "24 feb",
    manager: "Soledad Q.",
    metrics: [
      { title: "Avance Fisico", value: "95%", subtitle: "vs 94% planificado", status: "En rango objetivo", color: "#16a34a" },
      { title: "Presupuesto Ejecutado", value: "$32.8M", subtitle: "de $34.0M total", status: "En rango objetivo", color: "#16a34a" },
      { title: "CPI (Costo)", value: "0.99", subtitle: "~ 1.0 = en presupuesto", status: "Monitorear", color: "#f59e0b" },
      { title: "SPI (Plazo)", value: "1.01", subtitle: "> 1.0 = adelantado", status: "En rango objetivo", color: "#16a34a" },
      { title: "Dias de Retraso", value: "-5", subtitle: "Adelanto respecto programa", status: "En rango objetivo", color: "#16a34a" },
    ],
  },
  "Torre Central": {
    stage: "Obra gruesa",
    spi: 0.92,
    cpi: 1.04,
    risk: "Retraso suministro acero (comite especial convocado)",
    nextReview: "26 feb",
    manager: "Carolina M.",
    metrics: [
      { title: "Avance Fisico", value: "42%", subtitle: "vs 48% planificado", status: "Requiere atencion", color: "#ef4444" },
      { title: "Presupuesto Ejecutado", value: "$38.5M", subtitle: "de $89.5M total", status: "En rango objetivo", color: "#16a34a" },
      { title: "CPI (Costo)", value: "1.04", subtitle: "> 1.0 = bajo presupuesto", status: "En rango objetivo", color: "#16a34a" },
      { title: "SPI (Plazo)", value: "0.92", subtitle: "< 1.0 = atrasos", status: "Requiere atencion", color: "#ef4444" },
      { title: "Dias de Retraso", value: "12", subtitle: "Recuperacion en curso", status: "Requiere atencion", color: "#ef4444" },
    ],
  },
  "Residencial Norte": {
    stage: "Inicio de obra - Excavacion",
    spi: 0.97,
    cpi: 1.08,
    risk: "Aprobacion planos electricos pendiente",
    nextReview: "04 mar",
    manager: "Luis A.",
    metrics: [
      { title: "Avance Fisico", value: "28%", subtitle: "vs 26% planificado", status: "En rango objetivo", color: "#16a34a" },
      { title: "Presupuesto Ejecutado", value: "$12.4M", subtitle: "de $28.3M total", status: "En rango objetivo", color: "#16a34a" },
      { title: "CPI (Costo)", value: "1.08", subtitle: "> 1.0 = bajo presupuesto", status: "En rango objetivo", color: "#16a34a" },
      { title: "SPI (Plazo)", value: "0.97", subtitle: "Ligeramente bajo el plan", status: "Monitorear", color: "#f59e0b" },
      { title: "Dias de Retraso", value: "3", subtitle: "Permisos municipales", status: "Monitorear", color: "#f59e0b" },
    ],
  },
};

const operationalInsights = [
  {
    title: "Velocidad de vaciado nacional",
    highlight: "25 m3 / dia",
    description: "Media movil de proyectos de edificacion. Base para curvas S y dotaciones.",
    detail: "Objetivo >= 24 m3",
    color: "#ef4444",
    spark: [22, 23, 24, 26, 25, 25],
    target: 24,
  },
  {
    title: "Productividad cuadrillas hormigon",
    highlight: "92%",
    description: "Indice de desempeno semanal vs. estandar corporativo.",
    detail: "Meta >= 90%",
    color: "#16a34a",
    spark: [88, 91, 94, 89, 92, 93],
    target: 90,
  },
  {
    title: "Cumplimiento EE.TT. en plazo",
    highlight: "84%",
    description: "Entregables tecnicos recibidos dentro de la ventana comprometida.",
    detail: "Meta >= 85%",
    color: "#f97316",
    spark: [78, 82, 88, 86, 84, 83],
    target: 85,
  },
  {
    title: "Costo teorico grua",
    highlight: "$144MM",
    description: "Comparado con registrado $152MM en proyecto PRIME (ahorro potencial $8MM).",
    detail: "Variacion -5.3%",
    color: "#3b82f6",
    spark: [152, 149, 146, 144, 145, 144],
    target: 150,
  },
];

export default function DashboardGeneralPage() {
  const totalProjects = useMemo(() => projectPerformance.length, []);
  const avgSPI = useMemo(
    () => (projectPerformance.reduce((acc, p) => acc + p.spi, 0) / projectPerformance.length).toFixed(2),
    []
  );
  const avgCPI = useMemo(
    () => (projectPerformance.reduce((acc, p) => acc + p.cpi, 0) / projectPerformance.length).toFixed(2),
    []
  );

  const projectIndicatorNames = Object.keys(projectIndicatorsPanel);
  const [selectedIndicatorProject, setSelectedIndicatorProject] = useState(() => projectIndicatorNames[0] ?? "");
  const selectedIndicatorData = selectedIndicatorProject ? projectIndicatorsPanel[selectedIndicatorProject] : null;

  const revenueMax = Math.max(...revenueTrend.map((item) => item.value));
  const revenuePoints = revenueTrend.map((item, idx) => {
    const x = (idx / (revenueTrend.length - 1)) * 100;
    const y = 60 - (item.value / revenueMax) * 45 - 5;
    return { ...item, x, y };
  });
  const revenueLine = revenuePoints.map((point) => `${point.x},${point.y}`).join(" ");
  const revenueArea = `M0,60 ${revenuePoints.map((point) => `L${point.x},${point.y}`).join(" ")} L100,60 Z`;

  const getRowTone = (progress: number) => {
    if (progress < 50) return "bg-red-50/60";
    if (progress < 75) return "bg-amber-50/80";
    return "";
  };

  return (
    <div className="space-y-10">
      {/* Bloque superior */}
      <section className="grid gap-6 xl:grid-cols-[2.4fr,1fr]">
        <div className="bg-white border rounded-3xl p-8 shadow-sm space-y-6" style={{ borderColor: "var(--color-brand-line)" }}>
          <span className="inline-block px-4 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-red/10 text-brand-red rounded-full">
            Resumen ejecutivo
          </span>
          <h1 className="text-3xl font-bold ink leading-snug">Reporte integral para gerencia</h1>
          <p className="text-sm text-gray-600 max-w-xl">
            Visión consolidada de desempeño del portafolio, eficiencia operacional y focos de riesgo para la semana.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {executiveKpis.map((kpi) => (
              <div
                key={kpi.title}
                className="rounded-2xl p-5 text-white shadow-sm border"
                style={{ background: kpi.background, borderColor: `${kpi.accent}22` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-wide opacity-80">{kpi.title}</p>
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">{kpi.icon}</div>
                </div>
                <p className="text-3xl font-extrabold leading-tight">{kpi.value}</p>
                <p className="text-[11px] mt-2 opacity-90">{kpi.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Total proyectos</span>
              <p className="text-lg font-semibold ink">{totalProjects} activos</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Promedio SPI</span>
              <p className="text-lg font-semibold" style={{ color: Number(avgSPI) >= 1 ? "#16a34a" : "#ef4444" }}>
                {avgSPI}
              </p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Promedio CPI</span>
              <p className="text-lg font-semibold" style={{ color: Number(avgCPI) >= 1 ? "#16a34a" : "#ef4444" }}>
                {avgCPI}
              </p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Última actualización</span>
              <p className="text-lg font-semibold ink">21 feb 2025 · 07:45</p>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-3xl p-6 shadow-sm flex flex-col gap-5" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-red-600">Alertas críticas</span>
            <p className="text-3xl font-bold text-red-600 mt-2">3 proyectos en riesgo</p>
            <p className="text-xs text-red-500 mt-1 font-semibold">Requieren comité semanal</p>
          </div>
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wide text-gray-500">Panel de control de gestión</span>
            {controlPanelNotes.map((note) => (
              <div key={note} className="flex items-start gap-3 text-sm text-gray-600">
                <MdOutlineAssignment className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                <p>{note}</p>
              </div>
            ))}
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <MdOutlineCalculate className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
              <p>Costo de moldaje bajo vigilancia: reposición estimada 6-8% del contrato.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque central */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <MdPieChart className="w-5 h-5 text-brand-red" /> Evolución ingresos (MM USD)
            </div>
            <span className="text-xs text-gray-500">Últimos cinco meses</span>
          </div>
          <div className="relative">
            <svg viewBox="0 0 100 60" className="w-full h-40">
              <defs>
                <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={revenueArea} fill="url(#revenueFill)" stroke="none" />
              <polyline
                points={revenueLine}
                fill="none"
                stroke="#ef4444"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {revenuePoints.map((point) => (
                <circle key={point.month} cx={point.x} cy={point.y} r={1.4} fill="#ef4444" />
              ))}
            </svg>
            <div className="grid grid-cols-5 text-xs text-gray-500 mt-2">
              {revenueTrend.map((item) => (
                <div key={item.month} className="flex flex-col items-center">
                  <span className="font-semibold text-gray-700">{item.month}</span>
                  <span className="text-[11px] text-gray-500">USD {item.value}M</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <MdWarning className="w-5 h-5 text-brand-red" /> Matriz consolidada de riesgos
          </div>
          <div className="space-y-3">
            {riskMatrix.map((risk) => (
              <div key={risk.label}>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span className="font-semibold text-gray-700">{risk.label}</span>
                  <span className="font-semibold">{risk.value}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 rounded-full" style={{ width: `${risk.value}%`, background: risk.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-5" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <MdPieChart className="w-5 h-5 text-brand-red" /> Mix de portafolio
            </div>
            <span className="text-xs text-gray-500">Distribución por vertical</span>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(${portfolioMix
                    .map((item, idx) => {
                      const start = idx === 0 ? 0 : portfolioMix.slice(0, idx).reduce((acc, cur) => acc + cur.value, 0);
                      const end = start + item.value;
                      return `${item.color} ${start}% ${end}%`;
                    })
                    .join(", ")})`,
                }}
              ></div>
              <div className="w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center text-[10px] text-gray-500">
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

        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold ink">Visión por obra</h2>
            <span className="text-xs text-gray-500">Actualización semanal</span>
          </div>
          <div className="space-y-3">
            {projectHighlights.map((project) => (
              <div key={project.name} className="border rounded-2xl p-4 bg-white" style={{ borderColor: "var(--color-brand-line)" }}>
                <p className="text-sm font-semibold ink">{project.name}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                  <span className="font-semibold text-gray-700">SPI {project.spi.toFixed(2)}</span>
                  <span className="font-semibold text-gray-700">CPI {project.cpi.toFixed(2)}</span>
                  <span className="flex items-center gap-1">
                    <MdOutlineCalendarToday className="w-4 h-4" /> {project.nextReview}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-3 leading-relaxed">{project.risk}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloque proyectos */}
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
                <th className="text-left px-4 py-3">Dias restantes</th>
              </tr>
            </thead>
            <tbody>
              {projectsTable.map((project) => (
                <tr key={project.name} className={`border-b ${getRowTone(project.progress)}`} style={{ borderColor: "var(--color-brand-line)" }}>
                  <td className="px-4 py-4 font-semibold text-brand-text-dark">{project.name}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${project.progress}%`,
                            background: project.progress >= 75 ? "#16a34a" : project.progress >= 50 ? "#f59e0b" : "#ef4444",
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
                        border: `1px solid ${project.statusColor}33`,
                      }}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{project.daysLeft} dias</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white border rounded-3xl p-6 space-y-5" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold ink">Indicadores clave por obra (KPIs)</h2>
            <p className="text-xs text-gray-500 mt-1">Datos operativos consolidados</p>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="kpi-project-select" className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Proyecto
            </label>
            <select
              id="kpi-project-select"
              value={selectedIndicatorProject}
              onChange={(e) => setSelectedIndicatorProject(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
              style={{ borderColor: "var(--color-brand-line)" }}
            >
              {projectIndicatorNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedIndicatorData && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedIndicatorData.metrics.map((metric) => (
                <div
                  key={metric.title}
                  className="border rounded-2xl p-5 bg-white/90 shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderColor: `${metric.color}33` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold ink">{metric.title}</p>
                    <span
                      className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold"
                      style={{ background: `${metric.color}1a`, color: metric.color }}
                    >
                      {metric.status}
                    </span>
                  </div>
                  <p className="text-3xl font-extrabold" style={{ color: metric.color }}>{metric.value}</p>
                  <p className="text-xs text-gray-500 mt-2">{metric.subtitle}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600 pt-4 border-t" style={{ borderColor: "var(--color-brand-line)" }}>
              <span>
                <span className="text-gray-400 uppercase tracking-wide">Etapa:</span>{" "}
                <span className="font-semibold text-gray-700">{selectedIndicatorData.stage}</span>
              </span>
              <span>
                <span className="text-gray-400 uppercase tracking-wide">Responsable:</span>{" "}
                <span className="font-semibold text-gray-700">{selectedIndicatorData.manager}</span>
              </span>
              <span>
                <span className="text-gray-400 uppercase tracking-wide">SPI:</span>{" "}
                <span className="font-semibold" style={{ color: selectedIndicatorData.spi >= 1 ? "#16a34a" : "#ef4444" }}>
                  {selectedIndicatorData.spi.toFixed(2)}
                </span>
              </span>
              <span>
                <span className="text-gray-400 uppercase tracking-wide">CPI:</span>{" "}
                <span className="font-semibold" style={{ color: selectedIndicatorData.cpi >= 1 ? "#16a34a" : "#f97316" }}>
                  {selectedIndicatorData.cpi.toFixed(2)}
                </span>
              </span>
              <span className="min-w-[180px]">
                <span className="text-gray-400 uppercase tracking-wide">Riesgo:</span>{" "}
                <span className="font-semibold text-gray-700">{selectedIndicatorData.risk}</span>
              </span>
              <span>
                <span className="text-gray-400 uppercase tracking-wide">Próx. revisión:</span>{" "}
                <span className="font-semibold text-gray-700">{selectedIndicatorData.nextReview}</span>
              </span>
            </div>
          </>
        )}
      </section>

      {/* Bloque inferior */}
      <section className="grid gap-6 xl:grid-cols-[1.6fr,1fr]">
        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <h2 className="text-xl font-bold ink">Hallazgos operacionales</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {operationalInsights.map((insight) => {
              const sparkSeries = insight.spark;
              const sparkMax = Math.max(...sparkSeries, insight.target ?? 0);
              const baseY = 30;
              const points = sparkSeries.map((value, idx) => {
                const x = sparkSeries.length === 1 ? 0 : (idx / (sparkSeries.length - 1)) * 100;
                const scaled = sparkMax === 0 ? 0 : (value / sparkMax) * 24;
                const y = baseY - scaled;
                return { x, y };
              });
              const sparkArea = `M0,${baseY} ${points.map((point) => `L${point.x},${point.y}`).join(" ")} L100,${baseY} Z`;
              const sparkLine = points.map((point) => `${point.x},${point.y}`).join(" ");
              const gradientId = `sparkFill-${insight.title.replace(/\\s+/g, "-")}`;
              const lastPoint = points[points.length - 1];
              const targetY =
                insight.target !== undefined
                  ? baseY - (sparkMax === 0 ? 0 : (insight.target / sparkMax) * 24)
                  : null;

              return (
                <div
                  key={insight.title}
                  className="border rounded-2xl p-5 bg-gradient-to-br from-white via-white to-brand-bg-light shadow-sm space-y-3"
                  style={{ borderColor: "var(--color-brand-line)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-red mb-1">{insight.title}</p>
                      <p className="text-lg font-bold" style={{ color: insight.color }}>{insight.highlight}</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold" style={{ background: `${insight.color}20`, color: insight.color }}>
                      {insight.detail}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{insight.description}</p>
                  <svg viewBox="0 0 100 30" className="w-full h-16">
                    <defs>
                      <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={insight.color} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={insight.color} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={sparkArea} fill={`url(#${gradientId})`} stroke="none" />
                    <polyline points={sparkLine} fill="none" stroke={insight.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    {targetY !== null && (
                      <line x1="0" y1={targetY} x2="100" y2={targetY} stroke={insight.color} strokeDasharray="3 3" strokeOpacity="0.4" strokeWidth={0.8} />
                    )}
                    {lastPoint && <circle cx={lastPoint.x} cy={lastPoint.y} r={2} fill="#fff" stroke={insight.color} strokeWidth={1.2} />}
                  </svg>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <MdOutlineCalendarToday className="w-5 h-5 text-brand-red" /> Próximos hitos / agenda
          </div>
          <div className="space-y-3">
            {upcomingMilestones.map((milestone) => (
              <div key={milestone.title} className="border rounded-xl p-4" style={{ borderColor: "var(--color-brand-line)" }}>
                <p className="text-sm font-semibold ink">{milestone.title}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MdOutlineCalendarToday className="w-4 h-4" /> {milestone.date}
                  </span>
                  <span>{milestone.time}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Responsable: {milestone.owner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
