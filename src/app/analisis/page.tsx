import { MdAnalytics, MdTrendingUp } from "react-icons/md";
import InfoCard from "@/components/ui/InfoCard";
import Tabs from "@/components/ui/Tabs";

export default function AnalisisPage() {
  const controlCostosMensuales = [
    { name: "ABO y REC" },
    { name: "Análisis Mano de Obra" },
    { name: "EEPP Mandante (INCY Factura)" },
    { name: "EEPP INGEVEC (INCY Factura)" },
    { name: "Seguimiento Seguros y Garantías" },
  ];

  const programaAvancesSemanales = [
    { name: "Programa General (ISP)" },
  ];

  const tabs = [
    { label: "Diarios", items: [] },
    { label: "Semanales", items: programaAvancesSemanales },
    { label: "Quincenales", items: [] },
    { label: "Mensuales", items: controlCostosMensuales },
  ];

  return (
    <div className="p-8">
      {/* Header Banner */}
      <div className="bg-brand-red text-brand-text-light py-8 px-8 rounded-lg mb-12">
        <h1 className="text-4xl font-bold">ÁREA ANÁLISIS DE DATOS</h1>
        <p className="text-lg mt-2 opacity-90">Control financiero y desempeño operacional</p>
      </div>

      {/* Sub-areas */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-brand-red mb-8">Subáreas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<MdAnalytics size={40} />}
            title="Control de Costos"
            description="Monitorea el desempeño financiero del proyecto: control de gastos, análisis de mano de obra indirecta, revisión de EEPP al mandante, seguimiento de seguros y garantías. Su propósito es mantener equilibrio económico y trazabilidad financiera."
            buttonText="Ver detalles"
            buttonLink="#"
          />
          <InfoCard
            icon={<MdTrendingUp size={40} />}
            title="Programa y Avances"
            description="Supervisa planificación y avance físico (ISP), curvas de avance y rendimiento para hormigón, enfierradura, moldaje, excavación, instalaciones y terminaciones. Permite detectar desviaciones y dar seguimiento a hitos constructivos."
            buttonText="Ver detalles"
            buttonLink="#"
          />
        </div>
      </section>

      {/* Deliverables */}
      <Tabs
        title="Entregables por Periodicidad - Análisis de Datos"
        tabs={tabs}
      />
    </div>
  );
}
