"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface SCurveDataPoint {
  period: string; // "Semana 0", "Semana 4", etc.
  pv: number; // Planned Value
  ev: number | null; // Earned Value (puede ser null para períodos futuros)
  ac: number | null; // Actual Cost (puede ser null para períodos futuros)
}

export interface ProjectSGraphProps {
  data: SCurveDataPoint[];
  projectName: string;
  currentDateIndex?: number; // Índice del período actual (para la línea vertical)
}

export default function ProjectSGraph({ data, projectName, currentDateIndex }: ProjectSGraphProps) {
  const labels = data.map((point) => point.period);
  const pvData = data.map((point) => point.pv);
  const evData = data.map((point) => point.ev ?? 0);
  const acData = data.map((point) => point.ac ?? 0);

  // Encontrar el máximo valor para establecer el rango del eje Y
  const maxValue = Math.max(
    ...pvData,
    ...evData,
    ...acData
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "PV (Valor Planificado)",
        data: pvData,
        borderColor: "#2563eb", // Azul sólido
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        borderWidth: 3,
        fill: false,
        tension: 0.4, // Suaviza la curva para forma de S
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#2563eb",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
      {
        label: "EV (Valor Ganado)",
        data: evData,
        borderColor: "#16a34a", // Verde sólido
        backgroundColor: "rgba(22, 163, 74, 0.1)",
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#16a34a",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
      {
        label: "AC (Costo Real)",
        data: acData,
        borderColor: "#ef4444", // Rojo
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 3,
        borderDash: [8, 4], // Línea punteada
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#ef4444",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ocultamos la leyenda del gráfico para crear una personalizada
      },
      title: {
        display: true,
        text: `Curva S de Valor Ganado - ${projectName}`,
        font: {
          size: 18,
          weight: "bold" as const,
        },
        padding: {
          bottom: 10,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: "bold" as const,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.parsed.y.toLocaleString("es-CL", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            });
            return `${label}: ${value}`;
          },
        },
      },
      annotation: {
        annotations: currentDateIndex !== undefined && currentDateIndex >= 0
          ? {
              verticalLine: {
                type: "line" as const,
                xMin: currentDateIndex,
                xMax: currentDateIndex,
                borderColor: "#f59e0b", // Amarillo/naranja
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  display: true,
                  content: "Fecha de Corte",
                  position: "top" as const,
                  backgroundColor: "#f59e0b",
                  color: "#ffffff",
                  font: {
                    size: 11,
                    weight: "bold" as const,
                  },
                  padding: 6,
                },
              },
            }
          : {},
      },
    },
    scales: {
        x: {
        title: {
          display: true,
          text: "Tiempo (Semanas)",
          font: {
            size: 13,
            weight: "normal" as const,
          },
          padding: {
            top: 10,
          },
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Valor Acumulado (USD)",
          font: {
            size: 13,
            weight: "normal" as const,
          },
          padding: {
            bottom: 10,
          },
        },
        beginAtZero: true,
        max: Math.ceil(maxValue * 1.1), // 10% más arriba del máximo
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: function (value: any) {
            return value.toLocaleString("es-CL", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            });
          },
          font: {
            size: 11,
          },
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  // Plugin personalizado para dibujar la línea vertical de fecha de corte
  const verticalLinePlugin = {
    id: "verticalLine",
    afterDraw: (chart: any) => {
      if (currentDateIndex !== undefined && currentDateIndex >= 0) {
        const ctx = chart.ctx;
        const xAxis = chart.scales.x;
        const yAxis = chart.scales.y;

        const x = xAxis.getPixelForValue(currentDateIndex);

        ctx.save();
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x, yAxis.top);
        ctx.lineTo(x, yAxis.bottom);
        ctx.stroke();
        ctx.restore();

        // Etiqueta "Fecha de Corte"
        ctx.save();
        ctx.fillStyle = "#f59e0b";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Fecha de Corte", x, yAxis.top - 10);
        ctx.restore();
      }
    },
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* Leyenda personalizada arriba del gráfico */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-4 pb-4 border-b" style={{ borderColor: "#e5e7eb" }}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-500"></div>
          <span className="text-xs md:text-sm text-gray-700 font-medium">PV (Valor Planificado)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-green-500"></div>
          <span className="text-xs md:text-sm text-gray-700 font-medium">EV (Valor Ganado)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-red-500" style={{ borderTop: "2px dashed #ef4444" }}></div>
          <span className="text-xs md:text-sm text-gray-700 font-medium">AC (Costo Real)</span>
        </div>
        {currentDateIndex !== undefined && currentDateIndex >= 0 && (
          <div className="flex items-center gap-2 md:ml-4 md:pl-4 md:border-l" style={{ borderColor: "#e5e7eb" }}>
            <div className="w-4 h-0.5 bg-amber-500" style={{ borderTop: "2px dashed #f59e0b" }}></div>
            <span className="text-xs md:text-sm text-gray-700 font-medium">Fecha de Corte</span>
          </div>
        )}
      </div>
      <div className="w-full" style={{ height: "400px", minHeight: "400px" }}>
        <Line data={chartData} options={options} plugins={[verticalLinePlugin]} />
      </div>
    </div>
  );
}

