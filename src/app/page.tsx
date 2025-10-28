import { MdBook, MdInfoOutline } from "react-icons/md";
import InfoCard from "@/components/ui/InfoCard";
import Tabs from "@/components/ui/Tabs";

export default function Home() {
  const logisticaDeliverables = [
    { name: "Coordinación de despachos" },
    { name: "Control Hormigones" },
    { name: "Control pérdida de hormigones" },
    { name: "Contratos y HES" },
  ];

  const tabs = [
    { label: "Diarios", items: logisticaDeliverables },
    { label: "Semanales", items: [] },
    { label: "Quincenales", items: [] },
    { label: "Mensuales", items: [] },
  ];

  return (
    <div className="p-8">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-5xl font-bold text-brand-red mb-4">
          Manual Operacional Back Office
        </h1>
        <p className="text-xl text-brand-text-dark mb-6">
          Manual Operacional del Back Office: Tu guía de apoyo
        </p>
        <p className="text-base text-brand-text-dark leading-relaxed max-w-4xl">
          Bienvenido al Manual Operacional del Back Office, una herramienta diseñada para acompañar
          y facilitar el trabajo diario en nuestras obras.
        </p>
      </section>

      {/* Organizational Structure Section */}
      <section className="mb-12 bg-brand-dark text-brand-text-light rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              ESTRUCTURA ORGANIZACIONAL<br />BACK OFFICE
            </h2>
            <p className="text-sm leading-relaxed mb-6 italic">
              "Somos el motor silencioso que organiza, conecta y potencia, para que cada proyecto
              avance con eficiencia, calidad y visión de futuro."
            </p>
            <button className="bg-brand-red text-brand-text-light px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity">
              ESTRUCTURA ORGANIZACIONAL
            </button>
          </div>

          {/* Right Column - Organizational Chart */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Coordinator */}
              <div className="mb-8 text-center">
                <div className="bg-brand-red px-4 py-2 rounded-lg inline-block font-bold">
                  COORDINADOR
                </div>
              </div>

              {/* Areas */}
              <div className="grid grid-cols-1 gap-4 text-center">
                <div className="bg-gray-700 px-4 py-2 rounded-lg">
                  <p className="font-bold">LOGÍSTICA</p>
                  <p className="text-xs mt-1">Materiales • Arriendos</p>
                </div>
                <div className="bg-gray-700 px-4 py-2 rounded-lg">
                  <p className="font-bold">PRODUCTOS Y SERVICIOS</p>
                  <p className="text-xs mt-1">Subcontratos • Materiales EE.TT</p>
                </div>
                <div className="bg-gray-700 px-4 py-2 rounded-lg">
                  <p className="font-bold">ANÁLISIS DE DATOS</p>
                  <p className="text-xs mt-1">Costos • Programa y Avance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-areas Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-brand-red mb-8">Subáreas Principales</h2>
        <p className="text-brand-text-dark mb-8">
          Conoce las diferentes áreas que conforman nuestro Back Office y sus responsabilidades específicas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<MdBook size={40} />}
            title="Manual Operacional"
            description="Acceso a la documentación completa y guías de operación del Back Office."
            buttonText="Ir a Manual"
            buttonLink="/manual"
          />
          <InfoCard
            icon={<MdInfoOutline size={40} />}
            title="Organigrama"
            description="Visualiza la estructura organizacional y jerarquía del equipo."
            buttonText="Ver Organigrama"
            buttonLink="/organigrama"
          />
          <InfoCard
            icon={<MdBook size={40} />}
            title="Contacto"
            description="Información de contacto de nuestras oficinas a nivel nacional."
            buttonText="Ver Oficinas"
            buttonLink="#"
          />
        </div>
      </section>

      {/* Deliverables Section */}
      <Tabs
        title="Entregables por Periodicidad"
        tabs={tabs}
      />
    </div>
  );
}
