import { MdShoppingCart, MdDescription } from "react-icons/md";
import InfoCard from "@/components/ui/InfoCard";
import Tabs from "@/components/ui/Tabs";

export default function ProductosPage() {
  const subcontratosQuincenales = [
    { name: "Cubicaciones SC" },
    { name: "Contratos SC" },
    { name: "EEPP carátulas SC" },
    { name: "Finiquitos SC" },
  ];

  const materialesEEDiarios = [
    { name: "Coordinación de despacho" },
  ];

  const tabs = [
    { label: "Diarios", items: materialesEEDiarios },
    { label: "Semanales", items: [] },
    { label: "Quincenales", items: subcontratosQuincenales },
    { label: "Mensuales", items: [] },
  ];

  return (
    <div className="p-8">
      {/* Header Banner */}
      <div className="bg-brand-red text-brand-text-light py-8 px-8 rounded-lg mb-12">
        <h1 className="text-4xl font-bold">PRODUCTOS Y SOPORTE</h1>
        <p className="text-lg mt-2 opacity-90">Gestión de subcontratos y especificaciones técnicas</p>
      </div>

      {/* Sub-areas */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-brand-red mb-8">Subáreas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<MdShoppingCart size={40} />}
            title="Subcontratos"
            description="Gestión integral de subcontratos para proyectos BETT. Incluye planillas, contratos, cubicaciones, cuadros comparativos y coordinación para asegurar el cumplimiento de plazos y especificaciones técnicas."
            buttonText="Ver detalles"
            buttonLink="#"
          />
          <InfoCard
            icon={<MdDescription size={40} />}
            title="Materiales Especificaciones Técnicas"
            description="Gestión de materiales con sus especificaciones técnicas para proyectos BETT. Control de solicitudes de pedido, cubicaciones, cuadros comparativos y coordinación de despachos."
            buttonText="Ver detalles"
            buttonLink="#"
          />
        </div>
      </section>

      {/* Deliverables */}
      <Tabs
        title="Entregables por Periodicidad - Productos y Soportes"
        tabs={tabs}
      />
    </div>
  );
}
