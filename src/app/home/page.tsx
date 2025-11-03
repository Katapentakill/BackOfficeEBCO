"use client";

import { useState } from "react";
import { 
  MdBook, 
  MdInfoOutline, 
  MdTrendingUp, 
  MdTrendingDown, 
  MdCheckCircle, 
  MdSchedule,
  MdPerson,
  MdAttachMoney,
  MdAssessment,
  MdWarning,
  MdBuild,
  MdDoneAll
} from "react-icons/md";
import InfoCard from "@/components/ui/InfoCard";
import Link from "next/link";

export default function Home() {
  const [selectedObra, setSelectedObra] = useState(0);
  // KPIs por Obra/Proyecto
  const obras = [
    {
      name: "DS-49 Santa Marta",
      kpis: [
        {
          title: "Avance Físico",
          value: "75%",
          subtitle: "vs 78% planificado",
          trend: "down",
          color: "#f59e0b",
          icon: <MdTrendingUp className="w-6 h-6" />,
          bgColor: "#fef3c7"
        },
        {
          title: "Presupuesto Ejecutado",
          value: "$34.8M",
          subtitle: "de $45.2M total",
          trend: "on-track",
          color: "#16a34a",
          icon: <MdAttachMoney className="w-6 h-6" />,
          bgColor: "#dcfce7"
        },
        {
          title: "CPI (Costo)",
          value: "1.08",
          subtitle: "> 1.0 = bajo presupuesto",
          trend: "up",
          color: "#16a34a",
          icon: <MdAssessment className="w-6 h-6" />,
          bgColor: "#dcfce7"
        },
        {
          title: "SPI (Plazo)",
          value: "0.96",
          subtitle: "< 1.0 = atrasos",
          trend: "down",
          color: "#f59e0b",
          icon: <MdSchedule className="w-6 h-6" />,
          bgColor: "#fef3c7"
        },
        {
          title: "Días de Retraso",
          value: "-8",
          subtitle: "8 días atrasado",
          trend: "down",
          color: "#ef4444",
          icon: <MdWarning className="w-6 h-6" />,
          bgColor: "#fee2e2"
        },
        {
          title: "Mano de Obra",
          value: "42",
          subtitle: "de 40 planificados",
          trend: "up",
          color: "#16a34a",
          icon: <MdPerson className="w-6 h-6" />,
          bgColor: "#dcfce7"
        }
      ]
    },
    {
      name: "Conjunto Las Palmas",
      kpis: [
        {
          title: "Avance Físico",
          value: "95%",
          subtitle: "vs 95% planificado",
          trend: "on-track",
          color: "#16a34a",
          icon: <MdTrendingUp className="w-6 h-6" />,
          bgColor: "#dcfce7"
        },
        {
          title: "Presupuesto Ejecutado",
          value: "$31.1M",
          subtitle: "de $32.8M total",
          trend: "on-track",
          color: "#16a34a",
          icon: <MdAttachMoney className="w-6 h-6" />,
          bgColor: "#dcfce7"
        },
        {
          title: "CPI (Costo)",
          value: "1.02",
          subtitle: "> 1.0 = bajo presupuesto",
          trend: "up",
          color: "#16a34a",
          icon: <MdAssessment className="w-6 h-6" />,
          bgColor: "#dcfce7"
        },
        {
          title: "SPI (Plazo)",
          value: "1.00",
          subtitle: "En tiempo",
          trend: "on-track",
          color: "#16a34a",
          icon: <MdSchedule className="w-6 h-6" />,
          bgColor: "#dcfce7"
        },
        {
          title: "Días de Retraso",
          value: "0",
          subtitle: "A tiempo",
          trend: "on-track",
          color: "#16a34a",
          icon: <MdCheckCircle className="w-6 h-6" />,
          bgColor: "#dcfce7"
        },
        {
          title: "Mano de Obra",
          value: "38",
          subtitle: "de 35 planificados",
          trend: "up",
          color: "#16a34a",
          icon: <MdPerson className="w-6 h-6" />,
          bgColor: "#dcfce7"
        }
      ]
    },
    {
      name: "Torre Central",
      kpis: [
        {
          title: "Avance Físico",
          value: "42%",
          subtitle: "vs 45% planificado",
          trend: "down",
          color: "#f59e0b",
          icon: <MdTrendingUp className="w-6 h-6" />,
          bgColor: "#fef3c7"
        },
        {
          title: "Presupuesto Ejecutado",
          value: "$37.6M",
          subtitle: "de $89.5M total",
          trend: "on-track",
          color: "#16a34a",
          icon: <MdAttachMoney className="w-6 h-6" />,
          bgColor: "#dcfce7"
        },
        {
          title: "CPI (Costo)",
          value: "0.98",
          subtitle: "< 1.0 = sobre presupuesto",
          trend: "down",
          color: "#ef4444",
          icon: <MdAssessment className="w-6 h-6" />,
          bgColor: "#fee2e2"
        },
        {
          title: "SPI (Plazo)",
          value: "0.93",
          subtitle: "< 1.0 = atrasos",
          trend: "down",
          color: "#f59e0b",
          icon: <MdSchedule className="w-6 h-6" />,
          bgColor: "#fef3c7"
        },
        {
          title: "Días de Retraso",
          value: "-15",
          subtitle: "15 días atrasado",
          trend: "down",
          color: "#ef4444",
          icon: <MdWarning className="w-6 h-6" />,
          bgColor: "#fee2e2"
        },
        {
          title: "Mano de Obra",
          value: "48",
          subtitle: "de 50 planificados",
          trend: "down",
          color: "#f59e0b",
          icon: <MdPerson className="w-6 h-6" />,
          bgColor: "#fef3c7"
        }
      ]
    },
    {
      name: "Residencial Norte",
      kpis: [
        {
          title: "Avance Físico",
          value: "28%",
          subtitle: "vs 30% planificado",
          trend: "down",
          color: "#f59e0b",
          icon: <MdTrendingUp className="w-6 h-6" />,
          bgColor: "#fef3c7"
        },
        {
          title: "Presupuesto Ejecutado",
          value: "$7.9M",
          subtitle: "de $28.3M total",
          trend: "on-track",
          color: "#16a34a",
          icon: <MdAttachMoney className="w-6 h-6" />,
          bgColor: "#dcfce7"
        },
        {
          title: "CPI (Costo)",
          value: "1.10",
          subtitle: "> 1.0 = bajo presupuesto",
          trend: "up",
          color: "#16a34a",
          icon: <MdAssessment className="w-6 h-6" />,
          bgColor: "#dcfce7"
        },
        {
          title: "SPI (Plazo)",
          value: "0.93",
          subtitle: "< 1.0 = atrasos",
          trend: "down",
          color: "#f59e0b",
          icon: <MdSchedule className="w-6 h-6" />,
          bgColor: "#fef3c7"
        },
        {
          title: "Días de Retraso",
          value: "-6",
          subtitle: "6 días atrasado",
          trend: "down",
          color: "#ef4444",
          icon: <MdWarning className="w-6 h-6" />,
          bgColor: "#fee2e2"
        },
        {
          title: "Mano de Obra",
          value: "28",
          subtitle: "de 25 planificados",
          trend: "up",
          color: "#16a34a",
          icon: <MdPerson className="w-6 h-6" />,
          bgColor: "#dcfce7"
        }
      ]
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

  // Calcular estadísticas resumidas
  const totalProjects = projects.length;
  const totalBudget = projects.reduce((sum, p) => sum + parseFloat(p.budget.replace('$', '').replace('M', '')), 0);
  const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);

  return (
    <div className="min-h-screen p-8">
      {/* Hero Section con gradiente y diseño mejorado */}
      <section className="relative mb-12 overflow-hidden rounded-2xl" style={{
        background: "linear-gradient(135deg, #E30613 0%, #B00912 100%)"
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative p-12 md:p-16">
          <div className="max-w-4xl">
            <div className="inline-block mb-4">
              <span className="text-white/90 text-sm font-semibold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                🏗️ Sistema de Gestión de Obras
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Back Office
            </h1>
            <p className="text-xl text-white/95 mb-6 font-medium max-w-2xl">
              Monitoreo en tiempo real del desarrollo de proyectos de construcción
            </p>
            <p className="text-base text-white/80 leading-relaxed max-w-3xl mb-8">
              Bienvenido al Manual Operacional del Back Office, una herramienta diseñada para acompañar
              y facilitar el trabajo diario en nuestras obras.
            </p>
            
            {/* Estadísticas rápidas en hero */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-white/70 text-xs font-medium mb-1">Proyectos Activos</p>
                <p className="text-3xl font-bold text-white">{totalProjects}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-white/70 text-xs font-medium mb-1">Presupuesto Total</p>
                <p className="text-3xl font-bold text-white">${totalBudget.toFixed(1)}M</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-white/70 text-xs font-medium mb-1">Avance Promedio</p>
                <p className="text-3xl font-bold text-white">{avgProgress}%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions mejorado */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold ink mb-1">Acceso Rápido</h2>
            <p className="text-sm muted">Navega rápidamente a las secciones principales</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link href="/manual" className="group">
            <div className="bg-white border-2 rounded-xl p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1 hover:border-brand-red cursor-pointer" style={{ borderColor: "var(--color-brand-red)" }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all group-hover:scale-110" style={{ background: "linear-gradient(135deg, #E30613 0%, #B00912 100%)" }}>
                <MdBook className="w-8 h-8 text-white" />
              </div>
              <p className="font-bold ink text-sm">Manual Operacional</p>
            </div>
          </Link>
          <Link href="/logistica" className="group">
            <div className="bg-white border rounded-xl p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1 hover:border-brand-red cursor-pointer" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all group-hover:scale-110 bg-blue-50">
                <MdSchedule className="w-8 h-8" style={{ color: "#3b82f6" }} />
              </div>
              <p className="font-bold ink text-sm">Área Logística</p>
            </div>
          </Link>
          <Link href="/productos" className="group">
            <div className="bg-white border rounded-xl p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1 hover:border-brand-red cursor-pointer" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all group-hover:scale-110 bg-green-50">
                <MdBuild className="w-8 h-8" style={{ color: "#16a34a" }} />
              </div>
              <p className="font-bold ink text-sm">Productos y Soportes</p>
            </div>
          </Link>
          <Link href="/analisis" className="group">
            <div className="bg-white border rounded-xl p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1 hover:border-brand-red cursor-pointer" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all group-hover:scale-110 bg-purple-50">
                <MdAssessment className="w-8 h-8" style={{ color: "#9333ea" }} />
              </div>
              <p className="font-bold ink text-sm">Análisis de Datos</p>
            </div>
          </Link>
          <Link href="/organigrama" className="group">
            <div className="bg-white border rounded-xl p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1 hover:border-brand-red cursor-pointer" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all group-hover:scale-110 bg-orange-50">
                <MdInfoOutline className="w-8 h-8" style={{ color: "#f59e0b" }} />
              </div>
              <p className="font-bold ink text-sm">Organigrama</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Organizational Structure Section */}
      <section className="mb-12 bg-brand-dark text-brand-text-light rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              ESTRUCTURA ORGANIZACIONAL<br />BACK OFFICE
            </h2>
            <p className="text-sm leading-relaxed mb-6 italic">
              "Somos el motor silencioso que organiza, conecta y potencia, para que cada proyecto
              avance con eficiencia, calidad y visión de futuro."
            </p>
            <Link href="/organigrama">
              <button className="btn btn-primary">
                VER ORGANIGRAMA COMPLETO
              </button>
            </Link>
          </div>

          {/* Right Column - Organizational Chart with Lines */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md relative">
              {/* Coordinator */}
              <div className="mb-6 text-center relative z-10">
                <div className="bg-brand-red px-4 py-2 rounded-lg inline-block font-bold">
                  COORDINADOR
                </div>
              </div>

              {/* Connecting Lines */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-32" style={{background:"var(--color-brand-red)",opacity:0.3}}></div>

              {/* Areas */}
              <div className="grid grid-cols-1 gap-3 text-center relative z-10 mt-2">
                <div className="bg-brand-bg-light px-4 py-3 rounded-lg border" style={{borderColor:"var(--color-brand-red)",borderWidth:"2px"}}>
                  <p className="font-bold text-brand-red">LOGÍSTICA</p>
                  <p className="text-xs mt-1 text-brand-text-dark">Materiales • Arriendos</p>
                </div>
                <div className="bg-brand-bg-light px-4 py-3 rounded-lg border" style={{borderColor:"var(--color-brand-red)",borderWidth:"2px"}}>
                  <p className="font-bold text-brand-red">PRODUCTOS Y SERVICIOS</p>
                  <p className="text-xs mt-1 text-brand-text-dark">Subcontratos • Materiales EE.TT</p>
                </div>
                <div className="bg-brand-bg-light px-4 py-3 rounded-lg border" style={{borderColor:"var(--color-brand-red)",borderWidth:"2px"}}>
                  <p className="font-bold text-brand-red">ANÁLISIS DE DATOS</p>
                  <p className="text-xs mt-1 text-brand-text-dark">Costos • Programa y Avance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPIs por Obra Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold ink mb-6">Indicadores Clave por Obra (KPIs)</h2>
        
        {/* Barra horizontal de selección de obras */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 border-b pb-2" style={{ borderColor: "var(--color-brand-line)" }}>
            {obras.map((obra, index) => (
              <button
                key={index}
                onClick={() => setSelectedObra(index)}
                className={`px-6 py-3 rounded-t-lg font-semibold text-sm transition-all whitespace-nowrap ${
                  selectedObra === index
                    ? "bg-brand text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border-b-2 border-transparent"
                }`}
                style={{
                  borderBottomColor: selectedObra === index ? "var(--color-brand-red)" : "transparent",
                  borderBottomWidth: selectedObra === index ? "3px" : "0px"
                }}
              >
                {obra.name}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs de la obra seleccionada */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {obras[selectedObra].kpis.map((kpi, kpiIndex) => (
              <div
                key={kpiIndex}
                className="relative rounded-xl border p-6 bg-white border-[var(--color-brand-line)] transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden group"
              >
                {/* Gradiente sutil en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity" style={{
                  background: `linear-gradient(135deg, ${kpi.color} 0%, transparent 100%)`
                }}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold ink">{kpi.title}</p>
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110"
                      style={{ background: kpi.bgColor, color: kpi.color }}
                    >
                      {kpi.icon}
                    </div>
                  </div>
                  <p className="text-4xl font-extrabold mb-2 transition-all group-hover:scale-105" style={{ color: kpi.color }}>
                    {kpi.value}
                  </p>
                  <p className="text-xs muted mb-4">{kpi.subtitle}</p>
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
              </div>
            ))}
          </div>
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
      <section className="mb-12">
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

      {/* Sub-areas Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-brand-red mb-6">Subáreas Principales</h2>
        <p className="text-sm text-brand-text-dark mb-8 text-muted">
          Conoce las diferentes áreas que conforman nuestro Back Office y sus responsabilidades específicas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<MdBook size={40} />}
            title="Manual Operacional"
            description="Acceso a la documentación completa y guías de operación del Back Office."
            buttonText="Ir a Manual"
            buttonLink="/manual"
            badge="12 secciones"
          />
          <InfoCard
            icon={<MdInfoOutline size={40} />}
            title="Organigrama"
            description="Visualiza la estructura organizacional y jerarquía del equipo."
            buttonText="Ver Organigrama"
            buttonLink="/organigrama"
            badge="3 áreas principales"
          />
          <InfoCard
            icon={<MdBook size={40} />}
            title="Contacto"
            description="Información de contacto de nuestras oficinas a nivel nacional."
            buttonText="Ver Oficinas"
            buttonLink="#"
            badge="6 oficinas"
          />
        </div>
      </section>

    </div>
  );
}


