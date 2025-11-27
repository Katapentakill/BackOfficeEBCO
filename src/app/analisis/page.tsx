"use client";

import { useState } from "react";
import { MdAnalytics, MdTrendingUp, MdCheckCircle, MdSchedule, MdWarning, MdCancel, MdPerson, MdDownload, MdOutlineTableChart, MdPictureAsPdf } from "react-icons/md";
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

export default function AnalisisPage() {
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

  // Entregables de Análisis de Datos
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    {
      id: "1",
      name: "Programa General (ISP)",
      period: "Semanal" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)),
      status: "Pendiente" as const,
      assignedTo: "A. Vargas",
      progress: 0,
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)),
      isUrgent: false,
      pendingReason: "",
      requiredSignatures: ["Jefe de Análisis", "Coordinador de Obra"],
      completedSignatures: ["Jefe de Análisis"],
      observations: ""
    },
    {
      id: "2",
      name: "ABO y REC",
      period: "Mensual" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)),
      status: "Urgente" as const,
      assignedTo: "M. Herrera",
      progress: 0,
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)),
      isUrgent: true,
      pendingReason: "",
      requiredSignatures: ["Contador", "Jefe de Análisis"],
      completedSignatures: [],
      observations: ""
    },
    {
      id: "3",
      name: "Análisis Mano de Obra",
      period: "Mensual" as const,
      dueDate: formatDateLocal(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
      status: "Vencido" as const,
      assignedTo: "C. Morales",
      progress: 0,
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 33 * 24 * 60 * 60 * 1000)),
      isUrgent: false,
      pendingReason: "",
      requiredSignatures: ["Gerente de RRHH", "Jefe de Análisis"],
      completedSignatures: [],
      observations: ""
    },
    {
      id: "4",
      name: "EEPP Mandante (INCY Factura)",
      period: "Mensual" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)),
      status: "Completado" as const,
      assignedTo: "L. Silva",
      progress: 100,
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 0 * 24 * 60 * 60 * 1000)),
      isUrgent: false,
      pendingReason: "",
      requiredSignatures: ["Contador", "Jefe de Análisis"],
      completedSignatures: ["Contador", "Jefe de Análisis"],
      observations: ""
    },
    {
      id: "5",
      name: "EEPP INGEVEC (INCY Factura)",
      period: "Mensual" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)),
      status: "Urgente" as const,
      assignedTo: "P. González",
      progress: 0,
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)),
      isUrgent: true,
      pendingReason: "",
      requiredSignatures: ["Director Financiero"],
      completedSignatures: [],
      observations: ""
    },
    {
      id: "6",
      name: "Seguimiento Seguros y Garantías",
      period: "Mensual" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 18 * 24 * 60 * 60 * 1000)),
      status: "Pendiente" as const,
      assignedTo: "R. Torres",
      progress: 0,
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)),
      isUrgent: false,
      pendingReason: "",
      requiredSignatures: ["Jefe de Análisis"],
      completedSignatures: [],
      observations: ""
    },
    {
      id: "7",
      name: "Curvas de Avance Hormigón",
      period: "Semanal" as const,
      dueDate: formatDateLocal(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)),
      status: "Pendiente" as const,
      assignedTo: "J. Ramírez",
      progress: 0,
      lastCompletedDate: formatDateLocal(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
      isUrgent: false,
      pendingReason: "",
      requiredSignatures: ["Supervisor de Obra"],
      completedSignatures: [],
      observations: ""
    }
  ]);

  // Función para actualizar el estado de completado de un entregable
  const updateDeliverableProgress = (id: string, newProgress: number) => {
    setDeliverables(prev => prev.map(d => {
      if (d.id === id) {
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

  // Función para actualizar los detalles del entregable
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
        if (updates.isUrgent !== undefined && updates.isUrgent && updated.status !== "Completado") {
          updated.status = "Urgente" as const;
        } else if (updates.isUrgent !== undefined && !updates.isUrgent && updated.status === "Urgente") {
          updated.status = "Pendiente" as const;
        }
        return updated;
      }
      return d;
    }));
    
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

  // Función para restar un día de una fecha
  const subtractOneDay = (dateStr: string): string => {
    const date = new Date(dateStr + 'T12:00:00');
    date.setDate(date.getDate() - 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Función para crear un nuevo entregable
  const handleCreateDeliverable = (deliverableData: Omit<Deliverable, "id"> & { lastCompletedDate?: string }) => {
    const dueDateRaw = deliverableData.dueDate.trim().split('T')[0];
    const dueDate = subtractOneDay(dueDateRaw);
    
    const newDeliverable: Deliverable = {
      ...deliverableData,
      dueDate: dueDate,
      id: Date.now().toString(),
      // Asegurar que todos los campos requeridos estén presentes
      progress: deliverableData.progress ?? 0,
      lastCompletedDate: deliverableData.lastCompletedDate ?? formatDateLocal(new Date()),
      isUrgent: deliverableData.isUrgent ?? false,
      pendingReason: deliverableData.pendingReason ?? "",
      requiredSignatures: deliverableData.requiredSignatures ?? [],
      completedSignatures: deliverableData.completedSignatures ?? [],
      observations: deliverableData.observations ?? ""
    };
    setDeliverables(prev => [...prev, newDeliverable]);
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

  // Calcular KPIs
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
    <div className="p-4 md:p-8">
      {/* Header Banner */}
      <div className="bg-brand-red text-brand-text-light py-6 md:py-8 px-4 md:px-8 rounded-lg mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-bold">ÁREA ANÁLISIS DE DATOS</h1>
        <p className="text-base md:text-lg mt-2 opacity-90">Control financiero y desempeño operacional</p>
      </div>

      {/* Sub-areas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-brand-red mb-6">Subáreas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<MdAnalytics size={40} />}
            title="Control de Costos"
            description="Monitorea el desempeño financiero del proyecto: control de gastos, análisis de mano de obra indirecta, revisión de EEPP al mandante, seguimiento de seguros y garantías. Su propósito es mantener equilibrio económico y trazabilidad financiera."
          />
          <InfoCard
            icon={<MdTrendingUp size={40} />}
            title="Programa y Avances"
            description="Supervisa planificación y avance físico (ISP), curvas de avance y rendimiento para hormigón, enfierradura, moldaje, excavación, instalaciones y terminaciones. Permite detectar desviaciones y dar seguimiento a hitos constructivos."
          />
        </div>
      </section>

      {/* KPIs Dashboard */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold ink">Indicadores de Entregables</h2>
          {(filterStatus || filterDate) && (
            <button
              onClick={() => {
                setFilterStatus(null);
                setFilterDate(null);
              }}
              className="btn btn-outline text-sm"
            >
              Limpiar filtros
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          <button
            onClick={() => {
              setFilterStatus(null);
              setFilterDate(null);
            }}
            className={`rounded-lg border p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              !filterStatus && !filterDate ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <MdSchedule className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#3b82f6" }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-extrabold ink">{totalDeliverables}</p>
            <p className="text-xs muted">Total</p>
          </button>
          <button
            onClick={() => {
              setFilterStatus("Completado");
              setFilterDate(null);
            }}
            className={`rounded-lg border p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterStatus === "Completado" ? "ring-2 ring-green-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
                <MdCheckCircle className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#16a34a" }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-extrabold" style={{ color: "#16a34a" }}>{completados}</p>
            <p className="text-xs muted">Completados</p>
          </button>
          <button
            onClick={() => {
              setFilterStatus("no-completado");
              setFilterDate(null);
            }}
            className={`rounded-lg border p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterStatus === "no-completado" ? "ring-2 ring-orange-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MdSchedule className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#f59e0b" }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-extrabold" style={{ color: "#f59e0b" }}>{noCompletados}</p>
            <p className="text-xs muted">No Completados</p>
          </button>
          <button
            onClick={() => {
              setFilterStatus("Pendiente");
              setFilterDate(null);
            }}
            className={`rounded-lg border p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterStatus === "Pendiente" ? "ring-2 ring-yellow-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <MdSchedule className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#f59e0b" }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-extrabold" style={{ color: "#f59e0b" }}>{pendientes}</p>
            <p className="text-xs muted">Pendientes</p>
          </button>
          <button
            onClick={() => {
              setFilterStatus("Urgente");
              setFilterDate(null);
            }}
            className={`rounded-lg border p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterStatus === "Urgente" ? "ring-2 ring-red-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-100 flex items-center justify-center">
                <MdWarning className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#ef4444" }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-extrabold" style={{ color: "#ef4444" }}>{urgentes}</p>
            <p className="text-xs muted">Urgentes</p>
          </button>
          <button
            onClick={() => {
              setFilterStatus("Vencido");
              setFilterDate(null);
            }}
            className={`rounded-lg border p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterStatus === "Vencido" ? "ring-2 ring-gray-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <MdCancel className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#6b7280" }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-extrabold" style={{ color: "#6b7280" }}>{vencidos}</p>
            <p className="text-xs muted">Vencidos</p>
          </button>
          <button
            onClick={() => {
              setFilterStatus(null);
              const today = formatDateLocal(new Date());
              setFilterDate(today);
            }}
            className={`rounded-lg border p-3 md:p-4 bg-white border-[var(--color-brand-line)] text-center transition-all hover:shadow-md hover:scale-[1.02] ${
              filterDate === formatDateLocal(new Date()) ? "ring-2 ring-orange-500" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MdWarning className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#f59e0b" }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-extrabold" style={{ color: "#f59e0b" }}>{vencenHoy}</p>
            <p className="text-xs muted">Vencen Hoy</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="flex-1">
                <h3 className="text-xl font-bold ink mb-2">{previewDeliverable.name}</h3>
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
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    placeholder="Ej: Falta información financiera, esperando aprobación, etc."
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
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-brand-red mb-6">Formatos de Entregables</h2>
        
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
                title: "Control de Costos Diario",
                description: "Formato para el registro y control diario de costos del proyecto.",
                lastUpdate: "2025-01-15",
                fileType: "excel"
              }
            ],
            "Semanales": [
              {
                title: "Programa General (ISP)",
                description: "Formato para el seguimiento del programa general de obra (ISP) semanal.",
                lastUpdate: "2025-01-25",
                fileType: "excel"
              },
              {
                title: "Curvas de Avance Hormigón",
                description: "Plantilla para el análisis de curvas de avance de hormigón semanal.",
                lastUpdate: "2025-01-28",
                fileType: "excel"
              },
              {
                title: "Curvas de Avance Enfierradura",
                description: "Formato para el análisis de curvas de avance de enfierradura semanal.",
                lastUpdate: "2025-01-27",
                fileType: "excel"
              },
              {
                title: "Análisis de Rendimiento",
                description: "Plantilla para análisis de rendimiento de partidas clave semanal.",
                lastUpdate: "2025-01-26",
                fileType: "excel"
              }
            ],
            "Quincenales": [
              {
                title: "Reporte Quincenal de Avances",
                description: "Formato quincenal para reporte consolidado de avances físicos.",
                lastUpdate: "2025-01-15",
                fileType: "excel"
              }
            ],
            "Mensuales": [
              {
                title: "ABO y REC",
                description: "Plantilla mensual para Análisis de Balance Operacional y Reporte de Ejecución de Costos.",
                lastUpdate: "2025-01-01",
                fileType: "excel"
              },
              {
                title: "EEPP Mandante (INCY Factura)",
                description: "Formato mensual para Estados de Ejecución de Presupuesto al Mandante.",
                lastUpdate: "2025-01-05",
                fileType: "pdf"
              },
              {
                title: "EEPP INGEVEC (INCY Factura)",
                description: "Formato mensual para Estados de Ejecución de Presupuesto a INGEVEC.",
                lastUpdate: "2025-01-08",
                fileType: "pdf"
              },
              {
                title: "Análisis Mano de Obra",
                description: "Plantilla mensual para análisis de mano de obra indirecta.",
                lastUpdate: "2025-01-10",
                fileType: "excel"
              },
              {
                title: "Seguimiento Seguros y Garantías",
                description: "Formato mensual para seguimiento de seguros y garantías del proyecto.",
                lastUpdate: "2025-01-12",
                fileType: "excel"
              },
              {
                title: "Reporte Mensual Análisis",
                description: "Plantilla mensual para reporte consolidado del área de análisis de datos.",
                lastUpdate: "2025-01-15",
                fileType: "excel"
              }
            ]
          };

          const tabs = Object.keys(formats);
          const currentFormats = formats[tabs[activeFormatTab]] || [];

          return (
            <>
              {/* Tabs Navigation */}
              <div className="flex flex-wrap gap-2 mb-6 border-b pb-4" style={{ borderColor: "var(--color-brand-line)" }}>
                {tabs.map((tab, idx) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFormatTab(idx)}
                    className={`btn ${
                      activeFormatTab === idx ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {tab} ({formats[tab].length})
                  </button>
                ))}
              </div>

              {/* Format Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentFormats.map((format, idx) => {
                  const getFileIcon = () => {
                    if (format.fileType === "excel") {
                      return <MdOutlineTableChart className="w-5 h-5 md:w-6 md:h-6 text-green-600" />;
                    } else {
                      return <MdPictureAsPdf className="w-5 h-5 md:w-6 md:h-6 text-red-600" />;
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
      <DocumentManager title="Documentos del Área de Análisis de Datos" />
    </div>
  );
}
