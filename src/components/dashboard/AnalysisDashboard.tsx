"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Datos para la Curva S de Valor Ganado
const sCurveData = [
  { semana: 1, pv: 2.0, ev: 1.8, ac: 2.1 },
  { semana: 2, pv: 4.5, ev: 4.2, ac: 4.8 },
  { semana: 3, pv: 7.5, ev: 7.8, ac: 8.2 },
  { semana: 4, pv: 10.0, ev: 10.5, ac: 11.0 },
  { semana: 5, pv: 12.0, ev: 12.5, ac: 13.8 },
  { semana: 6, pv: 14.0, ev: null, ac: null },
];

// Datos del Panel de Rendimiento por Faena
const performanceData = [
  {
    faena: "Hormigón",
    avanceProg: 80,
    avanceReal: 85,
    eficiencia: 1.06,
    status: "good",
  },
  {
    faena: "Enfierradura",
    avanceProg: 75,
    avanceReal: 70,
    eficiencia: 0.93,
    status: "warning",
  },
  {
    faena: "Moldaje",
    avanceProg: 60,
    avanceReal: 55,
    eficiencia: 0.92,
    status: "warning",
  },
];

// Datos del Control de Costo Mensual - Barras
const costBarData = [
  {
    categoria: "Mano de Obra",
    presupuestado: 500,
    real: 550,
    variacion: 10,
    variacionTipo: "increase",
  },
  {
    categoria: "Subcontratos",
    presupuestado: 300,
    real: 280,
    variacion: -6.7,
    variacionTipo: "decrease",
  },
  {
    categoria: "Materiales",
    presupuestado: 400,
    real: 420,
    variacion: 5,
    variacionTipo: "increase",
  },
  {
    categoria: "Equipamiento",
    presupuestado: 400,
    real: 200,
    variacion: -50,
    variacionTipo: "decrease",
  },
];

// Datos para el gráfico de dona
const costDonutData = [
  { name: "Mano de Obra", value: 550, color: "#1e40af" },
  { name: "Subcontratos", value: 280, color: "#3b82f6" },
  { name: "Materiales", value: 420, color: "#9ca3af" },
  { name: "Equipamiento", value: 200, color: "#f97316" },
];

const tabs = [
  { id: "resumen", label: "Resumen" },
  { id: "avance", label: "Avance" },
  { id: "costos", label: "Costos" },
  { id: "rendimiento", label: "Rendimiento" },
];

export default function AnalysisDashboard() {
  const [activeTab, setActiveTab] = useState("resumen");

  return (
    <div className="h-screen bg-slate-50 p-3 overflow-hidden flex flex-col">
      {/* Header Superior */}
      <div className="mb-3 flex-shrink-0">
        <h1 className="text-xl font-bold text-gray-900 mb-3">
          Dashboard Análisis de Datos
        </h1>
        
        {/* Tabs de navegación */}
        <div className="flex gap-1 border-b border-gray-200 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 font-medium text-xs transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sección Principal - Curva S de Valor Ganado */}
      <Card className="mb-3 flex-shrink-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-gray-900">
            Curva S de Valor Ganado
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={sCurveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="semana"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                label={{ value: "Semanas", position: "insideBottom", offset: -5, fill: "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                label={{ value: "Valor (M)", angle: -90, position: "insideLeft", fill: "#6b7280", fontSize: 12 }}
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload || payload.length === 0) return null;
                  
                  const ev = payload.find(p => p.dataKey === 'ev')?.value as number;
                  const ac = payload.find(p => p.dataKey === 'ac')?.value as number;
                  const pv = payload.find(p => p.dataKey === 'pv')?.value as number;
                  
                  // Calcular CPI y SPI
                  const cpi = ev && ac ? (ev / ac).toFixed(2) : null;
                  const spi = ev && pv ? (ev / pv).toFixed(2) : null;
                  
                  return (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                      <p className="font-semibold text-sm text-gray-900 mb-2">Semana {label}</p>
                      <div className="space-y-1.5 text-xs">
                        {ev !== null && ev !== undefined && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">EV:</span>
                            <span className="font-bold text-gray-900">${ev.toFixed(1)}M</span>
                          </div>
                        )}
                        {ac !== null && ac !== undefined && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">AC:</span>
                            <span className="font-bold text-gray-900">${ac.toFixed(1)}M</span>
                          </div>
                        )}
                        {pv !== null && pv !== undefined && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">PV:</span>
                            <span className="font-bold text-gray-900">${pv.toFixed(1)}M</span>
                          </div>
                        )}
                        {cpi && (
                          <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
                            <span className="text-gray-600">CPI:</span>
                            <span className={`font-bold ${parseFloat(cpi) < 1 ? 'text-red-600' : 'text-green-600'}`}>
                              {cpi} {parseFloat(cpi) < 1 ? '(Sobrecosto)' : '(Bajo presupuesto)'}
                            </span>
                          </div>
                        )}
                        {spi && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">SPI:</span>
                            <span className={`font-bold ${parseFloat(spi) < 1 ? 'text-red-600' : 'text-green-600'}`}>
                              {spi} {parseFloat(spi) < 1 ? '(Retraso)' : '(Adelanto)'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                iconType="line"
                formatter={(value) => {
                  const labels: { [key: string]: string } = {
                    pv: "PV (Valor Planificado)",
                    ev: "EV (Valor Ganado)",
                    ac: "AC (Costo Real)",
                  };
                  return labels[value] || value;
                }}
              />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#93c5fd"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#93c5fd" }}
                name="pv"
              />
              <Line
                type="monotone"
                dataKey="ev"
                stroke="#1e40af"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#1e40af" }}
                name="ev"
              />
              <Line
                type="monotone"
                dataKey="ac"
                stroke="#4b5563"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 6, fill: "#4b5563" }}
                name="ac"
              />
              <ReferenceLine
                x={5}
                stroke="#ef4444"
                strokeDasharray="3 3"
                label={{ value: "Semana 5", position: "top", fill: "#ef4444", fontSize: 11 }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          {/* Tooltip de la Semana 5 */}
          <div className="mt-3 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-gray-600">EV:</span>
                <span className="ml-2 font-bold text-gray-900">$12.5M</span>
              </div>
              <div>
                <span className="text-gray-600">AC:</span>
                <span className="ml-2 font-bold text-gray-900">$13.8M</span>
              </div>
              <div>
                <span className="text-gray-600">PV:</span>
                <span className="ml-2 font-bold text-gray-900">$12.0M</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <span className="text-gray-600">CPI:</span>
                  <span className="ml-1 font-bold text-red-600">0.91</span>
                  <span className="ml-1 text-red-600 text-[10px]">(Sobrecosto)</span>
                </div>
                <div>
                  <span className="text-gray-600">SPI:</span>
                  <span className="ml-1 font-bold text-green-600">1.04</span>
                  <span className="ml-1 text-green-600 text-[10px]">(Adelanto)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección Inferior - Grid 2 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-0">
        {/* Panel de Rendimiento por Faena */}
        <Card className="flex flex-col min-h-0">
          <CardHeader className="pb-2 flex-shrink-0">
            <CardTitle className="text-base font-bold text-gray-900">
              Panel de Rendimiento por Faena
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-3">
            {/* Headers de la tabla */}
            <div className="grid grid-cols-4 gap-2 mb-3 pb-2 border-b border-gray-200">
              <span className="text-xs font-bold text-gray-700">Faena</span>
              <span className="text-xs font-bold text-gray-700 text-center">Avance Prog.</span>
              <span className="text-xs font-bold text-gray-700 text-center">Avance Real</span>
              <span className="text-xs font-bold text-gray-700 text-right">Eficiencia</span>
            </div>
            
            <div className="space-y-3">
              {performanceData.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-3 items-center">
                  {/* Nombre de la faena */}
                  <span className="text-xs font-semibold text-gray-800">{item.faena}</span>
                  
                  {/* Avance Prog. */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${item.avanceProg}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-800 w-8 text-right">{item.avanceProg}%</span>
                  </div>
                  
                  {/* Avance Real */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.avanceReal >= item.avanceProg ? "bg-blue-700" : "bg-gray-400"
                        }`}
                        style={{ width: `${item.avanceReal}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-800 w-8 text-right">{item.avanceReal}%</span>
                  </div>
                  
                  {/* Eficiencia */}
                  <div className="flex items-center justify-end gap-1.5">
                    {item.status === "good" ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-500" />
                    )}
                    <span className={`text-xs font-bold ${
                      item.eficiencia >= 1 ? "text-green-600" : "text-gray-600"
                    }`}>
                      {item.eficiencia.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Control de Costo Mensual */}
        <Card className="flex flex-col min-h-0">
          <CardHeader className="pb-2 flex-shrink-0">
            <CardTitle className="text-base font-bold text-gray-900">
              Control de Costo Mensual
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-3 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
              {/* Gráfico de Barras Horizontales con Flexbox Layout */}
              <div className="flex flex-col min-h-0 justify-center">
                <div className="space-y-4">
                  {costBarData.map((item, index) => {
                    const maxValue = Math.max(...costBarData.map(d => Math.max(d.presupuestado, d.real)));
                    const presupuestoWidth = (item.presupuestado / maxValue) * 100;
                    const realWidth = (item.real / maxValue) * 100;
                    
                    return (
                      <div key={index} className="space-y-2">
                        {/* Fila con categoría y valores */}
                        <div className="flex items-center gap-3">
                          {/* Nombre de categoría */}
                          <span className="text-xs font-semibold text-gray-800 w-24 flex-shrink-0">{item.categoria}</span>
                          
                          {/* Barras comparativas lado a lado */}
                          <div className="flex-1 flex items-center gap-2">
                            {/* Barra Presupuestado */}
                            <div className="flex-1 relative h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="absolute top-0 left-0 h-full bg-gray-400 rounded-full"
                                style={{ width: `${presupuestoWidth}%` }}
                              />
                            </div>
                            
                            {/* Barra Real */}
                            <div className="flex-1 relative h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                                style={{ width: `${realWidth}%` }}
                              />
                            </div>
                          </div>
                          
                          {/* Valores y desviación */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-gray-600 w-12 text-right">${item.presupuestado}K</span>
                            <span className="text-xs font-bold text-gray-900 w-12 text-right">${item.real}K</span>
                            <span className={`text-xs font-bold w-12 text-right ${
                              item.variacionTipo === "increase" ? "text-red-600" : "text-green-600"
                            }`}>
                              {item.variacion > 0 ? "+" : ""}{item.variacion}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Gráfico de Dona Reducido */}
              <div className="flex flex-col min-h-0 justify-center">
                <ResponsiveContainer width="100%" height="100%" minHeight={160}>
                  <PieChart>
                    <Pie
                      data={costDonutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {costDonutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => `$${value}K`}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "6px 10px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Leyenda */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {costDonutData.map((item, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-gray-700 truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

