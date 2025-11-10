"use client";

import {
  MdLocalShipping,
  MdOutlineTrendingUp,
  MdOutlineInventory,
  MdOutlineWarningAmber,
  MdAssignmentTurnedIn,
  MdOutlineFileDownload,
  MdOutlineAccessTime,
  MdOutlineCalendarToday,
} from "react-icons/md";

const logisticsKpis = [
  {
    label: "Cumplimiento despachos",
    value: "92%",
    detail: "Semana 07",
    color: "#16a34a",
    background: "#dcfce7",
  },
  {
    label: "Stock crítico",
    value: "6 ítems",
    detail: "Hormigón / acero",
    color: "#ef4444",
    background: "#fee2e2",
  },
  {
    label: "Contratos arriendo",
    value: "28",
    detail: "4 por renovar",
    color: "#2563eb",
    background: "#dbeafe",
  },
  {
    label: "Incidentes logísticos",
    value: "1",
    detail: "Últimos 30 días",
    color: "#f97316",
    background: "#ffedd5",
  },
];

const deliveryPerformance = [
  { day: "Lun", value: 88 },
  { day: "Mar", value: 95 },
  { day: "Mié", value: 90 },
  { day: "Jue", value: 97 },
  { day: "Vie", value: 94 },
];

const inventoryStatus = [
  { warehouse: "Bodega Central", capacity: 78, alert: "Acero corrugado" },
  { warehouse: "Planta Norte", capacity: 64, alert: "Hormigón H30" },
  { warehouse: "Bodega Sur", capacity: 71, alert: "Tubos PVC" },
];

const supplierMatrix = [
  {
    supplier: "Aceros Andes",
    compliance: "95%",
    leadTime: "7 días",
    next: "26 feb",
    comment: "Se aplica incentivo puntualidad",
  },
  {
    supplier: "Hormigones Río",
    compliance: "88%",
    leadTime: "2 días",
    next: "24 feb",
    comment: "Turno nocturno en evaluación",
  },
  {
    supplier: "RentalPro Andamios",
    compliance: "91%",
    leadTime: "5 días",
    next: "22 feb",
    comment: "Revisión de tarifa trimestral",
  },
];

const upcomingTasks = [
  {
    task: "Auditoría inventario mensual",
    date: "25 feb",
    owner: "Bodega Central",
  },
  {
    task: "Renovación contratos equipos elevación",
    date: "28 feb",
    owner: "Administración",
  },
  {
    task: "Entrega extraordinaria hormigón",
    date: "02 mar",
    owner: "Compras",
  },
];

const logisticsReports = [
  {
    title: "Informe abastecimiento semanal",
    owner: "Equipo Compras",
    link: "#",
  },
  {
    title: "Panel stock bodegas",
    owner: "Logística",
    link: "#",
  },
  {
    title: "Seguimiento contratos arriendo",
    owner: "Administración",
    link: "#",
  },
];

export default function DashboardLogisticaPage() {
  return (
    <div className="space-y-10">
      <section className="bg-white border rounded-3xl p-8 shadow-sm grid gap-6 md:grid-cols-[2fr,1.2fr]" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="space-y-4">
          <span className="inline-block px-4 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-red/10 text-brand-red rounded-full">
            Logística & Supply Chain
          </span>
          <h1 className="text-3xl font-bold ink leading-snug">Control ejecutivo de abastecimiento y bodegas</h1>
          <p className="text-sm text-gray-600 max-w-xl">
            Indicadores semanales con foco en cumplimiento de despachos, stock crítico y desempeño de proveedores clave.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Entregas coordinadas</span>
              <p className="text-lg font-semibold ink">152 (últimos 7 días)</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Alertas activas</span>
              <p className="text-lg font-semibold text-amber-600">4 en seguimiento</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Uso bodegas</span>
              <p className="text-lg font-semibold text-brand-red">71% promedio</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">Último incidente</span>
              <p className="text-lg font-semibold ink">15 días atrás</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {logisticsKpis.map((card) => (
            <div key={card.label} className="rounded-2xl p-4 border bg-white" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wide text-gray-400">{card.label}</span>
                <span className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: card.background, color: card.color }}>
                  <MdOutlineTrendingUp className="w-5 h-5" />
                </span>
              </div>
              <p className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</p>
              <p className="text-xs text-gray-600 mt-2">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="bg-white border rounded-3xl p-6 space-y-5" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <MdLocalShipping className="w-5 h-5 text-brand-red" /> Performance entregas (últimos 5 días)
            </div>
            <span className="text-xs text-gray-500">Meta ≥ 90%</span>
          </div>
          <div className="h-40 flex items-end gap-3">
            {deliveryPerformance.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-10 rounded-t-lg bg-gradient-to-br from-brand-red to-brand"
                  style={{ height: `${Math.max(item.value, 30)}px` }}
                  title={`${item.value}%`}
                ></div>
                <span className="text-xs text-gray-500">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-3xl p-6 space-y-5" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <MdOutlineWarningAmber className="w-5 h-5 text-amber-500" /> Alertas de inventario
          </div>
          <div className="space-y-3">
            {inventoryStatus.map((item) => (
              <div key={item.warehouse} className="border rounded-xl p-4" style={{ borderColor: "var(--color-brand-line)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold ink">{item.warehouse}</span>
                  <span className="text-xs text-gray-500">{item.capacity}% ocupación</span>
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-brand-red" style={{ width: `${item.capacity}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Alerta: {item.alert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold ink">Desempeño cadena suministro</h2>
            <span className="text-xs text-gray-500">Ranking proveedores críticos</span>
          </div>
          <div className="space-y-3">
            {supplierMatrix.map((supplier) => (
              <div key={supplier.supplier} className="border rounded-xl p-4 flex flex-col gap-2" style={{ borderColor: "var(--color-brand-line)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold ink">{supplier.supplier}</span>
                  <span className="text-xs text-gray-500">Cumplimiento {supplier.compliance}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MdOutlineCalendarToday className="w-4 h-4" /> Próx. entrega: {supplier.next}</span>
                  <span>Lead time {supplier.leadTime}</span>
                </div>
                <p className="text-xs text-gray-600">{supplier.comment}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <MdOutlineAccessTime className="w-5 h-5 text-brand-red" /> Próximas tareas
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.task} className="border rounded-xl p-4" style={{ borderColor: "var(--color-brand-line)" }}>
                <p className="text-sm font-semibold ink">{task.task}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                  <MdOutlineCalendarToday className="w-4 h-4" /> {task.date}
                  <span>Responsable: {task.owner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border rounded-3xl p-6 space-y-4" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
          <MdAssignmentTurnedIn className="w-5 h-5 text-brand-red" /> Reportes disponibles para gerencia
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {logisticsReports.map((report) => (
            <button
              key={report.title}
              className="border rounded-xl p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              style={{ borderColor: "var(--color-brand-line)" }}
            >
              <div>
                <p className="text-sm font-semibold ink">{report.title}</p>
                <p className="text-xs text-gray-500">Equipo responsable: {report.owner}</p>
              </div>
              <MdOutlineFileDownload className="w-5 h-5 text-brand-red" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
