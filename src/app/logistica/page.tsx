"use client";

import { MdLocalShipping, MdWarehouse, MdCheckCircle, MdSchedule, MdWarning, MdCancel } from "react-icons/md";
import InfoCard from "@/components/ui/InfoCard";
import Tabs from "@/components/ui/Tabs";
import DocumentManager from "@/components/ui/DocumentManager";
import DeliverablesCalendar from "@/components/ui/DeliverablesCalendar";

export default function LogisticaPage() {
  const logisticaMaterialesDiarios = [
    { name: "Coordinación de despachos" },
    { name: "Control Hormigones" },
    { name: "Control pérdida de hormigones" },
    { name: "Contratos y HES" },
  ];

  const serviciosArriendosItems = [
    { name: "Control de arriendos" },
    { name: "Estado de equipos" },
  ];

  const tabs = [
    { label: "Diarios", items: logisticaMaterialesDiarios },
    { label: "Semanales", items: serviciosArriendosItems },
    { label: "Quincenales", items: [] },
    { label: "Mensuales", items: [] },
  ];

  // Entregables con fechas y estados
  const deliverables = [
    {
      id: "1",
      name: "Coordinación de despachos",
      period: "Diario" as const,
      dueDate: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Pendiente" as const,
      assignedTo: "M. Pérez",
      progress: 60
    },
    {
      id: "2",
      name: "Control Hormigones",
      period: "Diario" as const,
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Urgente" as const,
      assignedTo: "C. González",
      progress: 30
    },
    {
      id: "3",
      name: "Control pérdida de hormigones",
      period: "Diario" as const,
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Vencido" as const,
      assignedTo: "J. Ramírez",
      progress: 45
    },
    {
      id: "4",
      name: "Contratos y HES",
      period: "Diario" as const,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Completado" as const,
      assignedTo: "A. Silva",
      progress: 100
    },
    {
      id: "5",
      name: "Control de arriendos",
      period: "Semanal" as const,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Urgente" as const,
      assignedTo: "L. Torres",
      progress: 75
    },
    {
      id: "6",
      name: "Estado de equipos",
      period: "Semanal" as const,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Pendiente" as const,
      assignedTo: "M. Pérez",
      progress: 0
    },
    {
      id: "7",
      name: "Reporte Mensual Logística",
      period: "Mensual" as const,
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Pendiente" as const,
      assignedTo: "C. González",
      progress: 20
    }
  ];

  // Calcular KPIs
  const totalDeliverables = deliverables.length;
  const completados = deliverables.filter(d => d.status === "Completado").length;
  const pendientes = deliverables.filter(d => d.status === "Pendiente").length;
  const urgentes = deliverables.filter(d => d.status === "Urgente").length;
  const vencidos = deliverables.filter(d => d.status === "Vencido").length;

  const today = new Date();
  const vencenHoy = deliverables.filter(d => {
    const due = new Date(d.dueDate);
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 && d.status !== "Completado";
  }).length;

  return (
    <div className="p-8">
      {/* Header Banner */}
      <div className="bg-brand-red text-brand-text-light py-8 px-8 rounded-lg mb-12">
        <h1 className="text-4xl font-bold">ÁREA LOGÍSTICA</h1>
        <p className="text-lg mt-2 opacity-90">Gestión de materiales y servicios de arriendo</p>
      </div>

      {/* KPIs Dashboard */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold ink mb-6">Indicadores de Entregables</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="rounded-lg border p-4 bg-white border-[var(--color-brand-line)] text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <MdSchedule className="w-6 h-6" style={{ color: "#3b82f6" }} />
              </div>
            </div>
            <p className="text-2xl font-extrabold ink">{totalDeliverables}</p>
            <p className="text-xs muted">Total</p>
          </div>
          <div className="rounded-lg border p-4 bg-white border-[var(--color-brand-line)] text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <MdCheckCircle className="w-6 h-6" style={{ color: "#16a34a" }} />
              </div>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "#16a34a" }}>{completados}</p>
            <p className="text-xs muted">Completados</p>
          </div>
          <div className="rounded-lg border p-4 bg-white border-[var(--color-brand-line)] text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <MdSchedule className="w-6 h-6" style={{ color: "#f59e0b" }} />
              </div>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "#f59e0b" }}>{pendientes}</p>
            <p className="text-xs muted">Pendientes</p>
          </div>
          <div className="rounded-lg border p-4 bg-white border-[var(--color-brand-line)] text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <MdWarning className="w-6 h-6" style={{ color: "#ef4444" }} />
              </div>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "#ef4444" }}>{urgentes}</p>
            <p className="text-xs muted">Urgentes</p>
          </div>
          <div className="rounded-lg border p-4 bg-white border-[var(--color-brand-line)] text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <MdCancel className="w-6 h-6" style={{ color: "#6b7280" }} />
              </div>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "#6b7280" }}>{vencidos}</p>
            <p className="text-xs muted">Vencidos</p>
          </div>
          <div className="rounded-lg border p-4 bg-white border-[var(--color-brand-line)] text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MdWarning className="w-6 h-6" style={{ color: "#f59e0b" }} />
              </div>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "#f59e0b" }}>{vencenHoy}</p>
            <p className="text-xs muted">Vencen Hoy</p>
          </div>
        </div>
      </section>

      {/* Calendar/Entregables View */}
      <DeliverablesCalendar deliverables={deliverables} />

      {/* Sub-areas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-brand-red mb-6">Subáreas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<MdWarehouse size={40} />}
            title="Logística Materiales"
            description="Se encarga de la planificación, control y abastecimiento de materiales generales de obra. Asegura que los insumos (ferretería, hormigones, fierros, herramientas) estén disponibles en tiempo y forma, evitando pérdidas, desabastecimiento y retrasos en las faenas."
            buttonText="Ver detalles"
            buttonLink="#"
          />
          <InfoCard
            icon={<MdLocalShipping size={40} />}
            title="Servicios y Arriendos"
            description="Gestiona los servicios externos y equipos arrendados para la obra. Moldajes, andamios, maquinarias y otros contratos de arriendo. Su foco está en el control de uso, costos y tiempos de arriendo, además de la administración de contratos y documentos asociados."
            buttonText="Ver detalles"
            buttonLink="#"
          />
        </div>
      </section>

      {/* Deliverables */}
      <Tabs
        title="Entregables por Periodicidad - Logística"
        tabs={tabs}
      />

      {/* Document Manager */}
      <DocumentManager title="Documentos del Área Logística" />
    </div>
  );
}
