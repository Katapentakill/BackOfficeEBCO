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
  MdArrowForward
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
}

export default function DeliverablesCalendar({ deliverables }: DeliverablesCalendarProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState(new Date());

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

  const getDaysUntilDue = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const filteredDeliverables = selectedPeriod === "all" 
    ? deliverables 
    : deliverables.filter(d => d.period === selectedPeriod);

  const sortedDeliverables = [...filteredDeliverables].sort((a, b) => {
    const daysA = getDaysUntilDue(a.dueDate);
    const daysB = getDaysUntilDue(b.dueDate);
    return daysA - daysB;
  });

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
                        const dateStr = day.toISOString().split('T')[0];
                        const dayDeliverablesCount = filteredDeliverables.filter(d => d.dueDate === dateStr).length;
                        const isCurrentMonth = day.getMonth() === month;
                        const isToday = day.toDateString() === new Date().toDateString();

                        return (
                          <div
                            key={index}
                            className={`aspect-square border rounded text-center flex flex-col items-center justify-center text-xs transition-colors cursor-pointer hover:bg-brand-bg-light ${
                              !isCurrentMonth ? 'opacity-30' : ''
                            } ${isToday ? 'bg-blue-100 border-blue-400 font-bold' : ''} ${dayDeliverablesCount > 0 ? 'bg-yellow-50' : ''}`}
                            style={{ 
                              borderColor: isToday ? "#3b82f6" : "var(--color-brand-line)",
                            }}
                            title={`${day.getDate()} - ${dayDeliverablesCount} entregables`}
                          >
                            <span className={isToday ? 'text-blue-600' : 'ink'}>
                              {day.getDate()}
                            </span>
                            {dayDeliverablesCount > 0 && (
                              <span className="text-xs" style={{ color: "var(--color-brand-red)" }}>
                                •{dayDeliverablesCount}
                              </span>
                            )}
                          </div>
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
              <h3 className="text-lg font-bold ink flex items-center gap-2">
                <MdCalendarMonth className="w-5 h-5 text-brand-red" />
                Entregables ({filteredDeliverables.length})
              </h3>
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
                    const daysUntil = getDaysUntilDue(deliverable.dueDate);
                    const isUrgent = daysUntil <= 2 && deliverable.status !== "Completado";
                    const isOverdue = daysUntil < 0;

                    return (
                      <div
                        key={deliverable.id}
                        className={`border rounded-lg p-4 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
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
                        </div>
                        <h4 className="text-base font-bold ink mb-3">{deliverable.name}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 muted">
                            <MdToday className="w-4 h-4 flex-shrink-0" />
                            <span>{new Date(deliverable.dueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
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
                        {deliverable.progress !== undefined && (
                          <div className="mt-4 pt-3 border-t" style={{ borderColor: "var(--color-brand-line)" }}>
                            <div className="flex items-center justify-between text-xs mb-2">
                              <span className="muted font-medium">Progreso</span>
                              <span className="font-bold" style={{ color: deliverable.progress === 100 ? "#16a34a" : "#3b82f6" }}>
                                {deliverable.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{
                                  width: `${deliverable.progress}%`,
                                  background: deliverable.progress === 100 ? "#16a34a" : "#3b82f6"
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

