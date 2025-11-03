"use client";
import { useState, useEffect } from "react";
import { MdLocalShipping, MdWarehouse, MdFolder, MdSearch, MdDownload, MdCloudUpload, MdLink, MdDelete } from "react-icons/md";
import InfoCard from "@/components/ui/InfoCard";
import Tabs from "@/components/ui/Tabs";

// --- Mock Data --- //
const MOCK_DOCUMENTS = [
  { id: 1, title: "Contrato_Andamios_Obra_A.pdf", link: "#", date: "2024-05-20" },
  { id: 2, title: "Factura_Hormigon_Enero.xlsx", link: "#", date: "2024-05-18" },
];

const MOCK_LOGISTICA_DIARIOS = [
  { name: "Coordinación de despachos", downloadLink: "#" },
  { name: "Control Hormigones", downloadLink: "#" },
  { name: "Control pérdida de hormigones", downloadLink: "#" },
  { name: "Contratos y HES", downloadLink: "#" },
];

const MOCK_SERVICIOS_ARRIENDOS = [
  { name: "Control de arriendos", downloadLink: "#" },
  { name: "Estado de equipos", downloadLink: "#" },
];

const MOCK_TABS = [
  { label: "Diarios", items: MOCK_LOGISTICA_DIARIOS },
  { label: "Semanales", items: MOCK_SERVICIOS_ARRIENDOS },
  { label: "Quincenales", items: [] },
  { label: "Mensuales", items: [] },
];

interface Document {
  id: number;
  title: string;
  link: string;
  date: string;
}

export default function LogisticaPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [tabsData, setTabsData] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newLink, setNewLink] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate fetching data from a backend
    setTimeout(() => {
      setDocuments(MOCK_DOCUMENTS);
      setTabsData(MOCK_TABS);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleAddDocument = () => {
    if (newTitle.trim() !== "" && newLink.trim() !== "") {
      const newDocument: Document = {
        id: Date.now(),
        title: newTitle,
        link: newLink,
        date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
      };
      setDocuments(prevDocuments => [newDocument, ...prevDocuments]);
      setNewTitle("");
      setNewLink("");
    }
  };

  const handleDeleteDocument = (id: number) => {
    setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== id));
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (isLoading) {
    return <div className="p-8 text-center">Cargando...</div>;
  }

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

      {/* Document Management */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-brand-red">Gestión de Documentos</h2>
          <a 
            href="https://drive.google.com/drive/folders/18yLufbxTxfBRmkR8eSoV2pQ4QkDLBrQb?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            <MdFolder className="mr-2" />
            Abrir Carpeta Principal
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Add Document Form */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Título del documento"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enlace de Google Drive"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newLink}
                onChange={e => setNewLink(e.target.value)}
              />
            </div>
            <button 
              onClick={handleAddDocument}
              className="w-full px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark flex items-center justify-center"
            >
              <MdCloudUpload className="mr-2" />
              Agregar Documento
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center mb-4">
            <MdSearch className="text-gray-500 mr-3" size={24} />
            <input
              type="text"
              placeholder="Filtrar documentos por título..."
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Document List */}
          <div className="space-y-3">
            {filteredDocuments.map(doc => (
              <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <MdFolder className="text-brand-red mr-3" size={24} />
                  <div>
                    <span className="font-semibold">{doc.title}</span>
                    <p className="text-sm text-gray-500">Agregado el: {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <MdLink className="mr-2" />
                    Previsualizar
                  </a>
                  <button 
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <MdDelete className="mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <Tabs
        title="Entregables por Periodicidad - Logística"
        tabs={tabsData}
      />
    </div>
  );
}
