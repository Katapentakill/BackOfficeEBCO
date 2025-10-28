import { MdLocalShipping, MdWarehouse } from "react-icons/md";
import InfoCard from "@/components/ui/InfoCard";
import Tabs from "@/components/ui/Tabs";

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

  return (
    <div className="p-8">
      {/* Header Banner */}
      <div className="bg-brand-red text-brand-text-light py-8 px-8 rounded-lg mb-12">
        <h1 className="text-4xl font-bold">ÁREA LOGÍSTICA</h1>
        <p className="text-lg mt-2 opacity-90">Gestión de materiales y servicios de arriendo</p>
      </div>

      {/* Sub-areas */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-brand-red mb-8">Subáreas</h2>
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
    </div>
  );
}
