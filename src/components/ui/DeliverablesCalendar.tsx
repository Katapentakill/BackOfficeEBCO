"use client";

import { useState } from "react";
import { 
  MdCheckCircle, 
  MdSchedule, 
  MdWarning, 
  MdCancel,
  MdToday,
  MdCalendarMonth,
  MdArrowBack,
  MdArrowForward,
  MdVisibility,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdAdd,
  MdClose,
  MdPerson
} from "react-icons/md";

interface Deliverable {
  id: string;
  name: string;
  period: "Diario" | "Semanal" | "Quincenal" | "Mensual";
  dueDate: string;
  status: "Completado" | "Pendiente" | "Urgente" | "Vencido";
  assignedTo: string;
  progress?: number;
}

interface DeliverablesCalendarProps {
  deliverables: Deliverable[];
  filterStatus?: string | null;
  filterDate?: string | null;
  onDateSelect?: (date: string | null) => void;
  onUpdateProgress?: (id: string, progress: number) => void;
  onPreview?: (deliverable: Deliverable) => void;
  onCreateDeliverable?: (deliverable: Omit<Deliverable, "id"> & { lastCompletedDate?: string }) => void;
}

export default function DeliverablesCalendar({ 
  deliverables, 
  filterStatus = null,
  filterDate = null,
  onDateSelect,
  onUpdateProgress,
  onPreview,
  onCreateDeliverable
}: DeliverablesCalendarProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Helper function to format date as YYYY-MM-DD in local timezone
  const formatDateLocal = (date: Date): string => {
    // Asegurar que trabajamos con la fecha local, no UTC
    // Normalizar la fecha para evitar problemas de zona horaria
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [createForm, setCreateForm] = useState({
    name: "",
    period: "Diario" as "Diario" | "Semanal" | "Quincenal" | "Mensual",
    dueDate: formatDateLocal(new Date()),
    assignedTo: "",
    progress: 0 // Mantenemos esto para compatibilidad pero no se mostrará
  });

  const periods = ["all", "Diario", "Semanal", "Quincenal", "Mensual"];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return { bg: "#dcfce7", color: "#16a34a", border: "#bbf7d0", icon: <MdCheckCircle className="w-4 h-4" /> };
      case "Pendiente":
        return { bg: "#fef3c7", color: "#f59e0b", border: "#fde68a", icon: <MdSchedule className="w-4 h-4" /> };
      case "Urgente":
        return { bg: "#fee2e2", color: "#ef4444", border: "#fecaca", icon: <MdWarning className="w-4 h-4" /> };
      case "Vencido":
        return { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb", icon: <MdCancel className="w-4 h-4" /> };
      default:
        return { bg: "#f1f5f9", color: "#64748b", border: "#e2e8f0", icon: <MdSchedule className="w-4 h-4" /> };
    }
  };

  // Helper function to subtract one day from a date string YYYY-MM-DD
  const subtractOneDay = (dateStr: string): string => {
    const date = new Date(dateStr + 'T12:00:00'); // Usar mediodía para evitar problemas de zona horaria
    date.setDate(date.getDate() - 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDaysUntilDue = (dueDate: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate + 'T00:00:00');
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // Filter by period
  let filteredByPeriod = selectedPeriod === "all" 
    ? deliverables 
    : deliverables.filter(d => d.period === selectedPeriod);

  // Filter by status (from KPI click)
  let filteredByStatus = filterStatus 
    ? filterStatus === "no-completado"
      ? filteredByPeriod.filter(d => d.status !== "Completado")
      : filteredByPeriod.filter(d => d.status === filterStatus)
    : filteredByPeriod;

  // Función helper para sumar un día a una fecha en formato YYYY-MM-DD
  const addOneDay = (dateStr: string): string => {
    const date = new Date(dateStr + 'T12:00:00'); // Usar mediodía para evitar problemas de zona horaria
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Filter by date (from calendar click)
  let filteredByDate = filterDate
    ? filteredByStatus.filter(d => {
        // Normalizar ambas fechas para comparación exacta
        const deliverableDate = d.dueDate.trim();
        const filterDateNormalized = filterDate.trim();
        
        // Los entregables se guardan con un día menos de la fecha seleccionada.
        // Si el usuario selecciona el día 5, el entregable se guarda como día 4.
        // Entonces, cuando se filtra por el día 5, buscamos entregables guardados como día 4.
        // Esto evita duplicaciones: cada entregable solo aparece una vez.
        const dayBeforeFilter = subtractOneDay(filterDateNormalized);
        
        // Buscar solo entregables guardados como día anterior (fecha ajustada al crear)
        return deliverableDate === dayBeforeFilter;
      })
    : filteredByStatus;

  const filteredDeliverables = filteredByDate;

  const sortedDeliverables = [...filteredDeliverables].sort((a, b) => {
    const daysA = getDaysUntilDue(a.dueDate);
    const daysB = getDaysUntilDue(b.dueDate);
    return daysA - daysB;
  });

  // Get all deliverables for calendar highlighting (not filtered)
  const allDeliverablesForCalendar = selectedPeriod === "all"
    ? deliverables
    : deliverables.filter(d => d.period === selectedPeriod);

  const handleDateClick = (dateStr: string) => {
    if (onDateSelect) {
      // Normalizar la fecha antes de pasarla
      const normalizedDate = dateStr.trim();
      // Toggle: if clicking the same date, deselect it
      const currentFilterDate = filterDate ? filterDate.trim() : null;
      if (currentFilterDate === normalizedDate) {
        onDateSelect(null);
      } else {
        // Llamar siempre para asegurar que el estado se actualice
        // Forzar actualización pasando siempre la fecha normalizada
        onDateSelect(normalizedDate);
      }
    }
  };

  return (
    <div className="mb-12">
      {/* Period Filter */}
      <div className="bg-white border rounded-lg p-4 mb-6" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold ink">Filtrar por período:</span>
          {periods.map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? "bg-brand text-white"
                  : "bg-brand-bg-light text-brand-text-dark hover:bg-gray-200"
              }`}
            >
              {period === "all" ? "Todos" : period}
            </button>
          ))}
        </div>
      </div>

      {/* Layout: Calendar + Deliverables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mini Calendar - Left Side */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg overflow-hidden sticky top-4" style={{ borderColor: "var(--color-brand-line)" }}>
            <div className="p-4 border-b bg-brand-bg-light" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold ink">Calendario</h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      const prev = new Date(selectedMonth);
                      prev.setMonth(prev.getMonth() - 1);
                      setSelectedMonth(prev);
                    }}
                    className="p-1 rounded hover:bg-white"
                    title="Mes anterior"
                  >
                    <MdArrowBack className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      const next = new Date(selectedMonth);
                      next.setMonth(next.getMonth() + 1);
                      setSelectedMonth(next);
                    }}
                    className="p-1 rounded hover:bg-white"
                    title="Mes siguiente"
                  >
                    <MdArrowForward className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs font-semibold ink text-center">
                {selectedMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="p-3">
              {(() => {
                const year = selectedMonth.getFullYear();
                const month = selectedMonth.getMonth();
                const firstDay = new Date(year, month, 1);
                const lastDay = new Date(year, month + 1, 0);
                const startDate = new Date(firstDay);
                startDate.setDate(startDate.getDate() - startDate.getDay());
                const endDate = new Date(lastDay);
                endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
                
                const days: Date[] = [];
                const current = new Date(startDate);
                while (current <= endDate) {
                  days.push(new Date(current));
                  current.setDate(current.getDate() + 1);
                }

                const dayNames = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

                return (
                  <div>
                    {/* Days of week header */}
                    <div className="grid grid-cols-7 gap-1 mb-1">
                      {dayNames.map(day => (
                        <div key={day} className="text-center text-xs font-semibold muted py-1">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar days grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day, index) => {
                        // Normalizar el día para evitar problemas de zona horaria
                        const normalizedDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());
                        const dateStr = formatDateLocal(normalizedDay);
                        // Use all deliverables for calendar highlighting (not filtered ones)
                        // Normalizar también las fechas de los entregables para comparación exacta
                        // Los entregables se guardan con un día menos de la fecha seleccionada,
                        // entonces si el usuario selecciona el día 5 y crea un entregable,
                        // se guarda como día 4. Para mostrar en el calendario, buscamos entregables
                        // guardados como día anterior (porque se restó un día al crear)
                        const dayBefore = subtractOneDay(dateStr.trim());
                        const dayDeliverables = allDeliverablesForCalendar.filter(d => {
                          const deliverableDate = d.dueDate.trim();
                          // Buscar solo entregables que coincidan con el día anterior (fecha ajustada)
                          // Esto evita duplicaciones: cada entregable solo aparece en un día
                          return deliverableDate === dayBefore;
                        });
                        const dayDeliverablesCount = dayDeliverables.length;
                        
                        // Get status distribution for better visual feedback
                        const hasUrgent = dayDeliverables.some(d => d.status === "Urgente" || d.status === "Vencido");
                        const hasCompleted = dayDeliverables.some(d => d.status === "Completado");
                        const hasPending = dayDeliverables.some(d => d.status === "Pendiente");
                        
                        const isCurrentMonth = day.getMonth() === month;
                        const isToday = day.toDateString() === new Date().toDateString();
                        const isSelected = filterDate === dateStr;
                        const hasDeliverables = dayDeliverablesCount > 0;

                        // Determine background color based on status
                        let bgColor = "white";
                        let borderColor = "var(--color-brand-line)";
                        let borderWidth = "1px";
                        
                        if (isSelected) {
                          bgColor = "#fef3c7";
                          borderColor = "#f59e0b";
                          borderWidth = "2px";
                        } else if (isToday) {
                          bgColor = "#dbeafe";
                          borderColor = "#3b82f6";
                          borderWidth = "2px";
                        } else if (hasUrgent) {
                          bgColor = "#fee2e2";
                          borderColor = "#ef4444";
                        } else if (hasPending) {
                          bgColor = "#fef3c7";
                          borderColor = "#f59e0b";
                        } else if (hasCompleted) {
                          bgColor = "#dcfce7";
                          borderColor = "#16a34a";
                        } else if (hasDeliverables) {
                          bgColor = "#fef9c3";
                          borderColor = "#fbbf24";
                        }

                        return (
                          <button
                            key={index}
                            onClick={(e) => {
                              if (e.shiftKey && onCreateDeliverable) {
                                // Shift + Click para crear entregable en esta fecha
                                // Usar la fecha normalizada
                                setCreateForm(prev => ({ ...prev, dueDate: dateStr.trim() }));
                                setShowCreateModal(true);
                              } else {
                                // Pasar la fecha normalizada al handler
                                handleDateClick(dateStr.trim());
                              }
                            }}
                            className={`aspect-square border rounded text-center flex flex-col items-center justify-center text-xs transition-all hover:scale-110 hover:shadow-md ${
                              !isCurrentMonth ? 'opacity-30' : ''
                            }`}
                            style={{ 
                              borderColor: borderColor,
                              borderWidth: borderWidth,
                              background: bgColor,
                            }}
                            title={`${day.getDate()} - ${dayDeliverablesCount} entregable${dayDeliverablesCount !== 1 ? 's' : ''}${isSelected ? ' (seleccionado)' : ''}${onCreateDeliverable ? ' • Shift+Click para crear' : ''}`}
                          >
                            <span className={isToday ? 'text-blue-600 font-bold' : isSelected ? 'text-orange-600 font-bold' : 'ink'}>
                              {day.getDate()}
                            </span>
                            {hasDeliverables && (
                              <span 
                                className="text-xs font-bold" 
                                style={{ 
                                  color: hasUrgent ? "#ef4444" : hasPending ? "#f59e0b" : "#16a34a" 
                                }}
                              >
                                •{dayDeliverablesCount}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Deliverables Cards Grid - Right Side */}
        <div className="lg:col-span-3">

          <div className="bg-white border rounded-lg overflow-hidden" style={{ borderColor: "var(--color-brand-line)" }}>
            <div className="p-4 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold ink flex items-center gap-2">
                  <MdCalendarMonth className="w-5 h-5 text-brand-red" />
                  Entregables ({filteredDeliverables.length})
                </h3>
                {onCreateDeliverable && (
                  <button
                    onClick={() => {
                      // Si hay una fecha seleccionada, usarla como fecha por defecto
                      if (filterDate) {
                        // Normalizar la fecha antes de establecerla
                        setCreateForm(prev => ({ ...prev, dueDate: filterDate.trim() }));
                      }
                      setShowCreateModal(true);
                    }}
                    className="btn btn-primary flex items-center gap-2 text-sm"
                  >
                    <MdAdd size={18} />
                    <span>Crear Entregable</span>
                  </button>
                )}
                {(filterStatus || filterDate) && (
                  <div className="flex items-center gap-2">
                    {filterStatus && (
                      <span className="chip text-xs" style={{ background: "#fef3c7", color: "#f59e0b", border: "1px solid #fde68a" }}>
                        {filterStatus === "no-completado" ? "No Completados" : filterStatus}
                      </span>
                    )}
                    {filterDate && (
                      <span className="chip text-xs" style={{ background: "#dbeafe", color: "#3b82f6", border: "1px solid #bfdbfe" }}>
                        {(() => {
                          // Formatear la fecha de manera segura, usando el formato YYYY-MM-DD directamente
                          try {
                            const dateParts = filterDate.trim().split('-');
                            if (dateParts.length === 3) {
                              const year = parseInt(dateParts[0]);
                              const month = parseInt(dateParts[1]) - 1; // Los meses son 0-indexed
                              const day = parseInt(dateParts[2]);
                              const date = new Date(year, month, day);
                              return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                            }
                            // Fallback si el formato no es el esperado
                            return new Date(filterDate + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                          } catch (e) {
                            return filterDate; // Mostrar la fecha tal cual si hay error
                          }
                        })()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Deliverables as Cards/Buttons Grid */}
            <div className="p-6">
              {filteredDeliverables.length === 0 ? (
                <div className="text-center py-12">
                  <MdSchedule className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm muted">No hay entregables para este período</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {sortedDeliverables.map((deliverable) => {
                    const statusStyle = getStatusColor(deliverable.status);
                    
                    // Si hay un filtro de fecha activo y el entregable coincide, usar la fecha del filtro
                    // para calcular los días restantes, así coinciden con la fecha del calendario
                    let dateToUseForCalculation = deliverable.dueDate;
                    if (filterDate) {
                      const deliverableDate = deliverable.dueDate.trim();
                      const filterDateNormalized = filterDate.trim();
                      const dayBeforeFilter = subtractOneDay(filterDateNormalized);
                      
                      // Si el entregable coincide con el filtro (guardado como día anterior),
                      // usar la fecha del filtro para el cálculo
                      if (deliverableDate === dayBeforeFilter) {
                        dateToUseForCalculation = filterDateNormalized;
                      }
                    }
                    
                    const daysUntil = getDaysUntilDue(dateToUseForCalculation);
                    const isUrgent = daysUntil <= 2 && deliverable.status !== "Completado";
                    const isOverdue = daysUntil < 0;

                    const isCompleted = deliverable.status === "Completado";

                    return (
                      <div
                        key={deliverable.id}
                        className={`border rounded-lg p-4 transition-all hover:shadow-lg hover:-translate-y-1 ${
                          isUrgent || isOverdue ? "border-l-4 shadow-md" : ""
                        }`}
                        style={{
                          borderColor: isOverdue ? "#ef4444" : isUrgent ? "#f59e0b" : "var(--color-brand-line)",
                          borderLeftColor: isOverdue ? "#ef4444" : isUrgent ? "#f59e0b" : "var(--color-brand-line)",
                          background: isUrgent || isOverdue ? (isOverdue ? "#fef2f2" : "#fff7ed") : "white",
                          borderLeftWidth: isUrgent || isOverdue ? "4px" : "1px"
                        }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2 flex-wrap flex-1">
                            <span
                              className="chip flex items-center gap-1"
                              style={{
                                background: statusStyle.bg,
                                color: statusStyle.color,
                                border: `1px solid ${statusStyle.border}`
                              }}
                            >
                              {statusStyle.icon}
                              {deliverable.status}
                            </span>
                            <span className="chip" style={{ background: "#e0e7ff", color: "#6366f1", border: "1px solid #c7d2fe" }}>
                              {deliverable.period}
                            </span>
                          </div>
                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {onPreview && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onPreview(deliverable);
                                }}
                                className="p-2 rounded hover:bg-blue-50 transition-colors"
                                title="Ver detalles"
                              >
                                <MdVisibility className="w-5 h-5" style={{ color: "#3b82f6" }} />
                              </button>
                            )}
                            {onUpdateProgress && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Toggle entre completado y no completado (100 o 0)
                                  const newProgress = isCompleted ? 0 : 100;
                                  onUpdateProgress(deliverable.id, newProgress);
                                }}
                                className="p-2 rounded hover:bg-green-50 transition-colors"
                                title={isCompleted ? "Marcar como no completado" : "Marcar como completado"}
                              >
                                {isCompleted ? (
                                  <MdCheckBox className="w-5 h-5" style={{ color: "#16a34a" }} />
                                ) : (
                                  <MdCheckBoxOutlineBlank className="w-5 h-5 text-gray-400" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                        <h4 className="text-base font-bold ink mb-3">{deliverable.name}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 muted">
                            <MdToday className="w-4 h-4 flex-shrink-0" />
                            <span>
                              {(() => {
                                // Si hay un filtro de fecha activo y el entregable coincide con ese filtro,
                                // mostrar la fecha del filtro (la fecha seleccionada en el calendario)
                                // en lugar de la fecha guardada (que es un día menos)
                                if (filterDate) {
                                  const deliverableDate = deliverable.dueDate.trim();
                                  const filterDateNormalized = filterDate.trim();
                                  const dayBeforeFilter = subtractOneDay(filterDateNormalized);
                                  
                                  // Si el entregable coincide con el filtro (guardado como día anterior),
                                  // mostrar la fecha del filtro para que coincida con el calendario
                                  if (deliverableDate === dayBeforeFilter) {
                                    const dateParts = filterDateNormalized.split('-');
                                    if (dateParts.length === 3) {
                                      const year = parseInt(dateParts[0]);
                                      const month = parseInt(dateParts[1]) - 1;
                                      const day = parseInt(dateParts[2]);
                                      const date = new Date(year, month, day);
                                      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
                                    }
                                  }
                                }
                                // Si no hay filtro o no coincide, mostrar la fecha guardada del entregable
                                return new Date(deliverable.dueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
                              })()}
                            </span>
                          </div>
                          <div className={`font-semibold ${
                            isOverdue ? 'text-red-600' : 
                            daysUntil === 0 ? 'text-orange-600' : 
                            daysUntil <= 2 ? 'text-orange-500' : 'muted'
                          }`}>
                            {isOverdue 
                              ? `⚠️ ${Math.abs(daysUntil)} días vencidos`
                              : daysUntil === 0 
                              ? "⚠️ Vence hoy - URGENTE"
                              : daysUntil <= 2
                              ? `⚠️ ${daysUntil} días restantes`
                              : `${daysUntil} días restantes`
                            }
                          </div>
                          <div className="flex items-center gap-2 muted">
                            <span className="font-medium">👤 {deliverable.assignedTo}</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t" style={{ borderColor: "var(--color-brand-line)" }}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs muted font-medium">Estado:</span>
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded ${
                                isCompleted
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {isCompleted ? "✓ Completado" : "○ No completado"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Deliverable Modal */}
      {showCreateModal && onCreateDeliverable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <div>
                <h3 className="text-xl font-bold ink">Crear Nuevo Entregable</h3>
                <p className="text-xs text-muted mt-1">Completa la información del entregable</p>
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
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold ink mb-2">Nombre del Entregable</label>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  placeholder="Ej: Control Hormigones"
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand-red)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(227,6,19,.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--color-brand-line)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Period */}
              <div>
                <label className="block text-sm font-semibold ink mb-2">Periodicidad</label>
                <select
                  value={createForm.period}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, period: e.target.value as any }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand-red)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(227,6,19,.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--color-brand-line)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="Diario">Diario</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Quincenal">Quincenal</option>
                  <option value="Mensual">Mensual</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-semibold ink mb-2">Fecha de Vencimiento</label>
                <input
                  type="date"
                  value={createForm.dueDate}
                  onChange={(e) => {
                    // Asegurar que la fecha se mantenga en formato YYYY-MM-DD normalizada
                    const selectedDate = e.target.value;
                    if (selectedDate) {
                      // Normalizar: extraer solo YYYY-MM-DD sin hora ni espacios
                      const normalizedDate = selectedDate.trim().split('T')[0];
                      setCreateForm(prev => ({ ...prev, dueDate: normalizedDate }));
                    }
                  }}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand-red)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(227,6,19,.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--color-brand-line)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Assigned To */}
              <div>
                <label className="block text-sm font-semibold ink mb-2">Asignado a</label>
                <input
                  type="text"
                  value={createForm.assignedTo}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, assignedTo: e.target.value }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  placeholder="Ej: M. Pérez"
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand-red)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(227,6,19,.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--color-brand-line)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>


              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (createForm.name && createForm.assignedTo) {
                      // Asegurar que la fecha esté en formato YYYY-MM-DD sin hora y normalizada
                      // Eliminar cualquier parte de tiempo y espacios
                      const dueDateStr = createForm.dueDate.trim().split('T')[0];
                      
                      onCreateDeliverable({
                        name: createForm.name,
                        period: createForm.period,
                        dueDate: dueDateStr, // Fecha normalizada YYYY-MM-DD
                        assignedTo: createForm.assignedTo,
                        status: "Pendiente" as const,
                        progress: 0,
                        lastCompletedDate: undefined
                      });
                      setCreateForm({
                        name: "",
                        period: "Diario",
                        dueDate: formatDateLocal(new Date()),
                        assignedTo: "",
                        progress: 0
                      });
                      setShowCreateModal(false);
                    } else {
                      alert("Por favor completa todos los campos obligatorios");
                    }
                  }}
                  className="btn btn-primary flex-1"
                >
                  Crear Entregable
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

