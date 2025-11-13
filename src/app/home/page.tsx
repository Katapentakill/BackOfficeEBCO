"use client";

import { useState, useEffect, useRef } from "react";
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
  MdDoneAll,
  MdAdd,
  MdEdit,
  MdClose,
  MdDelete,
  MdSettings,
  MdLogout
} from "react-icons/md";
import InfoCard from "@/components/ui/InfoCard";
import Link from "next/link";

export default function Home() {
  const [selectedObra, setSelectedObra] = useState(0);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showKPIModal, setShowKPIModal] = useState(false);
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [editingKPI, setEditingKPI] = useState<{ obraIndex: number; kpiIndex: number } | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const currentUser = {
    name: "Nombre Apellido",
    role: "Admin"
  };
  const userInitials = currentUser.name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
   
  // Estados para formularios
  const [projectForm, setProjectForm] = useState({
    name: "",
    progress: 0,
    budget: "",
    status: "En curso",
    daysLeft: 0
  });
  
  const [kpiForm, setKpiForm] = useState({
    obraIndex: 0,
    title: "",
    value: "",
    subtitle: "",
    trend: "on-track" as "up" | "down" | "on-track"
  });
  
  // KPIs por Obra/Proyecto
  const [obras, setObras] = useState([
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
  ]);

  const [projects, setProjects] = useState([
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
  ]);

  // Funciones para manejar proyectos
  const handleSaveProject = () => {
    if (!projectForm.name || !projectForm.budget) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }
    
    const statusColors: { [key: string]: string } = {
      "En curso": "#E30613",
      "Finalizando": "#16a34a",
      "Inicio": "#3b82f6"
    };
    
    const newProject = {
      name: projectForm.name,
      progress: projectForm.progress,
      budget: projectForm.budget,
      status: projectForm.status,
      statusColor: statusColors[projectForm.status] || "#E30613",
      daysLeft: projectForm.daysLeft
    };
    
    if (editingProject !== null) {
      // Estamos editando un proyecto existente
      const oldProjectName = projects[editingProject].name;
      
      setProjects(prev => prev.map((p, i) => i === editingProject ? newProject : p));
      
      // Actualizar también en obras si existe, manteniendo los KPIs existentes
      setObras(prev => prev.map(obra => 
        obra.name === oldProjectName 
          ? { ...obra, name: newProject.name } // Solo actualizamos el nombre, mantenemos los KPIs
          : obra
      ));
    } else {
      // Estamos creando un nuevo proyecto
      setProjects(prev => [...prev, newProject]);
      
      // Crear automáticamente una entrada en obras para el nuevo proyecto con KPIs vacíos
      setObras(prev => {
        // Verificar si ya existe una obra con ese nombre (no debería, pero por seguridad)
        const exists = prev.some(obra => obra.name === newProject.name);
        if (exists) {
          return prev;
        }
        const newObras = [...prev, {
          name: newProject.name,
          kpis: []
        }];
        // Seleccionar automáticamente el nuevo proyecto en la barra de obras
        const newIndex = newObras.length - 1;
        setSelectedObra(newIndex);
        return newObras;
      });
    }
    
    setProjectForm({ name: "", progress: 0, budget: "", status: "En curso", daysLeft: 0 });
    setShowProjectModal(false);
    setEditingProject(null);
  };
  
  // Funciones para manejar KPIs
  const handleSaveKPI = () => {
    if (!kpiForm.title || !kpiForm.value) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }
    
    const trendColors: { [key: string]: { color: string; bgColor: string } } = {
      "up": { color: "#16a34a", bgColor: "#dcfce7" },
      "down": { color: "#ef4444", bgColor: "#fee2e2" },
      "on-track": { color: "#16a34a", bgColor: "#dcfce7" }
    };
    
    const iconMap: { [key: string]: React.ReactNode } = {
      "Avance Físico": <MdTrendingUp className="w-6 h-6" />,
      "Presupuesto Ejecutado": <MdAttachMoney className="w-6 h-6" />,
      "CPI (Costo)": <MdAssessment className="w-6 h-6" />,
      "SPI (Plazo)": <MdSchedule className="w-6 h-6" />,
      "Días de Retraso": <MdWarning className="w-6 h-6" />,
      "Mano de Obra": <MdPerson className="w-6 h-6" />
    };
    
    const colors = trendColors[kpiForm.trend] || trendColors["on-track"];
    
    const newKPI = {
      title: kpiForm.title,
      value: kpiForm.value,
      subtitle: kpiForm.subtitle,
      trend: kpiForm.trend,
      color: colors.color,
      icon: (iconMap[kpiForm.title] || <MdCheckCircle className="w-6 h-6" />) as React.ReactElement,
      bgColor: colors.bgColor
    };
    
    if (editingKPI !== null) {
      setObras(prev => prev.map((obra, oIndex) => 
        oIndex === editingKPI.obraIndex 
          ? {
              ...obra,
              kpis: obra.kpis.map((kpi, kIndex) => 
                kIndex === editingKPI.kpiIndex ? newKPI : kpi
              )
            }
          : obra
      ));
    } else {
      setObras(prev => prev.map((obra, index) => 
        index === kpiForm.obraIndex 
          ? { ...obra, kpis: [...obra.kpis, newKPI] }
          : obra
      ));
    }
    
    setKpiForm({ obraIndex: 0, title: "", value: "", subtitle: "", trend: "on-track" });
    setShowKPIModal(false);
    setEditingKPI(null);
  };
  
  // Calcular estadísticas resumidas
  const totalProjects = projects.length;
  const totalBudget = projects.reduce((sum, p) => sum + parseFloat(p.budget.replace('$', '').replace('M', '')), 0);
  const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-end mb-6">
        <div ref={userMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white border shadow-sm hover:shadow-md transition-shadow"
            style={{ borderColor: "var(--color-brand-line)" }}
          >
            <div
              className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm font-semibold"
              style={{ background: "var(--color-brand-red)" }}
            >
              {userInitials || "NA"}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-brand-text-dark">{currentUser.name}</span>
              <span className="text-xs text-gray-500">{currentUser.role}</span>
            </div>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white border rounded-lg shadow-xl py-2 z-50" style={{ borderColor: "var(--color-brand-line)" }}>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-brand-text-dark hover:bg-gray-50 transition-colors"
                onClick={() => {
                  // Placeholder action
                  setIsUserMenuOpen(false);
                }}
              >
                <MdPerson className="w-5 h-5 text-gray-500" />
                Mi Perfil
              </button>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-brand-text-dark hover:bg-gray-50 transition-colors"
                onClick={() => {
                  // Placeholder action
                  setIsUserMenuOpen(false);
                }}
              >
                <MdSettings className="w-5 h-5 text-gray-500" />
                Configuración
              </button>
              <div className="my-2 border-t" style={{ borderColor: "var(--color-brand-line)" }}></div>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => {
                  // Placeholder action
                  setIsUserMenuOpen(false);
                }}
              >
                <MdLogout className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>

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
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/Logo.png"
                alt="EBCO Logo"
                className="w-16 h-16 md:w-20 md:h-20 object-contain flex-shrink-0"
                style={{ imageRendering: "auto" as any }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Back Office
              </h1>
            </div>
            <p className="text-xl text-white/95 mb-6 font-medium max-w-2xl">
              Monitoreo en tiempo real del desarrollo de proyectos de construcción
            </p>
            <p className="text-base text-white/80 leading-relaxed max-w-3xl mb-8">
              Bienvenido al Manual de Soporte del Back Office, una herramienta diseñada para acompañar
              y facilitar el trabajo diario en nuestras obras.
            </p>
            
            {/* Estadísticas rápidas en hero */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-white/70 text-xs font-medium mb-1">Proyectos Activos</p>
                <p className="text-3xl font-bold text-white">{totalProjects}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-white/70 text-xs font-medium mb-1">Venta Total</p>
                <p className="text-3xl font-bold text-white">${totalBudget.toFixed(1)}M</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-white/70 text-xs font-medium mb-1">Metros Cuadrados Construidos</p>
                <p className="text-3xl font-bold text-white">45,230 m²</p>
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
              <p className="font-bold ink text-sm">Manual de Soporte</p>
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
      <section className="mb-16 bg-white border-2 rounded-lg p-12 md:p-16 shadow-lg" style={{ borderColor: "var(--color-brand-red)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-red mb-6 leading-tight">
                ESTRUCTURA<br />ORGANIZACIONAL
              </h2>
              <div className="h-1 w-20 bg-brand-red mb-6"></div>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-brand-text-dark italic font-bold">
              "Somos el motor silencioso que organiza, conecta y potencia, para que cada proyecto
              avance con eficiencia, calidad y visión de futuro."
            </p>
            <div className="pt-4 flex justify-center md:justify-start">
              <Link href="/organigrama">
                <button className="btn btn-primary px-8 py-3 text-base">
                  Ver más
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column - Organizational Chart Image */}
          <div className="flex items-center justify-center p-8">
            <img
              src="/organigrama-backoffice.png"
              alt="Organigrama Back Office EBCO"
              className="w-full max-w-lg h-auto object-contain drop-shadow-lg"
               style={{ imageRendering: "auto" as any }}
            />
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
            title="Manual de Soporte"
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

      {/* Modal para Agregar/Editar Proyecto */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <h3 className="text-xl font-bold ink">
                {editingProject !== null ? "Editar Proyecto" : "Agregar Nuevo Proyecto"}
              </h3>
              <button
                onClick={() => {
                  setShowProjectModal(false);
                  setEditingProject(null);
                  setProjectForm({ name: "", progress: 0, budget: "", status: "En curso", daysLeft: 0 });
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold ink mb-2">Nombre del Proyecto <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  placeholder="Ej: DS-49 Santa Marta"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold ink mb-2">Avance (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={projectForm.progress}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold ink mb-2">Días Restantes</label>
                  <input
                    type="number"
                    min="0"
                    value={projectForm.daysLeft}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, daysLeft: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold ink mb-2">Presupuesto <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={projectForm.budget}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  placeholder="Ej: $45.2M"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold ink mb-2">Estado</label>
                <select
                  value={projectForm.status}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                >
                  <option value="En curso">En curso</option>
                  <option value="Finalizando">Finalizando</option>
                  <option value="Inicio">Inicio</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowProjectModal(false);
                    setEditingProject(null);
                    setProjectForm({ name: "", progress: 0, budget: "", status: "En curso", daysLeft: 0 });
                  }}
                  className="btn btn-outline flex-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveProject}
                  className="btn btn-primary flex-1"
                >
                  {editingProject !== null ? "Guardar Cambios" : "Agregar Proyecto"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Agregar/Editar KPI */}
      {showKPIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <h3 className="text-xl font-bold ink">
                {editingKPI !== null ? "Editar KPI" : "Agregar Nuevo KPI"}
              </h3>
              <button
                onClick={() => {
                  setShowKPIModal(false);
                  setEditingKPI(null);
                  setKpiForm({ obraIndex: 0, title: "", value: "", subtitle: "", trend: "on-track" });
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold ink mb-2">Proyecto/Obra</label>
                <select
                  value={kpiForm.obraIndex}
                  onChange={(e) => setKpiForm(prev => ({ ...prev, obraIndex: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  disabled={editingKPI !== null}
                >
                  {obras.map((obra, index) => (
                    <option key={index} value={index}>{obra.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold ink mb-2">Título del KPI <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={kpiForm.title}
                  onChange={(e) => setKpiForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  placeholder="Ej: Avance Físico, Presupuesto Ejecutado, etc."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold ink mb-2">Valor <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={kpiForm.value}
                    onChange={(e) => setKpiForm(prev => ({ ...prev, value: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                    placeholder="Ej: 75%, $34.8M, 1.08"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold ink mb-2">Tendencia</label>
                  <select
                    value={kpiForm.trend}
                    onChange={(e) => setKpiForm(prev => ({ ...prev, trend: e.target.value as "up" | "down" | "on-track" }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                  >
                    <option value="up">Ascendente</option>
                    <option value="down">Descendente</option>
                    <option value="on-track">Según plan</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold ink mb-2">Subtítulo</label>
                <input
                  type="text"
                  value={kpiForm.subtitle}
                  onChange={(e) => setKpiForm(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  placeholder="Ej: vs 78% planificado, de $45.2M total"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowKPIModal(false);
                    setEditingKPI(null);
                    setKpiForm({ obraIndex: 0, title: "", value: "", subtitle: "", trend: "on-track" });
                  }}
                  className="btn btn-outline flex-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveKPI}
                  className="btn btn-primary flex-1"
                >
                  {editingKPI !== null ? "Guardar Cambios" : "Agregar KPI"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


