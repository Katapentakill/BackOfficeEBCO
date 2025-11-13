"use client";

import { useState } from "react";
import { 
  MdExpandMore, 
  MdPerson, 
  MdLocalShipping, 
  MdShoppingCart, 
  MdAnalytics,
  MdTrendingUp,
  MdCheckCircle,
  MdSchedule,
  MdDescription,
  MdBuild,
  MdAttachMoney,
  MdAssessment,
  MdAdd,
  MdClose,
  MdDelete
} from "react-icons/md";
import InfoCard from "@/components/ui/InfoCard";
import Link from "next/link";
import TarjetaContacto from "@/components/ui/TarjetaContacto";

interface AreaDetails {
  name: string;
  icon: React.ReactNode;
  description: string;
  subAreas: {
    name: string;
    functions: string[];
  }[];
  keyFunctions: string[];
  deliverables: {
    name: string;
    period: string;
  }[];
  kpis?: {
    label: string;
    value: string;
    status: "good" | "warning" | "critical";
  }[];
}

const areasData: AreaDetails[] = [
  {
    name: "LOGÍSTICA",
    icon: <MdLocalShipping size={40} />,
    description: "Gestión de materiales, arriendos de equipos y servicios externos para garantizar el abastecimiento oportuno y eficiente en obra.",
    subAreas: [
      {
        name: "Materiales",
        functions: [
          "Planificación y control de abastecimiento de materiales generales",
          "Control de inventarios y gestión de bodegas",
          "Coordinación de despachos a obra",
          "Control de pérdidas y desperdicios"
        ]
      },
      {
        name: "Servicios de Arriendo",
        functions: [
          "Gestión de contratos de arriendo de equipos",
          "Control de tiempos y costos de arriendos",
          "Coordinación de servicios externos",
          "Seguimiento de contratos y documentos"
        ]
      }
    ],
    keyFunctions: [
      "Asegurar disponibilidad oportuna de materiales",
      "Minimizar pérdidas y costos de arriendo",
      "Mantener trazabilidad de inventarios",
      "Coordinar logística entre proveedores y obra"
    ],
    deliverables: [
      { name: "Coordinación de despachos", period: "Diario" },
      { name: "Control Hormigones", period: "Diario" },
      { name: "Control de arriendos", period: "Semanal" },
      { name: "Reporte Mensual Logística", period: "Mensual" }
    ],
    kpis: [
      { label: "Entregables Completados", value: "85%", status: "good" },
      { label: "Pendientes", value: "3", status: "warning" },
      { label: "Urgentes", value: "1", status: "critical" },
      { label: "Eficiencia Despachos", value: "92%", status: "good" }
    ]
  },
  {
    name: "PRODUCTOS Y SERVICIOS",
    icon: <MdShoppingCart size={40} />,
    description: "Administración de subcontratos y especificaciones técnicas de materiales para proyectos BETT, asegurando cumplimiento de plazos y especificaciones.",
    subAreas: [
      {
        name: "Subcontratos",
        functions: [
          "Gestión integral de subcontratos para proyectos BETT",
          "Elaboración y seguimiento de contratos",
          "Cubicaciones y control de avances",
          "Coordinación de planillas y pagos"
        ]
      },
      {
        name: "Materiales Especificaciones Técnicas",
        functions: [
          "Gestión de materiales con especificaciones técnicas",
          "Control de solicitudes de pedido EE.TT",
          "Cuadros comparativos y análisis técnico",
          "Coordinación de despachos especializados"
        ]
      }
    ],
    keyFunctions: [
      "Asegurar cumplimiento de especificaciones técnicas",
      "Gestionar contratos y cubicaciones",
      "Coordinar entregas de materiales especializados",
      "Controlar costos y plazos de subcontratos"
    ],
    deliverables: [
      { name: "Coordinación de despacho EE.TT", period: "Diario" },
      { name: "Cubicaciones SC", period: "Quincenal" },
      { name: "Contratos SC", period: "Quincenal" },
      { name: "Cuadros Comparativos EE.TT", period: "Semanal" }
    ],
    kpis: [
      { label: "Entregables Completados", value: "78%", status: "warning" },
      { label: "Pendientes", value: "2", status: "warning" },
      { label: "Urgentes", value: "2", status: "critical" },
      { label: "Cumplimiento Contratos", value: "88%", status: "good" }
    ]
  },
  {
    name: "ANÁLISIS DE DATOS",
    icon: <MdAnalytics size={40} />,
    description: "Control financiero, programación de trabajos y análisis de desempeño operacional para mantener equilibrio económico y detectar desviaciones.",
    subAreas: [
      {
        name: "Control de Costos",
        functions: [
          "Monitoreo del desempeño financiero del proyecto",
          "Control de gastos y análisis de mano de obra indirecta",
          "Revisión de EEPP al mandante",
          "Seguimiento de seguros y garantías"
        ]
      },
      {
        name: "Programa y Avance",
        functions: [
          "Supervisión de planificación y avance físico (ISP)",
          "Análisis de curvas de avance por actividad",
          "Detección de desviaciones y seguimiento de hitos",
          "Reportes de rendimiento y productividad"
        ]
      }
    ],
    keyFunctions: [
      "Mantener equilibrio económico del proyecto",
      "Detectar desviaciones en tiempo y costo",
      "Proporcionar información para toma de decisiones",
      "Asegurar trazabilidad financiera"
    ],
    deliverables: [
      { name: "Programa General (ISP)", period: "Semanal" },
      { name: "ABO y REC", period: "Mensual" },
      { name: "EEPP Mandante", period: "Mensual" },
      { name: "Análisis Mano de Obra", period: "Mensual" }
    ],
    kpis: [
      { label: "Entregables Completados", value: "90%", status: "good" },
      { label: "Pendientes", value: "1", status: "good" },
      { label: "Urgentes", value: "1", status: "warning" },
      { label: "Precisión Análisis", value: "95%", status: "good" }
    ]
  }
];

// Interface para miembros del equipo
interface PersonaEquipo {
  id: string;
  nombre: string;
  cargo: string;
  email: string;
  anexo: string;
  linkTeams: string;
  fotoUrl: string;
  funciones: string[];
}

// Datos iniciales del equipo organizados por área
const equipoInicial: Record<string, PersonaEquipo[]> = {
  "LOGÍSTICA": [
    {
      id: "1",
      nombre: "Carlos Ramírez",
      cargo: "Jefe de Logística",
      email: "carlos.ramirez@ebco.cl",
      anexo: "2345",
      linkTeams: "https://teams.microsoft.com/l/meetup-join/example2",
      fotoUrl: "https://i.pravatar.cc/150?img=12",
      funciones: [
        "Dirigir la planificación y control de abastecimiento de materiales",
        "Supervisar la gestión de arriendos y servicios externos",
        "Coordinar con proveedores y obra para entregas oportunas",
        "Asegurar trazabilidad de inventarios y control de pérdidas"
      ]
    }
  ],
  "PRODUCTOS Y SERVICIOS": [
    {
      id: "2",
      nombre: "Ana Martínez",
      cargo: "Jefe de Productos y Soportes",
      email: "ana.martinez@ebco.cl",
      anexo: "3456",
      linkTeams: "https://teams.microsoft.com/l/meetup-join/example3",
      fotoUrl: "https://i.pravatar.cc/150?img=47",
      funciones: [
        "Gestionar la administración de subcontratos para proyectos BETT",
        "Coordinar el manejo de especificaciones técnicas de materiales",
        "Supervisar cubicaciones y cuadros comparativos",
        "Asegurar cumplimiento de plazos y especificaciones técnicas"
      ]
    }
  ],
  "ANÁLISIS DE DATOS": [
    {
      id: "3",
      nombre: "Roberto Silva",
      cargo: "Jefe de Análisis de Datos",
      email: "roberto.silva@ebco.cl",
      anexo: "4567",
      linkTeams: "https://teams.microsoft.com/l/meetup-join/example4",
      fotoUrl: "https://i.pravatar.cc/150?img=33",
      funciones: [
        "Monitorear el desempeño financiero de los proyectos",
        "Supervisar planificación y avance físico (ISP)",
        "Detectar desviaciones en tiempo y costo",
        "Proporcionar información para toma de decisiones estratégicas"
      ]
    }
  ],
  "COORDINACIÓN": [
    {
      id: "0",
      nombre: "María González",
      cargo: "Coordinadora Back Office",
      email: "maria.gonzalez@ebco.cl",
      anexo: "1234",
      linkTeams: "https://teams.microsoft.com/l/meetup-join/example1",
      fotoUrl: "https://i.pravatar.cc/150?img=5",
      funciones: [
        "Supervisar y coordinar las tres áreas estratégicas del Back Office",
        "Asegurar la integración y eficiencia entre Logística, Productos y Análisis",
        "Reportar directamente a la dirección de proyectos",
        "Gestionar recursos y presupuestos del área"
      ]
    }
  ]
};

export default function OrganigramaPage() {
  const [expandedAreas, setExpandedAreas] = useState<string[]>([
    "LOGÍSTICA",
    "PRODUCTOS Y SERVICIOS",
    "ANÁLISIS DE DATOS",
  ]);
  
  const [equipoPorArea, setEquipoPorArea] = useState<Record<string, PersonaEquipo[]>>(equipoInicial);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [newMemberForm, setNewMemberForm] = useState({
    nombre: "",
    cargo: "",
    email: "",
    anexo: "",
    linkTeams: "",
    fotoUrl: "",
    funciones: [""]
  });

  const toggleArea = (areaName: string) => {
    setExpandedAreas((prev) =>
      prev.includes(areaName)
        ? prev.filter((a) => a !== areaName)
        : [...prev, areaName]
    );
  };

  const handleCreateMember = (area: string) => {
    setSelectedArea(area);
    setNewMemberForm({
      nombre: "",
      cargo: "",
      email: "",
      anexo: "",
      linkTeams: "",
      fotoUrl: "",
      funciones: [""]
    });
    setShowCreateModal(true);
  };

  const handleSaveMember = () => {
    if (!newMemberForm.nombre || !newMemberForm.cargo || !newMemberForm.email || !selectedArea) {
      alert("Por favor completa los campos obligatorios: nombre, cargo, email y área");
      return;
    }

    const newMember: PersonaEquipo = {
      id: Date.now().toString(),
      nombre: newMemberForm.nombre,
      cargo: newMemberForm.cargo,
      email: newMemberForm.email,
      anexo: newMemberForm.anexo || "N/A",
      linkTeams: newMemberForm.linkTeams || "#",
      fotoUrl: newMemberForm.fotoUrl || "",
      funciones: newMemberForm.funciones.filter(f => f.trim() !== "")
    };

    setEquipoPorArea(prev => ({
      ...prev,
      [selectedArea]: [...(prev[selectedArea] || []), newMember]
    }));

    setShowCreateModal(false);
    setNewMemberForm({
      nombre: "",
      cargo: "",
      email: "",
      anexo: "",
      linkTeams: "",
      fotoUrl: "",
      funciones: [""]
    });
    alert(`Miembro "${newMember.nombre}" agregado exitosamente a ${selectedArea}`);
  };

  const handleDeleteMember = (area: string, id: string) => {
    if (confirm("¿Estás seguro de eliminar este miembro del equipo?")) {
      setEquipoPorArea(prev => ({
        ...prev,
        [area]: prev[area].filter(member => member.id !== id)
      }));
    }
  };

  const addFunctionField = () => {
    setNewMemberForm(prev => ({
      ...prev,
      funciones: [...prev.funciones, ""]
    }));
  };

  const updateFunction = (index: number, value: string) => {
    setNewMemberForm(prev => ({
      ...prev,
      funciones: prev.funciones.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFunction = (index: number) => {
    setNewMemberForm(prev => ({
      ...prev,
      funciones: prev.funciones.filter((_, i) => i !== index)
    }));
  };

  const getStatusColor = (status: "good" | "warning" | "critical") => {
    switch (status) {
      case "good":
        return { bg: "#dcfce7", color: "#16a34a", border: "#bbf7d0" };
      case "warning":
        return { bg: "#fef3c7", color: "#f59e0b", border: "#fde68a" };
      case "critical":
        return { bg: "#fee2e2", color: "#ef4444", border: "#fecaca" };
    }
  };

  const getAreaRoute = (areaName: string) => {
    switch (areaName) {
      case "LOGÍSTICA":
        return "/logistica";
      case "PRODUCTOS Y SERVICIOS":
        return "/productos";
      case "ANÁLISIS DE DATOS":
        return "/analisis";
      default:
        return "#";
    }
  };

  return (
    <div className="p-8 min-h-screen">
      {/* Header Banner */}
      <div className="bg-brand-red text-brand-text-light py-8 px-8 rounded-lg mb-12">
        <h1 className="text-4xl font-bold">ESTRUCTURA ORGANIZACIONAL</h1>
        <p className="text-lg mt-2 opacity-90">Back Office - Funciograma</p>
      </div>

      {/* Introduction Section */}
      <section className="mb-12 bg-brand-bg-white p-8 rounded-lg shadow-md border" style={{ borderColor: "var(--color-brand-line)" }}>
        <h2 className="text-2xl font-bold text-brand-red mb-4">Bienvenida</h2>
        <p className="text-brand-text-dark leading-relaxed italic mb-4">
          "Somos el motor silencioso que organiza, conecta y potencia, para que cada proyecto
          avance con eficiencia, calidad y visión de futuro."
        </p>
        <p className="text-brand-text-dark leading-relaxed">
          El Back Office se estructura bajo un Coordinador que supervisa tres áreas estratégicas
          que trabajan de manera integrada para el éxito de los proyectos de construcción.
        </p>
      </section>

      {/* Visual Organizational Chart */}
      <section className="mb-12 bg-brand-bg-white border rounded-lg p-8 shadow-md" style={{ borderColor: "var(--color-brand-line)" }}>
        {/* Funciograma Image */}
        <div className="flex justify-center">
          <img
            src="/organigrama-backoffice.png"
            alt="Funciograma Back Office EBCO"
            className="w-full max-w-[800px] h-auto rounded-lg shadow-md"
            style={{ imageRendering: "auto" as any }}
          />
        </div>
      </section>

      {/* Funciones por Área Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-brand-red mb-6">Funciones por Área</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Área Logística */}
          <div className="bg-brand-bg-white border rounded-lg p-6 shadow-md border-l-4" style={{ borderLeftColor: "var(--color-brand-red)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-brand-red">
                <MdLocalShipping size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-red">Área Logística</h3>
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-red mb-3">Funciones Clave:</h4>
              <ul className="space-y-2 text-sm text-brand-text-dark">
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Gestión de inventario de bodega, equipos y herramientas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Coordinación de despachos (fierro, hormigón)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Control de pérdidas de material</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Gestión y control de arriendos (moldaje, andamios)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Área Productos y Servicios */}
          <div className="bg-brand-bg-white border rounded-lg p-6 shadow-md border-l-4" style={{ borderLeftColor: "var(--color-brand-red)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-brand-red">
                <MdShoppingCart size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-red">Área Productos y Servicios</h3>
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-red mb-3">Funciones Clave:</h4>
              <ul className="space-y-2 text-sm text-brand-text-dark">
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Gestión de planillas y cuadros de subcontratación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Generación de cubicaciones y cuadros comparativos (SC y materiales)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Administración de Contratos y HES</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Elaboración de Especificaciones Técnicas (EETT)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Área Análisis de Datos */}
          <div className="bg-brand-bg-white border rounded-lg p-6 shadow-md border-l-4" style={{ borderLeftColor: "var(--color-brand-red)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-brand-red">
                <MdAnalytics size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-red">Área Análisis de Datos</h3>
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-red mb-3">Funciones Clave:</h4>
              <ul className="space-y-2 text-sm text-brand-text-dark">
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Análisis de costos y Mano de Obra</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Gestión de Estados de Pago (Mandante e Ingevista)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Seguimiento del programa general (ISP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 flex-shrink-0">•</span>
                  <span>Elaboración de curvas de avance y rendimiento de partidas clave (hormigón, enfierradura, etc.)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo y Roles Clave Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-brand-red">Equipo y Roles Clave</h2>
          <button
            onClick={() => {
              // Mostrar modal para seleccionar área primero
              setShowCreateModal(true);
              setSelectedArea("");
            }}
            className="btn btn-primary flex items-center gap-2"
          >
            <MdAdd size={18} />
            Agregar Miembro
          </button>
        </div>

        {/* Todas las tarjetas juntas sin separar por área */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(equipoPorArea).map(([area, miembros]) =>
            miembros.map((persona) => (
              <div key={persona.id} className="relative">
                <TarjetaContacto persona={persona} />
                <button
                  onClick={() => handleDeleteMember(area, persona.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
                  title="Eliminar miembro"
                >
                  <MdDelete className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modal para Crear Nuevo Miembro */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <div>
                <h3 className="text-xl font-bold ink">Agregar Nuevo Miembro</h3>
                <p className="text-xs text-muted mt-1">{selectedArea ? `Área: ${selectedArea}` : "Selecciona el área del miembro"}</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
                title="Cerrar"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Selector de Área */}
              <div>
                <label className="block text-sm font-semibold ink mb-2">
                  Área <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                >
                  <option value="">Selecciona un área</option>
                  <option value="COORDINACIÓN">Coordinación</option>
                  {areasData.map((area) => (
                    <option key={area.name} value={area.name}>{area.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold ink mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newMemberForm.nombre}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, nombre: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                    placeholder="Ej: Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold ink mb-2">
                    Cargo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newMemberForm.cargo}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, cargo: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                    placeholder="Ej: Analista de Costos"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold ink mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newMemberForm.email}
                  onChange={(e) => setNewMemberForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  placeholder="ejemplo@ebco.cl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold ink mb-2">Anexo</label>
                  <input
                    type="text"
                    value={newMemberForm.anexo}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, anexo: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                    placeholder="Ej: 1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold ink mb-2">Link Teams</label>
                  <input
                    type="url"
                    value={newMemberForm.linkTeams}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, linkTeams: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                    placeholder="https://teams.microsoft.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold ink mb-2">URL de Foto (opcional)</label>
                <input
                  type="url"
                  value={newMemberForm.fotoUrl}
                  onChange={(e) => setNewMemberForm(prev => ({ ...prev, fotoUrl: e.target.value }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  placeholder="https://ejemplo.com/foto.jpg"
                />
                <p className="text-xs text-muted mt-1">Si no se proporciona, se usará la inicial del nombre</p>
              </div>

              <div>
                <label className="block text-sm font-semibold ink mb-2">Funciones Principales</label>
                <div className="space-y-2">
                  {newMemberForm.funciones.map((funcion, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={funcion}
                        onChange={(e) => updateFunction(index, e.target.value)}
                        className="flex-1 px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                        style={{ borderColor: "var(--color-brand-line)" }}
                        placeholder={`Función ${index + 1}`}
                      />
                      {newMemberForm.funciones.length > 1 && (
                        <button
                          onClick={() => removeFunction(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar función"
                        >
                          <MdDelete size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addFunctionField}
                    className="btn btn-outline text-sm w-full flex items-center justify-center gap-2"
                  >
                    <MdAdd size={16} />
                    Agregar Función
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveMember}
                  className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <MdAdd size={18} />
                  Agregar Miembro
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
