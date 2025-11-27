"use client";

import { useState } from "react";
import { MdLocalShipping, MdWarehouse, MdCheckCircle, MdSchedule, MdWarning, MdCancel, MdDownload, MdOutlineTableChart, MdPictureAsPdf, MdPerson } from "react-icons/md";
import InfoCard from "@/components/ui/InfoCard";
import DocumentManager from "@/components/ui/DocumentManager";
import DeliverablesCalendar from "@/components/ui/DeliverablesCalendar";

type DeliverableStatus = "Pendiente" | "Completado" | "Urgente" | "Vencido";

type Deliverable = {
  id: string;
  name: string;
  period: "Diario" | "Semanal" | "Quincenal" | "Mensual";
  dueDate: string;
  status: DeliverableStatus;
  assignedTo: string;
  progress: number;
  lastCompletedDate: string;
  isUrgent: boolean;
  pendingReason: string;
  requiredSignatures: string[];
  completedSignatures: string[];
  observations: string;
};

// Tipo compatible con DeliverablesCalendar (solo campos básicos)
type DeliverableBasic = {
  id: string;
  name: string;
  period: "Diario" | "Semanal" | "Quincenal" | "Mensual";
  dueDate: string;
  status: DeliverableStatus;
  assignedTo: string;
  progress?: number;
};

export default function LogisticaPage() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [activeFormatTab, setActiveFormatTab] = useState<number>(0);
  const [previewDeliverable, setPreviewDeliverable] = useState<Deliverable | null>(null);

  // Helper function to format date as YYYY-MM-DD in local timezone
  const formatDateLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Entregables con fechas y estados (ahora con estado mutable)
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    {
      id: "1",
      name: "Coordinación de despachos",
      period: "Diario" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 0 * 24 * 60 * 60 * 1000)),
      status: "Pendiente" as const,
      assignedTo: "M. Pérez",
      progress: 0, // No completado
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)),
      isUrgent: false,
      pendingReason: "",
      requiredSignatures: ["Jefe de Logística", "Coordinador de Obra"],
      completedSignatures: ["Jefe de Logística"],
      observations: ""
    },
    {
      id: "2",
      name: "Control Hormigones",
      period: "Diario" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)),
      status: "Urgente" as const,
      assignedTo: "C. González",
      progress: 0, // No completado
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)),
      isUrgent: true,
      pendingReason: "",
      requiredSignatures: ["Supervisor de Obra", "Jefe de Logística"],
      completedSignatures: [],
      observations: ""
    },
    {
      id: "3",
      name: "Control pérdida de hormigones",
      period: "Diario" as const,
      dueDate: formatDateLocal(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)),
      status: "Vencido" as const,
      assignedTo: "J. Ramírez",
      progress: 0, // No completado
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
      isUrgent: false,
      pendingReason: "",
      requiredSignatures: ["Supervisor de Calidad"],
      completedSignatures: [],
      observations: ""
    },
    {
      id: "4",
      name: "Contratos y HES",
      period: "Diario" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)),
      status: "Completado" as const,
      assignedTo: "A. Silva",
      progress: 100,
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 0 * 24 * 60 * 60 * 1000)),
      isUrgent: false,
      pendingReason: "",
      requiredSignatures: ["Jefe Legal", "Contador"],
      completedSignatures: ["Jefe Legal", "Contador"],
      observations: ""
    },
    {
      id: "5",
      name: "Control de arriendos",
      period: "Semanal" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)),
      status: "Urgente" as const,
      assignedTo: "L. Torres",
      progress: 0, // No completado
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)),
      isUrgent: true,
      pendingReason: "",
      requiredSignatures: ["Gerente de Proyecto"],
      completedSignatures: [],
      observations: ""
    },
    {
      id: "6",
      name: "Estado de equipos",
      period: "Semanal" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)),
      status: "Pendiente" as const,
      assignedTo: "M. Pérez",
      progress: 0,
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      isUrgent: false,
      pendingReason: "",
      requiredSignatures: ["Supervisor de Obra"],
      completedSignatures: [],
      observations: ""
    },
    {
      id: "7",
      name: "Reporte Mensual Logística",
      period: "Mensual" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)),
      status: "Pendiente" as const,
      assignedTo: "C. González",
      progress: 0, // No completado
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
      isUrgent: false,
      pendingReason: "",
      requiredSignatures: ["Jefe de Logística", "Coordinador General"],
      completedSignatures: [],
      observations: ""
    }
  ]);

  // Función para actualizar el estado de completado de un entregable
  const updateDeliverableProgress = (id: string, newProgress: number) => {
    setDeliverables(prev => prev.map(d => {
      if (d.id === id) {
        // newProgress será 0 o 100 (completado o no completado)
        const isCompleted = newProgress === 100;
        const newStatus = isCompleted ? "Completado" as const : "Pendiente" as const;
        
        return { 
          ...d, 
          progress: newProgress,
          status: newStatus,
          lastCompletedDate: isCompleted ? formatDateLocal(new Date()) : d.lastCompletedDate
        };
      }
      return d;
    }));
  };

  // Función para actualizar los detalles del entregable (urgente, razón pendiente, firmas, observaciones)
  const updateDeliverableDetails = (id: string, updates: {
    isUrgent?: boolean;
    pendingReason?: string;
    requiredSignatures?: string[];
    completedSignatures?: string[];
    observations?: string;
  }) => {
    setDeliverables(prev => prev.map(d => {
      if (d.id === id) {
        const updated = { ...d, ...updates };
        // Si se marca como urgente, actualizar el status también
        if (updates.isUrgent !== undefined && updates.isUrgent && updated.status !== "Completado") {
          updated.status = "Urgente" as const;
        } else if (updates.isUrgent !== undefined && !updates.isUrgent && updated.status === "Urgente") {
          updated.status = "Pendiente" as const;
        }
        return updated;
      }
      return d;
    }));
    
    // Actualizar también el previewDeliverable si está abierto
    if (previewDeliverable && previewDeliverable.id === id) {
      setPreviewDeliverable(prev => {
        if (!prev) return null;
        const updated = { ...prev, ...updates };
        if (updates.isUrgent !== undefined && updates.isUrgent && updated.status !== "Completado") {
          updated.status = "Urgente" as const;
        } else if (updates.isUrgent !== undefined && !updates.isUrgent && updated.status === "Urgente") {
          updated.status = "Pendiente" as const;
        }
        return updated;
      });
    }
  };

  // Función para restar un día de una fecha en formato YYYY-MM-DD
  const subtractOneDay = (dateStr: string): string => {
    const date = new Date(dateStr + 'T12:00:00'); // Usar mediodía para evitar problemas de zona horaria
    date.setDate(date.getDate() - 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Función para crear un nuevo entregable
  const handleCreateDeliverable = (deliverableData: Omit<Deliverable, "id"> & { lastCompletedDate?: string }) => {
    // Asegurar que la fecha se mantenga en formato YYYY-MM-DD sin conversiones
    // Normalizar la fecha: eliminar espacios y cualquier parte de tiempo
    const dueDateRaw = deliverableData.dueDate.trim().split('T')[0];
    // Restar un día para que aparezca en el día correcto del calendario
    const dueDate = subtractOneDay(dueDateRaw);
    
    const newDeliverable: Deliverable = {
      ...deliverableData,
      dueDate: dueDate, // Fecha ajustada (un día antes)
      id: Date.now().toString(), // ID temporal
      progress: deliverableData.progress ?? 0,
      lastCompletedDate: deliverableData.lastCompletedDate ?? formatDateLocal(new Date()),
      isUrgent: deliverableData.isUrgent ?? false,
      pendingReason: deliverableData.pendingReason ?? "",
      requiredSignatures: deliverableData.requiredSignatures ?? [],
      completedSignatures: deliverableData.completedSignatures ?? [],
      observations: deliverableData.observations ?? ""
    };
    setDeliverables(prev => [...prev, newDeliverable]);
    
    // No cambiar el filtro - el filtro ya busca tanto la fecha seleccionada como el día anterior
    // Esto mantiene el badge mostrando la fecha que el usuario seleccionó
  };

  // Wrapper para onCreateDeliverable que convierte el tipo básico al completo
  const handleCreateDeliverableWrapper = (deliverableData: Omit<DeliverableBasic, "id"> & { lastCompletedDate?: string }) => {
    const fullData: Omit<Deliverable, "id"> & { lastCompletedDate?: string } = {
      ...deliverableData,
      progress: deliverableData.progress ?? 0,
      lastCompletedDate: deliverableData.lastCompletedDate ?? formatDateLocal(new Date()),
      isUrgent: false,
      pendingReason: "",
      requiredSignatures: [],
      completedSignatures: [],
      observations: ""
    };
    handleCreateDeliverable(fullData);
  };

  // Calcular KPIs (sistema binario: Completado / No Completado)
  const totalDeliverables = deliverables.length;
  const completados = deliverables.filter(d => d.status === "Completado").length;
  const noCompletados = deliverables.filter(d => d.status !== "Completado").length;
  const pendientes = deliverables.filter(d => d.status === "Pendiente").length;
  const urgentes = deliverables.filter(d => d.status === "Urgente").length;
  const vencidos = deliverables.filter(d => d.status === "Vencido").length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const vencenHoy = deliverables.filter(d => {
    const due = new Date(d.dueDate + 'T00:00:00');
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 && d.status !== "Completado";
  }).length;

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
      {/* Header Banner */}
      <div className="bg-brand-red text-brand-text-light py-4 sm:py-5 md:py-6 lg:py-8 px-3 sm:px-4 md:px-6 lg:px-8 rounded-lg mb-4 sm:mb-6 md:mb-8 lg:mb-12 w-full">
        <h1 className="text-2xl md:text-4xl font-bold">ÁREA LOGÍSTICA</h1>
        <p className="text-base md:text-lg mt-2 opacity-90">Gestión de materiales y servicios de arriendo</p>
      </div>

      {/* Sub-areas */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-red mb-4 sm:mb-6">Subáreas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
          <InfoCard
            icon={<MdWarehouse size={40} />}
            title="Logística Materiales"
            description="Se encarga de la planificación, control y abastecimiento de materiales generales de obra. Asegura que los insumos (ferretería, hormigones, fierros, herramientas) estén disponibles en tiempo y forma, evitando pérdidas, desabastecimiento y retrasos en las faenas."
          />
          <InfoCard
            icon={<MdLocalShipping size={40} />}
            title="Servicios y Arriendos"
            description="Gestiona los servicios externos y equipos arrendados para la obra. Moldajes, andamios, maquinarias y otros contratos de arriendo. Su foco está en el control de uso, costos y tiempos de arriendo, además de la administración de contratos y documentos asociados."
          />
        </div>
      </section>

      {/* KPIs Dashboard */}
      <section className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl font-bold ink">Indicadores de Entregables</h2>
          {(filterStatus || filterDate) && (
            <button
              onClick={() => {
                setFilterStatus(null);
                setFilterDate(null);
              }}
              className="btn btn-outline text-xs sm:text-sm w-full sm:w-auto"
            >
              Limpiar filtros
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-4">
          <button
            onClick={() => {
              setFilterStatus(null);
              setFilterDate(null);
            }}
            className={`rounded-lg border p-2 sm:p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              !filterStatus && !filterDate ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <MdSchedule className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: "#3b82f6" }} />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-extrabold ink">{totalDeliverables}</p>
            <p className="text-[10px] sm:text-xs muted">Total</p>
          </button>
          <button
            onClick={() => {
              setFilterStatus("Completado");
              setFilterDate(null);
            }}
            className={`rounded-lg border p-2 sm:p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterStatus === "Completado" ? "ring-2 ring-green-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
                <MdCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: "#16a34a" }} />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-extrabold" style={{ color: "#16a34a" }}>{completados}</p>
            <p className="text-[10px] sm:text-xs muted">Completados</p>
          </button>
          <button
            onClick={() => {
              // Filtrar por todos los que NO están completados
              setFilterStatus("no-completado");
              setFilterDate(null);
            }}
            className={`rounded-lg border p-2 sm:p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterStatus === "no-completado" ? "ring-2 ring-orange-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MdSchedule className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: "#f59e0b" }} />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-extrabold" style={{ color: "#f59e0b" }}>{noCompletados}</p>
            <p className="text-[10px] sm:text-xs muted">No Completados</p>
          </button>
          <button
            onClick={() => {
              setFilterStatus("Pendiente");
              setFilterDate(null);
            }}
            className={`rounded-lg border p-2 sm:p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterStatus === "Pendiente" ? "ring-2 ring-yellow-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <MdSchedule className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: "#f59e0b" }} />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-extrabold" style={{ color: "#f59e0b" }}>{pendientes}</p>
            <p className="text-[10px] sm:text-xs muted">Pendientes</p>
          </button>
          <button
            onClick={() => {
              setFilterStatus("Urgente");
              setFilterDate(null);
            }}
            className={`rounded-lg border p-2 sm:p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterStatus === "Urgente" ? "ring-2 ring-red-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-red-100 flex items-center justify-center">
                <MdWarning className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: "#ef4444" }} />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-extrabold" style={{ color: "#ef4444" }}>{urgentes}</p>
            <p className="text-[10px] sm:text-xs muted">Urgentes</p>
          </button>
          <button
            onClick={() => {
              setFilterStatus("Vencido");
              setFilterDate(null);
            }}
            className={`rounded-lg border p-2 sm:p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterStatus === "Vencido" ? "ring-2 ring-gray-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <MdCancel className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: "#6b7280" }} />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-extrabold" style={{ color: "#6b7280" }}>{vencidos}</p>
            <p className="text-[10px] sm:text-xs muted">Vencidos</p>
          </button>
          <button
            onClick={() => {
              setFilterStatus(null);
              const today = formatDateLocal(new Date());
              setFilterDate(today);
            }}
            className={`rounded-lg border p-2 sm:p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterDate === formatDateLocal(new Date()) ? "ring-2 ring-orange-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MdWarning className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: "#f59e0b" }} />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-extrabold" style={{ color: "#f59e0b" }}>{vencenHoy}</p>
            <p className="text-[10px] sm:text-xs muted">Vencen Hoy</p>
          </button>
        </div>
      </section>

      {/* Calendar/Entregables View */}
      <div id="deliverables-calendar">
        <DeliverablesCalendar 
          deliverables={deliverables} 
          filterStatus={filterStatus}
          filterDate={filterDate}
          onDateSelect={setFilterDate}
          onUpdateProgress={updateDeliverableProgress}
          onPreview={(deliverable: DeliverableBasic) => {
            const fullDeliverable = deliverables.find(d => d.id === deliverable.id);
            if (fullDeliverable) {
              setPreviewDeliverable(fullDeliverable);
            }
          }}
          onCreateDeliverable={handleCreateDeliverableWrapper}
        />
      </div>

      {/* Modal de Vista Previa de Entregable */}
      {previewDeliverable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-start sm:items-center justify-between p-4 sm:p-6 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="flex-1 pr-2">
                <h3 className="text-base sm:text-xl font-bold ink mb-2">{previewDeliverable.name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="chip text-xs"
                    style={{
                      background: previewDeliverable.status === "Completado" ? "#dcfce7" : 
                                  previewDeliverable.status === "Urgente" ? "#fee2e2" :
                                  previewDeliverable.status === "Pendiente" ? "#fef3c7" : "#f3f4f6",
                      color: previewDeliverable.status === "Completado" ? "#16a34a" : 
                            previewDeliverable.status === "Urgente" ? "#ef4444" :
                            previewDeliverable.status === "Pendiente" ? "#f59e0b" : "#6b7280",
                      border: `1px solid ${previewDeliverable.status === "Completado" ? "#bbf7d0" : 
                              previewDeliverable.status === "Urgente" ? "#fecaca" :
                              previewDeliverable.status === "Pendiente" ? "#fde68a" : "#e5e7eb"}`
                    }}
                  >
                    {previewDeliverable.status}
                  </span>
                  <span className="chip text-xs" style={{ background: "#e0e7ff", color: "#6366f1", border: "1px solid #c7d2fe" }}>
                    {previewDeliverable.period}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPreviewDeliverable(null)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition-colors"
                title="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
              {/* Información Básica */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold ink mb-1">Fecha de vencimiento:</p>
                  <p className="text-sm muted">{new Date(previewDeliverable.dueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold ink mb-1">Asignado a:</p>
                  <p className="text-sm muted">👤 {previewDeliverable.assignedTo}</p>
                </div>
                {previewDeliverable.lastCompletedDate && (
                  <div>
                    <p className="text-sm font-semibold ink mb-1">Último completado:</p>
                    <p className="text-sm muted">{new Date(previewDeliverable.lastCompletedDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                )}
              </div>

              {/* Marcar como Urgente */}
              <div className="pt-4 border-t" style={{ borderColor: "var(--color-brand-line)" }}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={previewDeliverable.isUrgent || false}
                    onChange={(e) => {
                      updateDeliverableDetails(previewDeliverable.id, { isUrgent: e.target.checked });
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-brand-red focus:ring-brand-red focus:ring-2"
                    disabled={previewDeliverable.status === "Completado"}
                  />
                  <div>
                    <span className="text-sm font-semibold ink">Marcar como urgente</span>
                    <p className="text-xs muted mt-1">Indica que este entregable requiere atención inmediata</p>
                  </div>
                </label>
              </div>

              {/* Razón de Pendiente */}
              {previewDeliverable.status === "Pendiente" && (
                <div className="pt-4 border-t" style={{ borderColor: "var(--color-brand-line)" }}>
                  <label className="block text-sm font-semibold ink mb-2">
                    Explicación del estado pendiente:
                  </label>
                  <textarea
                    value={previewDeliverable.pendingReason || ""}
                    onChange={(e) => {
                      updateDeliverableDetails(previewDeliverable.id, { pendingReason: e.target.value });
                    }}
                    placeholder="Ej: Falta información del proveedor, esperando aprobación, etc."
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm resize-none"
                    style={{ borderColor: "var(--color-brand-line)" }}
                    rows={3}
                  />
                </div>
              )}

              {/* Firmas y Autorizaciones */}
              <div className="pt-4 border-t" style={{ borderColor: "var(--color-brand-line)" }}>
                <h4 className="text-sm font-bold ink mb-3 flex items-center gap-2">
                  <MdPerson className="w-4 h-4" />
                  Firmas y Autorizaciones Requeridas:
                </h4>
                
                {/* Barra horizontal de firmas */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(previewDeliverable.requiredSignatures || []).map((signature: string, index: number) => {
                    const isCompleted = previewDeliverable.completedSignatures?.includes(signature) || false;
                    return (
                      <div
                        key={index}
                        className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
                          isCompleted
                            ? 'bg-green-100 border-2 border-green-400 text-green-700'
                            : 'bg-gray-100 border-2 border-gray-300 text-gray-700 hover:border-orange-400 hover:bg-orange-50'
                        }`}
                        onClick={() => {
                          const currentCompleted = previewDeliverable.completedSignatures || [];
                          const newCompleted = !isCompleted
                            ? [...currentCompleted, signature]
                            : currentCompleted.filter((s: string) => s !== signature);
                          updateDeliverableDetails(previewDeliverable.id, { completedSignatures: newCompleted });
                        }}
                        title={isCompleted ? "Click para marcar como pendiente" : "Click para marcar como completada"}
                      >
                        <span className={`text-xs font-semibold ${isCompleted ? 'line-through' : ''}`}>
                          {signature}
                        </span>
                        {isCompleted && (
                          <span className="text-green-600 font-bold">✓</span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentRequired = previewDeliverable.requiredSignatures || [];
                            const newRequired = currentRequired.filter((s: string) => s !== signature);
                            const currentCompleted = previewDeliverable.completedSignatures || [];
                            const newCompleted = currentCompleted.filter((s: string) => s !== signature);
                            updateDeliverableDetails(previewDeliverable.id, {
                              requiredSignatures: newRequired,
                              completedSignatures: newCompleted
                            });
                          }}
                          className="ml-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Eliminar firma"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Input para agregar nueva firma */}
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Agregar nueva firma requerida..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        const currentRequired = previewDeliverable.requiredSignatures || [];
                        if (!currentRequired.includes(e.currentTarget.value.trim())) {
                          updateDeliverableDetails(previewDeliverable.id, {
                            requiredSignatures: [...currentRequired, e.currentTarget.value.trim()]
                          });
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                      if (input.value.trim()) {
                        const currentRequired = previewDeliverable.requiredSignatures || [];
                        if (!currentRequired.includes(input.value.trim())) {
                          updateDeliverableDetails(previewDeliverable.id, {
                            requiredSignatures: [...currentRequired, input.value.trim()]
                          });
                          input.value = '';
                        }
                      }
                    }}
                    className="btn btn-primary px-4 text-sm flex-shrink-0 w-full sm:w-auto"
                  >
                    Agregar
                  </button>
                </div>

                {/* Resumen de firmas */}
                {(() => {
                  const completed = previewDeliverable.completedSignatures?.length || 0;
                  const total = previewDeliverable.requiredSignatures?.length || 0;
                  const allCompleted = completed === total && total > 0;
                  if (total === 0) return null;
                  return (
                    <div className={`p-3 rounded-lg ${allCompleted ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                      <p className={`text-xs font-semibold ${allCompleted ? 'text-green-700' : 'text-yellow-700'}`}>
                        {allCompleted 
                          ? `✓ Todas las firmas completadas (${completed}/${total})`
                          : `Faltan ${total - completed} firma${total - completed !== 1 ? 's' : ''} (${completed}/${total} completadas)`}
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Observaciones */}
              <div className="pt-4 border-t" style={{ borderColor: "var(--color-brand-line)" }}>
                <label className="block text-sm font-bold ink mb-2">
                  Observaciones:
                </label>
                <textarea
                  value={previewDeliverable.observations || ""}
                  onChange={(e) => {
                    updateDeliverableDetails(previewDeliverable.id, { observations: e.target.value });
                  }}
                  placeholder="Agregar notas, comentarios o información adicional sobre este entregable..."
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm resize-none"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  rows={4}
                />
              </div>

              {/* Estado */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--color-brand-line)" }}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold ink">Estado:</span>
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded ${
                      previewDeliverable.status === "Completado"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {previewDeliverable.status === "Completado" ? "✓ Completado" : "○ No completado"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formatos de Entregables */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-red mb-4 sm:mb-6">Formatos de Entregables</h2>
        
        {/* Formatos por periodicidad */}
        {(() => {
          interface FormatItem {
            title: string;
            description: string;
            lastUpdate: string;
            fileType: "excel" | "pdf";
            downloadLink?: string;
          }

          const formats: { [key: string]: FormatItem[] } = {
            "Diarios": [
              {
                title: "Coordinación de Despachos",
                description: "Formato para la coordinación y control de despachos diarios de materiales.",
                lastUpdate: "2025-01-15",
                fileType: "excel"
              },
              {
                title: "Control Hormigones",
                description: "Plantilla para el control diario de hormigones y su seguimiento.",
                lastUpdate: "2025-01-20",
                fileType: "excel"
              },
              {
                title: "Control Pérdida de Hormigón",
                description: "Formato para registrar y controlar las pérdidas de hormigón en obra.",
                lastUpdate: "2025-01-18",
                fileType: "excel"
              },
              {
                title: "Solicitud Despacho Fierro (CUB)",
                description: "Formato para solicitar el despacho de fierro según CUB requerido.",
                lastUpdate: "2025-01-22",
                fileType: "pdf"
              },
              {
                title: "Contratos y HES",
                description: "Plantilla para el registro y seguimiento de contratos y HES.",
                lastUpdate: "2025-01-10",
                fileType: "pdf"
              }
            ],
            "Semanales": [
              {
                title: "Solped (Solicitud Pedido Materiales)",
                description: "Formato para solicitar pedidos de materiales de manera semanal.",
                lastUpdate: "2025-01-25",
                fileType: "excel"
              },
              {
                title: "Stock Crítico Materiales",
                description: "Plantilla para identificar y controlar materiales en stock crítico.",
                lastUpdate: "2025-01-28",
                fileType: "excel"
              },
              {
                title: "Inventario Equipos y Herramientas",
                description: "Formato para el inventario semanal de equipos y herramientas.",
                lastUpdate: "2025-01-27",
                fileType: "excel"
              },
              {
                title: "Análisis Estadístico",
                description: "Plantilla para análisis estadístico de datos semanales de logística.",
                lastUpdate: "2025-01-26",
                fileType: "excel"
              },
              {
                title: "Control Pérdida de Fierro",
                description: "Formato para el control semanal de pérdidas de fierro.",
                lastUpdate: "2025-01-24",
                fileType: "excel"
              },
              {
                title: "Planilla Servicios y Arriendo",
                description: "Plantilla para el control de servicios y arriendos semanales.",
                lastUpdate: "2025-01-23",
                fileType: "excel"
              }
            ],
            "Quincenales": [
              {
                title: "EEPP Arriendos Carátulas",
                description: "Formato quincenal para Estados de Ejecución de Presupuesto (EEPP) de arriendos con carátulas.",
                lastUpdate: "2025-01-15",
                fileType: "pdf"
              }
            ],
            "Mensuales": [
              {
                title: "Inventario Bodega Valorizado",
                description: "Plantilla mensual para inventario de bodega con valores asignados.",
                lastUpdate: "2025-01-01",
                fileType: "excel"
              },
              {
                title: "Control Arriendo Moldaje",
                description: "Formato mensual para el control de arriendo de moldajes.",
                lastUpdate: "2025-01-05",
                fileType: "excel"
              },
              {
                title: "Control Arriendo Alzaprima",
                description: "Plantilla mensual para el control de arriendo de alzaprimas.",
                lastUpdate: "2025-01-08",
                fileType: "excel"
              },
              {
                title: "Control Arriendo Andamios",
                description: "Formato mensual para el control de arriendo de andamios.",
                lastUpdate: "2025-01-10",
                fileType: "excel"
              }
            ]
          };

          const tabs = Object.keys(formats);
          const currentFormats = formats[tabs[activeFormatTab]] || [];

          return (
            <>
              {/* Tabs Navigation */}
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 border-b pb-3 sm:pb-4 overflow-x-auto" style={{ borderColor: "var(--color-brand-line)" }}>
                {tabs.map((tab, idx) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFormatTab(idx)}
                    className={`btn text-xs sm:text-sm whitespace-nowrap ${
                      activeFormatTab === idx ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {tab} ({formats[tab].length})
                  </button>
                ))}
              </div>

              {/* Format Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
                {currentFormats.map((format, idx) => {
                  const getFileIcon = () => {
                    if (format.fileType === "excel") {
                      return <MdOutlineTableChart className="w-6 h-6 text-green-600" />;
                    } else {
                      return <MdPictureAsPdf className="w-6 h-6 text-red-600" />;
                    }
                  };

                  return (
                    <div
                      key={idx}
                      className="bg-white border rounded-lg p-5 hover:shadow-lg transition-all"
                      style={{ borderColor: "var(--color-brand-line)" }}
                    >
                      {/* File Type Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getFileIcon()}
                          <span className="chip text-xs" style={{ 
                            background: format.fileType === "excel" ? "#dcfce7" : "#fee2e2", 
                            color: format.fileType === "excel" ? "#16a34a" : "#ef4444",
                            border: `1px solid ${format.fileType === "excel" ? "#bbf7d0" : "#fecaca"}`
                          }}>
                            {format.fileType === "excel" ? "Excel" : "PDF"}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-base font-bold ink mb-3">{format.title}</h4>

                      {/* Description */}
                      <p className="text-sm muted mb-4 leading-relaxed">{format.description}</p>

                      {/* Last Update */}
                      <div className="flex items-center gap-2 text-xs muted mb-4 pb-4 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
                        <MdSchedule className="w-4 h-4" />
                        <span>Última actualización: {new Date(format.lastUpdate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={() => {
                          // Placeholder for download - user will provide actual files
                          alert(`Descargando: ${format.title}\nFormato: ${format.fileType.toUpperCase()}\n\n(En producción, aquí se descargaría el archivo real)`);
                        }}
                        className="btn btn-primary w-full flex items-center justify-center gap-2"
                      >
                        <MdDownload size={18} />
                        <span>Descargar</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}
      </section>

      {/* Spacing between sections */}
      <div className="my-16"></div>

      {/* Document Manager */}
      <DocumentManager title="Documentos del Área Logística" />
    </div>
  );
}
