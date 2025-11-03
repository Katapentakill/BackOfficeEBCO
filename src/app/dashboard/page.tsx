"use client";

import { 
  MdTrendingUp, 
  MdTrendingDown, 
  MdCheckCircle, 
  MdSchedule, 
  MdPerson, 
  MdBuild,
  MdAttachMoney,
  MdAssessment,
  MdWarning,
  MdDoneAll
} from "react-icons/md";
import Link from "next/link";

export default function DashboardPage() {
  // KPIs Data
  const kpis = [
    {
      title: "Avance Físico",
      value: "68.5%",
      subtitle: "vs 70% planificado",
      trend: "down",
      color: "#f59e0b",
      icon: <MdTrendingUp className="w-6 h-6" />,
      bgColor: "#fef3c7"
    },
    {
      title: "Presupuesto Ejecutado",
      value: "$124.5M",
      subtitle: "de $180M total",
      trend: "on-track",
      color: "#16a34a",
      icon: <MdAttachMoney className="w-6 h-6" />,
      bgColor: "#dcfce7"
    },
    {
      title: "CPI (Costo)",
      value: "1.05",
      subtitle: "> 1.0 = bajo presupuesto",
      trend: "up",
      color: "#16a34a",
      icon: <MdAssessment className="w-6 h-6" />,
      bgColor: "#dcfce7"
    },
    {
      title: "SPI (Plazo)",
      value: "0.92",
      subtitle: "< 1.0 = atrasos",
      trend: "down",
      color: "#f59e0b",
      icon: <MdSchedule className="w-6 h-6" />,
      bgColor: "#fef3c7"
    },
    {
      title: "Días de Retraso",
      value: "-12",
      subtitle: "12 días atrasado",
      trend: "down",
      color: "#ef4444",
      icon: <MdWarning className="w-6 h-6" />,
      bgColor: "#fee2e2"
    },
    {
      title: "Mano de Obra",
      value: "156",
      subtitle: "de 150 planificados",
      trend: "up",
      color: "#16a34a",
      icon: <MdPerson className="w-6 h-6" />,
      bgColor: "#dcfce7"
    }
  ];

  const projects = [
    {
      name: "DS-49 Santa Marta",
      progress: 75,
      budget: "$45.2M",
      status: "En curso",
      statusColor: "#E30613",
      daysLeft: 45
    },
    {
      name: "Conjunto Las Palmas",
      progress: 95,
      budget: "$32.8M",
      status: "Finalizando",
      statusColor: "#16a34a",
      daysLeft: 12
    },
    {
      name: "Torre Central",
      progress: 42,
      budget: "$89.5M",
      status: "En curso",
      statusColor: "#E30613",
      daysLeft: 180
    },
    {
      name: "Residencial Norte",
      progress: 28,
      budget: "$28.3M",
      status: "Inicio",
      statusColor: "#3b82f6",
      daysLeft: 320
    }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-red mb-2">
          Dashboard de Proyectos
        </h1>
        <p className="text-sm text-muted">
          Monitoreo en tiempo real del desarrollo de proyectos de construcción
        </p>
      </div>

      {/* KPIs Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold ink mb-6">Indicadores Clave (KPIs)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="rounded-lg border p-5 bg-white border-[var(--color-brand-line)]"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold ink">{kpi.title}</p>
                <div 
                  className="w-10 h-10 rounded flex items-center justify-center"
                  style={{ background: kpi.bgColor, color: kpi.color }}
                >
                  {kpi.icon}
                </div>
              </div>
              <p className="text-3xl font-extrabold mb-1" style={{ color: kpi.color }}>
                {kpi.value}
              </p>
              <p className="text-xs muted">{kpi.subtitle}</p>
              {kpi.trend === "down" && (
                <div className="mt-3 flex items-center gap-1">
                  <MdTrendingDown className="w-4 h-4" style={{ color: "#ef4444" }} />
                  <span className="text-xs" style={{ color: "#ef4444" }}>Requiere atención</span>
                </div>
              )}
              {kpi.trend === "up" && (
                <div className="mt-3 flex items-center gap-1">
                  <MdTrendingUp className="w-4 h-4" style={{ color: "#16a34a" }} />
                  <span className="text-xs" style={{ color: "#16a34a" }}>En rango objetivo</span>
                </div>
              )}
              {kpi.trend === "on-track" && (
                <div className="mt-3 flex items-center gap-1">
                  <MdCheckCircle className="w-4 h-4" style={{ color: "#16a34a" }} />
                  <span className="text-xs" style={{ color: "#16a34a" }}>Según plan</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Projects Table */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold ink">Proyectos Activos</h2>
          <Link href="/analisis">
            <button className="btn btn-outline text-sm">Ver Análisis Completo</button>
          </Link>
        </div>
        
        <div className="bg-white border rounded-lg overflow-hidden" style={{ borderColor: "var(--color-brand-line)" }}>
          <table className="w-full">
            <thead>
              <tr className="bg-[#fafafa] border-b" style={{ borderColor: "var(--color-brand-line)" }}>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Proyecto</th>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Avance</th>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Presupuesto</th>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Estado</th>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Días Restantes</th>
                <th className="text-center px-4 py-3 text-sm font-semibold ink">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-[#fcfcfc] transition-colors"
                  style={{ borderColor: "var(--color-brand-line)" }}
                >
                  <td className="px-4 py-3">
                    <p className="text-sm ink font-medium">{project.name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${project.progress}%`,
                            background: project.progress >= 75 ? "#16a34a" : project.progress >= 50 ? "#f59e0b" : "#3b82f6"
                          }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold muted">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm ink font-medium">{project.budget}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="chip"
                      style={{
                        background: project.status === "En curso" ? "#fee2e2" : 
                                  project.status === "Finalizando" ? "#dcfce7" : "#dbeafe",
                        color: project.statusColor,
                        border: `1px solid ${project.statusColor}40`
                      }}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm muted">{project.daysLeft} días</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 rounded hover:bg-[#f1f5f9]" title="Ver Detalles">
                        <svg className="w-5 h-5" style={{ color: "#3b82f6" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </button>
                      <button className="p-2 rounded hover:bg-[#fff1f2]" title="Editar">
                        <svg className="w-5 h-5" style={{ color: "var(--color-brand-red)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <h2 className="text-2xl font-bold ink mb-6">Resumen Ejecutivo</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-lg border p-4 bg-white border-[var(--color-brand-line)] text-center">
            <MdBuild className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--color-brand-red)" }} />
            <p className="text-2xl font-extrabold ink">4</p>
            <p className="text-xs muted">Proyectos Activos</p>
          </div>
          <div className="rounded-lg border p-4 bg-white border-[var(--color-brand-line)] text-center">
            <MdDoneAll className="w-8 h-8 mx-auto mb-2" style={{ color: "#16a34a" }} />
            <p className="text-2xl font-extrabold ink">156</p>
            <p className="text-xs muted">Entregables Completados</p>
          </div>
          <div className="rounded-lg border p-4 bg-white border-[var(--color-brand-line)] text-center">
            <MdCheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: "#3b82f6" }} />
            <p className="text-2xl font-extrabold ink">92%</p>
            <p className="text-xs muted">Certificaciones Pagadas</p>
          </div>
          <div className="rounded-lg border p-4 bg-white border-[var(--color-brand-line)] text-center">
            <MdSchedule className="w-8 h-8 mx-auto mb-2" style={{ color: "#f59e0b" }} />
            <p className="text-2xl font-extrabold ink">8</p>
            <p className="text-xs muted">En Revisión</p>
          </div>
        </div>
      </section>
    </div>
  );
}

