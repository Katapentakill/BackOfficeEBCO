"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  Truck,
  AlertTriangle,
  Warehouse,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KPICards = [
  {
    icon: Truck,
    label: "Cumplimiento Despachos",
    value: "92%",
    color: "text-green-600",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: AlertTriangle,
    label: "Stock Crítico",
    value: "6 ítems",
    color: "text-red-600",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    icon: Warehouse,
    label: "Uso Bodegas",
    value: "71%",
    color: "text-blue-700",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    icon: FileText,
    label: "Contratos Arriendo",
    value: "28",
    subtitle: "(4 por renovar)",
    color: "text-amber-600",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

const categoryData = [
  { name: "Materiales", value: 40, color: "#3b82f6" },
  { name: "Equipamiento", value: 30, color: "#16a34a" },
  { name: "Consumibles", value: 20, color: "#eab308" },
  { name: "Otros", value: 10, color: "#9ca3af" },
];

const warehouseData = [
  { name: "Bodega Central", value: 55, color: "#1e40af" },
  { name: "Obra Norte", value: 25, color: "#f97316" },
  { name: "Obra Sur", value: 20, color: "#16a34a" },
];

const occupancyData = [
  { name: "Bodega Central", ocupacion: 85, color: "#16a34a" },
  { name: "Obra Norte", ocupacion: 70, color: "#1e40af" },
  { name: "Obra Sur", ocupacion: 58, color: "#16a34a" },
];

const alerts = [
  {
    type: "critical",
    title: "Acero corrugado",
    message: "Stock crítico: < 5 toneladas (Reponer urgente)",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
  },
  {
    type: "warning",
    title: "Cemento tipo I",
    message: "Inventario bajo: < 20 sacos (Solicitar compra)",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    iconColor: "text-amber-600",
  },
];

const tabs = [
  { id: "inicio", label: "Inicio" },
  { id: "pedidos", label: "Pedidos" },
  { id: "inventario", label: "Inventario", active: true },
  { id: "bodegas", label: "Bodegas" },
  { id: "transporte", label: "Transporte" },
];

export default function LogisticsDashboard() {
  const [activeTab, setActiveTab] = useState("inventario");

  return (
    <div className="h-screen bg-gray-50 p-4 overflow-hidden flex flex-col">
      {/* Header Superior */}
      <div className="mb-3 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Dashboard Logística
        </h1>
        
        {/* Tabs de navegación */}
        <div className="flex gap-1 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 font-medium text-sm transition-colors relative ${
                activeTab === tab.id || tab.active
                  ? "text-brand-red"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {(activeTab === tab.id || tab.active) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Fila de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 flex-shrink-0">
        {KPICards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`${kpi.iconBg} p-2 rounded-lg`}>
                    <IconComponent className={`w-5 h-5 ${kpi.iconColor}`} />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1 font-medium">{kpi.label}</p>
                <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
                {kpi.subtitle && (
                  <p className="text-xs text-gray-500 mt-0.5">{kpi.subtitle}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sección Principal - Grid 2 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Columna Izquierda - Inventario Valorizado */}
        <Card className="flex flex-col min-h-0">
          <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="text-lg font-bold text-gray-900">
              Inventario Valorizado
            </CardTitle>
            <p className="text-3xl font-bold text-gray-900 mt-1">$45.8M</p>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
              {/* Gráfico 1: Valor por Categoría */}
              <div className="flex flex-col min-h-0">
                <h3 className="text-xs font-semibold text-gray-700 mb-2 text-center">
                  Valor por Categoría
                </h3>
                <div className="flex-1 min-h-0" style={{ minHeight: '140px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                      label={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => `${value}%`}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-2 flex-shrink-0">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-gray-600 font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gráfico 2: Valor por Bodega */}
              <div className="flex flex-col min-h-0">
                <h3 className="text-xs font-semibold text-gray-700 mb-2 text-center">
                  Valor por Bodega
                </h3>
                <div className="flex-1 min-h-0" style={{ minHeight: '140px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={warehouseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                      label={false}
                    >
                      {warehouseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => `${value}%`}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-2 flex-shrink-0">
                  {warehouseData.map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-gray-600 font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Columna Derecha - Monitor y Alertas */}
        <div className="space-y-4 flex flex-col min-h-0">
          {/* Gráfico de Barras - Monitor de Ocupación */}
          <Card className="flex flex-col min-h-0 flex-1">
            <CardHeader className="pb-2 flex-shrink-0">
              <CardTitle className="text-base font-bold text-gray-900">
                Monitor de Ocupación de Bodegas
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0" style={{ minHeight: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData} margin={{ top: 10, right: 50, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Ocupación"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                  />
                  <Bar
                    dataKey="ocupacion"
                    radius={[8, 8, 0, 0]}
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <ReferenceLine
                    y={80}
                    stroke="#16a34a"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    label={{ value: "Target", position: "right", fill: "#16a34a", fontSize: 11 }}
                  />
                  <ReferenceLine
                    y={90}
                    stroke="#ef4444"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    label={{ value: "Alert", position: "right", fill: "#ef4444", fontSize: 11 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Alertas de Inventario */}
          <Card className="flex-shrink-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Alertas de inventario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`${alert.bgColor} ${alert.borderColor} border rounded-lg p-3`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      className={`w-4 h-4 ${alert.iconColor} flex-shrink-0 mt-0.5`}
                    />
                    <div className="flex-1">
                      <h4 className={`text-sm font-semibold ${alert.color} mb-1`}>
                        Alerta: {alert.title}
                      </h4>
                      <p className="text-xs text-gray-700">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

