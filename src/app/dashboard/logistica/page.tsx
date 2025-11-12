"use client";

import { useState } from "react";
import {
  MdLocalShipping,
  MdOutlineTrendingUp,
  MdOutlineInventory,
  MdOutlineWarningAmber,
  MdAssignmentTurnedIn,
  MdOutlineFileDownload,
  MdOutlineAccessTime,
  MdOutlineCalendarToday,
  MdWarehouse,
  MdAttachMoney,
  MdCategory,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

// Datos de inventario valorizado
const valorizedInventory = {
  total: 45.8, // millones
  byCategory: [
    { category: "Materiales de Construcción", value: 18.5, percentage: 40.4, items: 156 },
    { category: "Acero y Metales", value: 12.3, percentage: 26.9, items: 89 },
    { category: "Equipos y Herramientas", value: 8.2, percentage: 17.9, items: 234 },
    { category: "Instalaciones Eléctricas", value: 4.1, percentage: 9.0, items: 67 },
    { category: "Instalaciones Sanitarias", value: 2.7, percentage: 5.9, items: 45 },
  ],
  byWarehouse: [
    { warehouse: "Bodega Central", value: 22.5, percentage: 49.1, items: 312 },
    { warehouse: "Planta Norte", value: 15.8, percentage: 34.5, items: 198 },
    { warehouse: "Bodega Sur", value: 7.5, percentage: 16.4, items: 81 },
  ],
  topItems: [
    { code: "AC-001", description: "Acero corrugado Ø12mm", category: "Acero y Metales", warehouse: "Bodega Central", quantity: 450, unit: "ton", unitValue: 850000, totalValue: 382.5, lastUpdate: "20 feb" },
    { code: "AC-003", description: "Acero estructural IPN 200", category: "Acero y Metales", warehouse: "Bodega Central", quantity: 28, unit: "ton", unitValue: 1200000, totalValue: 33.6, lastUpdate: "20 feb" },
    { code: "EQ-022", description: "Grúa torre 25 ton", category: "Equipos y Herramientas", warehouse: "Bodega Central", quantity: 2, unit: "unid", unitValue: 4500000, totalValue: 9.0, lastUpdate: "15 feb" },
    { code: "EQ-015", description: "Andamios modulares", category: "Equipos y Herramientas", warehouse: "Bodega Central", quantity: 85, unit: "unid", unitValue: 180000, totalValue: 15.3, lastUpdate: "18 feb" },
    { code: "HM-002", description: "Hormigón H30", category: "Materiales de Construcción", warehouse: "Planta Norte", quantity: 120, unit: "m³", unitValue: 125000, totalValue: 15.0, lastUpdate: "21 feb" },
    { code: "EL-008", description: "Cables eléctricos 2.5mm²", category: "Instalaciones Eléctricas", warehouse: "Bodega Sur", quantity: 3200, unit: "m", unitValue: 2500, totalValue: 8.0, lastUpdate: "19 feb" },
    { code: "SN-005", description: "Tubos PVC sanitarios Ø110mm", category: "Instalaciones Sanitarias", warehouse: "Bodega Sur", quantity: 450, unit: "m", unitValue: 12000, totalValue: 5.4, lastUpdate: "19 feb" },
    { code: "MT-004", description: "Cemento Portland", category: "Materiales de Construcción", warehouse: "Planta Norte", quantity: 280, unit: "bolsas", unitValue: 8500, totalValue: 2.38, lastUpdate: "21 feb" },
  ],
  valuationDate: "21 de febrero, 2025",
};

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

// Datos ficticios de despachos para el calendario con más detalles
interface DispatchInfo {
  count: number;
  status: "completed" | "pending" | "delayed" | "alert";
  deliveries: Array<{
    id: string;
    supplier: string;
    destination: string;
    time?: string;
    alert?: string;
  }>;
}

const dispatchData: Record<string, DispatchInfo> = {
  "2025-02-17": { 
    count: 3, 
    status: "completed",
    deliveries: [
      { id: "D001", supplier: "Aceros Andes", destination: "Torre Central", time: "08:30" },
      { id: "D002", supplier: "Hormigones Río", destination: "Planta Norte", time: "14:00" },
      { id: "D003", supplier: "RentalPro", destination: "Bodega Central", time: "16:45" },
    ]
  },
  "2025-02-18": { 
    count: 5, 
    status: "completed",
    deliveries: [
      { id: "D004", supplier: "Materiales SA", destination: "Torre Central", time: "09:00" },
      { id: "D005", supplier: "Aceros Andes", destination: "Planta Norte", time: "10:30" },
      { id: "D006", supplier: "Equipos Pro", destination: "Bodega Sur", time: "11:15" },
      { id: "D007", supplier: "Hormigones Río", destination: "Torre Central", time: "13:00" },
      { id: "D008", supplier: "Suministros", destination: "Bodega Central", time: "15:30" },
    ]
  },
  "2025-02-19": { 
    count: 4, 
    status: "completed",
    deliveries: [
      { id: "D009", supplier: "Aceros Andes", destination: "Torre Central", time: "08:00" },
      { id: "D010", supplier: "Materiales SA", destination: "Planta Norte", time: "10:00" },
      { id: "D011", supplier: "RentalPro", destination: "Bodega Central", time: "12:00" },
      { id: "D012", supplier: "Equipos Pro", destination: "Bodega Sur", time: "14:30" },
    ]
  },
  "2025-02-20": { 
    count: 6, 
    status: "completed",
    deliveries: [
      { id: "D013", supplier: "Hormigones Río", destination: "Torre Central", time: "07:30" },
      { id: "D014", supplier: "Aceros Andes", destination: "Planta Norte", time: "09:00" },
      { id: "D015", supplier: "Materiales SA", destination: "Bodega Central", time: "10:30" },
      { id: "D016", supplier: "Suministros", destination: "Bodega Sur", time: "11:45" },
      { id: "D017", supplier: "Equipos Pro", destination: "Torre Central", time: "13:30" },
      { id: "D018", supplier: "RentalPro", destination: "Planta Norte", time: "15:00" },
    ]
  },
  "2025-02-21": { 
    count: 4, 
    status: "pending",
    deliveries: [
      { id: "D019", supplier: "Aceros Andes", destination: "Torre Central", time: "09:00" },
      { id: "D020", supplier: "Hormigones Río", destination: "Planta Norte", time: "11:00" },
      { id: "D021", supplier: "Materiales SA", destination: "Bodega Central", time: "13:00" },
      { id: "D022", supplier: "Equipos Pro", destination: "Bodega Sur", time: "15:00" },
    ]
  },
  "2025-02-22": { 
    count: 7, 
    status: "pending",
    deliveries: [
      { id: "D023", supplier: "Aceros Andes", destination: "Torre Central", time: "08:00" },
      { id: "D024", supplier: "Hormigones Río", destination: "Planta Norte", time: "09:30" },
      { id: "D025", supplier: "Materiales SA", destination: "Bodega Central", time: "10:00" },
      { id: "D026", supplier: "Suministros", destination: "Bodega Sur", time: "11:00" },
      { id: "D027", supplier: "Equipos Pro", destination: "Torre Central", time: "12:30" },
      { id: "D028", supplier: "RentalPro", destination: "Planta Norte", time: "14:00" },
      { id: "D029", supplier: "Aceros Andes", destination: "Bodega Central", time: "15:30" },
    ]
  },
  "2025-02-24": { 
    count: 5, 
    status: "pending",
    deliveries: [
      { id: "D030", supplier: "Hormigones Río", destination: "Torre Central", time: "08:30" },
      { id: "D031", supplier: "Materiales SA", destination: "Planta Norte", time: "10:00" },
      { id: "D032", supplier: "Aceros Andes", destination: "Bodega Central", time: "11:30" },
      { id: "D033", supplier: "Equipos Pro", destination: "Bodega Sur", time: "13:00" },
      { id: "D034", supplier: "Suministros", destination: "Torre Central", time: "14:30" },
    ]
  },
  "2025-02-25": { 
    count: 3, 
    status: "alert",
    deliveries: [
      { id: "D035", supplier: "Aceros Andes", destination: "Torre Central", time: "09:00", alert: "Stock crítico" },
      { id: "D036", supplier: "Hormigones Río", destination: "Planta Norte", time: "11:00", alert: "Requiere validación" },
      { id: "D037", supplier: "Materiales SA", destination: "Bodega Central", time: "13:00" },
    ]
  },
  "2025-02-26": { 
    count: 6, 
    status: "pending",
    deliveries: [
      { id: "D038", supplier: "Equipos Pro", destination: "Torre Central", time: "08:00" },
      { id: "D039", supplier: "RentalPro", destination: "Planta Norte", time: "09:30" },
      { id: "D040", supplier: "Aceros Andes", destination: "Bodega Central", time: "10:30" },
      { id: "D041", supplier: "Hormigones Río", destination: "Bodega Sur", time: "12:00" },
      { id: "D042", supplier: "Materiales SA", destination: "Torre Central", time: "13:30" },
      { id: "D043", supplier: "Suministros", destination: "Planta Norte", time: "15:00" },
    ]
  },
  "2025-02-28": { 
    count: 2, 
    status: "delayed",
    deliveries: [
      { id: "D044", supplier: "Aceros Andes", destination: "Torre Central", alert: "Retraso confirmado" },
      { id: "D045", supplier: "Hormigones Río", destination: "Planta Norte", alert: "Reagendado" },
    ]
  },
};

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredItems = valorizedInventory.topItems.filter(item => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (selectedWarehouse && item.warehouse !== selectedWarehouse) return false;
    return true;
  });

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

      <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="bg-white border rounded-2xl p-4 space-y-3" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MdLocalShipping className="w-4 h-4 text-brand-red" /> 
              <span>Calendario de Despachos</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  const prevMonth = new Date(currentMonth);
                  prevMonth.setMonth(prevMonth.getMonth() - 1);
                  setCurrentMonth(prevMonth);
                  setSelectedDate(null);
                }}
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                title="Mes anterior"
              >
                <MdChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-xs text-gray-700 font-medium min-w-[120px] text-center capitalize">
                {currentMonth.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
              </span>
              <button
                onClick={() => {
                  const nextMonth = new Date(currentMonth);
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  setCurrentMonth(nextMonth);
                  setSelectedDate(null);
                }}
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                title="Mes siguiente"
              >
                <MdChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Calendario compacto */}
          <div className="grid grid-cols-7 gap-0.5 text-[10px]">
            {/* Días de la semana */}
            {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-400 py-1 text-xs">
                {day}
              </div>
            ))}
            
            {/* Días del mes */}
            {(() => {
              const year = currentMonth.getFullYear();
              const month = currentMonth.getMonth();
              const firstDay = new Date(year, month, 1);
              const startDate = new Date(firstDay);
              startDate.setDate(startDate.getDate() - startDate.getDay() + (startDate.getDay() === 0 ? -6 : 1));
              
              const days = [];
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              
              for (let i = 0; i < 35; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i);
                const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                const dispatch = dispatchData[dateStr];
                const isCurrentMonth = date.getMonth() === month;
                const isToday = dateStr === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                const isSelected = selectedDate === dateStr;
                
                const getStatusColor = () => {
                  if (!dispatch) return "";
                  switch (dispatch.status) {
                    case "completed": return "bg-green-50 border-green-300";
                    case "pending": return "bg-amber-50 border-amber-300";
                    case "delayed": return "bg-red-50 border-red-300";
                    case "alert": return "bg-orange-50 border-orange-400 ring-1 ring-orange-300";
                    default: return "";
                  }
                };
                
                days.push(
                  <button
                    key={i}
                    onClick={() => setSelectedDate(selectedDate === dateStr ? null : dateStr)}
                    className={`
                      aspect-square border rounded-md p-0.5 flex flex-col items-center justify-center transition-all relative
                      ${isCurrentMonth ? "text-gray-800" : "text-gray-300 bg-gray-50"}
                      ${isToday ? "ring-1 ring-brand-red font-bold" : ""}
                      ${isSelected ? "ring-2 ring-brand-red shadow-md" : ""}
                      ${dispatch ? `${getStatusColor()} cursor-pointer hover:shadow-sm hover:scale-105` : "border-gray-200 hover:bg-gray-50"}
                    `}
                    title={dispatch ? `${dispatch.count} despacho${dispatch.count > 1 ? "s" : ""}` : ""}
                  >
                    <span className={`text-[11px] ${isToday ? "font-bold" : ""}`}>
                      {date.getDate()}
                    </span>
                    {dispatch && (
                      <div className="mt-0.5 flex items-center justify-center gap-0.5 flex-wrap">
                        {Array.from({ length: Math.min(dispatch.count, 3) }).map((_, idx) => (
                          <div
                            key={idx}
                            className="w-1 h-1 rounded-full"
                            style={{
                              background:
                                dispatch.status === "completed"
                                  ? "#16a34a"
                                  : dispatch.status === "pending"
                                  ? "#f59e0b"
                                  : dispatch.status === "alert"
                                  ? "#f97316"
                                  : "#ef4444",
                            }}
                          />
                        ))}
                        {dispatch.count > 3 && (
                          <span className="text-[8px] text-gray-500 font-semibold">+{dispatch.count - 3}</span>
                        )}
                        {dispatch.status === "alert" && (
                          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    )}
                  </button>
                );
              }
              
              return days;
            })()}
          </div>
          
          {/* Leyenda compacta */}
          <div className="flex items-center justify-center gap-3 pt-2 border-t text-[10px]" style={{ borderColor: "var(--color-brand-line)" }}>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Completado</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-gray-600">Pendiente</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-gray-600">Retrasado</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
              <span className="text-gray-600">Alerta</span>
            </div>
          </div>
          
          {/* Detalle de despachos del día seleccionado */}
          {selectedDate && dispatchData[selectedDate] && (
            <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">
                  {new Date(selectedDate + 'T12:00:00').toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                </span>
                <span className="text-xs text-gray-500">{dispatchData[selectedDate].count} despacho{dispatchData[selectedDate].count > 1 ? "s" : ""}</span>
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {dispatchData[selectedDate].deliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="flex items-start justify-between p-2 bg-gray-50 rounded-lg text-[10px]"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{delivery.supplier}</div>
                      <div className="text-gray-600">{delivery.destination}</div>
                      {delivery.time && <div className="text-gray-500">{delivery.time}</div>}
                    </div>
                    {delivery.alert && (
                      <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[9px] font-semibold whitespace-nowrap ml-2">
                        {delivery.alert}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
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

      {/* Inventario Valorizado */}
      <section className="bg-white border rounded-lg shadow-sm p-6" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold ink mb-2">Inventario Valorizado</h2>
            <p className="text-sm text-gray-600">Valoración al {valorizedInventory.valuationDate}</p>
          </div>
          <button className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand transition-colors flex items-center gap-2 text-sm font-semibold">
            <MdOutlineFileDownload className="w-5 h-5" />
            Exportar Reporte
          </button>
        </div>

        {/* KPIs de Inventario */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border-l-4 rounded-lg p-4" style={{ borderLeftColor: "#2563eb" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Valor Total Inventario</span>
              <MdAttachMoney className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">${valorizedInventory.total}M</p>
            <p className="text-xs text-gray-500 mt-1">591 ítems totales</p>
          </div>
          <div className="bg-green-50 border-l-4 rounded-lg p-4" style={{ borderLeftColor: "#16a34a" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Categorías Activas</span>
              <MdCategory className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{valorizedInventory.byCategory.length}</p>
            <p className="text-xs text-gray-500 mt-1">Categorías con stock</p>
          </div>
          <div className="bg-purple-50 border-l-4 rounded-lg p-4" style={{ borderLeftColor: "#8b5cf6" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Bodegas Activas</span>
              <MdWarehouse className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">{valorizedInventory.byWarehouse.length}</p>
            <p className="text-xs text-gray-500 mt-1">Ubicaciones operativas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Desglose por Categoría */}
          <div>
            <h3 className="text-lg font-semibold ink mb-4">Valor por Categoría</h3>
            <div className="space-y-3">
              {valorizedInventory.byCategory.map((cat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-800">{cat.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600">{cat.items} ítems</span>
                      <span className="font-bold text-gray-900">${cat.value}M</span>
                    </div>
                  </div>
                  <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{ 
                        width: `${cat.percentage}%`, 
                        background: index === 0 ? "#2563eb" : index === 1 ? "#16a34a" : index === 2 ? "#f59e0b" : index === 3 ? "#8b5cf6" : "#ef4444"
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{cat.percentage}% del total</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desglose por Bodega */}
          <div>
            <h3 className="text-lg font-semibold ink mb-4">Valor por Bodega</h3>
            <div className="space-y-3">
              {valorizedInventory.byWarehouse.map((wh, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-800">{wh.warehouse}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600">{wh.items} ítems</span>
                      <span className="font-bold text-gray-900">${wh.value}M</span>
                    </div>
                  </div>
                  <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{ 
                        width: `${wh.percentage}%`, 
                        background: index === 0 ? "#2563eb" : index === 1 ? "#16a34a" : "#f59e0b"
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{wh.percentage}% del total</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabla de Ítems Principales */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold ink">Ítems de Mayor Valor</h3>
            <div className="flex items-center gap-3">
              <select
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="px-3 py-1.5 border rounded-lg bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                style={{ borderColor: "var(--color-brand-line)" }}
              >
                <option value="">Todas las categorías</option>
                {valorizedInventory.byCategory.map((cat, idx) => (
                  <option key={idx} value={cat.category}>{cat.category}</option>
                ))}
              </select>
              <select
                value={selectedWarehouse || ""}
                onChange={(e) => setSelectedWarehouse(e.target.value || null)}
                className="px-3 py-1.5 border rounded-lg bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                style={{ borderColor: "var(--color-brand-line)" }}
              >
                <option value="">Todas las bodegas</option>
                {valorizedInventory.byWarehouse.map((wh, idx) => (
                  <option key={idx} value={wh.warehouse}>{wh.warehouse}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--color-brand-line)" }}>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Código</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Descripción</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Categoría</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Bodega</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Cantidad</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Valor Unit.</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Valor Total</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Última Actualización</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--color-brand-line)" }}>
                    <td className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">{item.code}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-700">{item.description}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{item.category}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-700">{item.warehouse}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-semibold text-gray-900">{item.quantity.toLocaleString()} {item.unit}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm text-gray-700">
                        {item.unitValue >= 1000000 
                          ? `$${(item.unitValue / 1000000).toFixed(2)}M`
                          : item.unitValue >= 1000
                          ? `$${(item.unitValue / 1000).toFixed(0)}K`
                          : `$${item.unitValue.toLocaleString()}`
                        }
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-bold text-gray-900">
                        {item.totalValue >= 1 
                          ? `$${item.totalValue.toFixed(2)}M`
                          : `$${(item.totalValue * 1000).toFixed(0)}K`
                        }
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs text-gray-500">{item.lastUpdate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
