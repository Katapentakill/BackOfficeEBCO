"use client";

import { useState, useEffect } from "react";
import { 
  MdUpload, 
  MdSearch, 
  MdFilterList, 
  MdDownload, 
  MdDelete, 
  MdVisibility,
  MdDescription,
  MdPictureAsPdf,
  MdViewList,
  MdViewModule,
  MdClose,
  MdBook,
  MdCategory,
  MdDateRange,
  MdPerson
} from "react-icons/md";

interface Procedure {
  id: string;
  title: string;
  type: string;
  category: string;
  area: string;
  uploadDate: string;
  version: string;
  uploadedBy: string;
  description?: string;
  fileUrl?: string;
}

interface ProcedureManagerProps {
  title?: string;
}

export default function ProcedureManager({ title = "Procedimientos Operacionales" }: ProcedureManagerProps) {
  const [procedures, setProcedures] = useState<Procedure[]>([
    {
      id: "1",
      title: "Procedimiento de Coordinación de Despachos",
      type: "pdf",
      category: "Logística",
      area: "Área Logística",
      uploadDate: "2025-01-15",
      version: "v2.1",
      uploadedBy: "M. Pérez",
      description: "Procedimiento detallado para la coordinación de despachos de materiales a obra"
    },
    {
      id: "2",
      title: "Procedimiento de Control de Hormigones",
      type: "pdf",
      category: "Calidad",
      area: "Área Logística",
      uploadDate: "2025-01-18",
      version: "v1.3",
      uploadedBy: "C. González",
      description: "Guía para el control y registro de hormigones recibidos en obra"
    },
    {
      id: "3",
      title: "Procedimiento de Gestión de Subcontratos",
      type: "pdf",
      category: "Administración",
      area: "Productos y Soportes",
      uploadDate: "2025-01-10",
      version: "v3.0",
      uploadedBy: "R. Martínez",
      description: "Proceso completo para la gestión de subcontratos y contratistas"
    },
    {
      id: "4",
      title: "Procedimiento de Análisis de Costos",
      type: "pdf",
      category: "Finanzas",
      area: "Análisis de Datos",
      uploadDate: "2025-01-20",
      version: "v2.5",
      uploadedBy: "A. Vargas",
      description: "Metodología para el análisis y seguimiento de costos de proyecto"
    },
    {
      id: "5",
      title: "Procedimiento de Programa y Avances",
      type: "pdf",
      category: "Planificación",
      area: "Análisis de Datos",
      uploadDate: "2025-01-22",
      version: "v1.8",
      uploadedBy: "M. Herrera",
      description: "Procedimiento para el seguimiento de programa y avance físico"
    },
    {
      id: "6",
      title: "Procedimiento de Gestión de Arriendos",
      type: "pdf",
      category: "Logística",
      area: "Área Logística",
      uploadDate: "2025-01-12",
      version: "v2.0",
      uploadedBy: "L. Torres",
      description: "Guía para la gestión de equipos y servicios arrendados"
    },
    {
      id: "7",
      title: "Procedimiento de Especificaciones Técnicas",
      type: "pdf",
      category: "Técnico",
      area: "Productos y Soportes",
      uploadDate: "2025-01-25",
      version: "v1.5",
      uploadedBy: "A. Torres",
      description: "Procedimiento para el manejo de especificaciones técnicas de materiales"
    }
  ]);

  const [filteredProcedures, setFilteredProcedures] = useState(procedures);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArea, setFilterArea] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [previewProcedure, setPreviewProcedure] = useState<Procedure | null>(null);

  const areas = ["all", ...Array.from(new Set(procedures.map(proc => proc.area)))];
  const categories = ["all", ...Array.from(new Set(procedures.map(proc => proc.category)))];

  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "",
    area: "",
    version: "v1.0",
    description: "",
    file: null as File | null
  });

  useEffect(() => {
    let filtered = procedures;

    if (searchTerm) {
      filtered = filtered.filter(proc => 
        proc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterArea !== "all") {
      filtered = filtered.filter(proc => proc.area === filterArea);
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(proc => proc.category === filterCategory);
    }

    setFilteredProcedures(filtered);
  }, [searchTerm, filterArea, filterCategory, procedures]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterArea("all");
    setFilterCategory("all");
    setFilteredProcedures(procedures);
  };

  const handleUpload = () => {
    if (!uploadForm.title || !uploadForm.category || !uploadForm.area || !uploadForm.file) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const newProcedure: Procedure = {
      id: Date.now().toString(),
      title: uploadForm.title,
      type: uploadForm.file.name.split('.').pop() || "pdf",
      category: uploadForm.category,
      area: uploadForm.area,
      uploadDate: new Date().toISOString().split('T')[0],
      version: uploadForm.version,
      uploadedBy: "Usuario Actual", // En producción vendría de auth
      description: uploadForm.description
    };

    setProcedures(prev => [newProcedure, ...prev]);
    setUploadForm({
      title: "",
      category: "",
      area: "",
      version: "v1.0",
      description: "",
      file: null
    });
    setShowUploadModal(false);
    alert("Procedimiento subido exitosamente");
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este procedimiento?")) {
      setProcedures(prev => prev.filter(proc => proc.id !== id));
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <MdPictureAsPdf className="w-5 h-5 text-red-600" />;
      default:
        return <MdDescription className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="mb-12">
      {/* Header Section */}
      <div className="bg-white border rounded-lg p-6 mb-6" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="mb-4">
          <h2 className="text-2xl font-bold ink mb-1">{title}</h2>
          <p className="text-sm text-muted">Busca, consulta y gestiona los procedimientos operacionales del Back Office</p>
        </div>

        {/* Search and Actions Bar */}
        <div className="border-t pt-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar procedimientos por título, descripción o autor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent"
                  style={{ borderColor: "var(--color-brand-line)" }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn btn-outline flex items-center gap-2 ${showFilters ? "bg-brand-red text-white" : ""}`}
              >
                <MdFilterList size={18} />
                <span className="hidden sm:inline">Filtros</span>
              </button>
              <button
                onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
                className="btn btn-outline flex items-center gap-2"
                title={`Cambiar a vista ${viewMode === "list" ? "grid" : "lista"}`}
              >
                {viewMode === "list" ? <MdViewModule size={18} /> : <MdViewList size={18} />}
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn btn-primary flex items-center gap-2"
              >
                <MdUpload size={18} />
                <span>Subir Procedimiento</span>
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4" style={{ borderColor: "var(--color-brand-line)" }}>
              <div>
                <label className="block text-sm font-semibold ink mb-2">Área</label>
                <select
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                >
                  {areas.map(area => (
                    <option key={area} value={area}>
                      {area === "all" ? "Todas las áreas" : area}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold ink mb-2">Categoría</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red-700 focus:border-transparent text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "Todas las categorías" : cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="btn btn-outline w-full"
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t text-sm muted" style={{ borderColor: "var(--color-brand-line)" }}>
            {filteredProcedures.length} procedimiento{filteredProcedures.length !== 1 ? "s" : ""} encontrado{filteredProcedures.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Procedures List/Grid */}
      {filteredProcedures.length === 0 ? (
        <div className="bg-white border rounded-lg p-12 text-center" style={{ borderColor: "var(--color-brand-line)" }}>
          <MdBook className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-semibold ink mb-2">No se encontraron procedimientos</p>
          <p className="text-sm muted mb-6">Intenta ajustar los filtros o sube un nuevo procedimiento</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn btn-primary"
          >
            <MdUpload size={18} className="mr-2" />
            Subir Primer Procedimiento
          </button>
        </div>
      ) : viewMode === "list" ? (
        <div className="bg-white border rounded-lg overflow-hidden" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="divide-y" style={{ borderColor: "var(--color-brand-line)" }}>
            {filteredProcedures.map((procedure) => (
              <div
                key={procedure.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {getFileIcon(procedure.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold ink mb-1">{procedure.title}</h3>
                      {procedure.description && (
                        <p className="text-sm muted mb-2 line-clamp-2">{procedure.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 text-xs muted">
                        <span className="flex items-center gap-1">
                          <MdCategory size={14} />
                          {procedure.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <MdBook size={14} />
                          {procedure.area}
                        </span>
                        <span className="flex items-center gap-1">
                          <MdDateRange size={14} />
                          {new Date(procedure.uploadDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="chip" style={{ background: "#e0e7ff", color: "#6366f1", border: "1px solid #c7d2fe" }}>
                          {procedure.version}
                        </span>
                        <span className="flex items-center gap-1">
                          <MdPerson size={14} />
                          {procedure.uploadedBy}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setPreviewProcedure(procedure)}
                      className="p-2 rounded hover:bg-blue-50 transition-colors"
                      title="Ver detalles"
                    >
                      <MdVisibility className="w-5 h-5" style={{ color: "#3b82f6" }} />
                    </button>
                    <button
                      onClick={() => {
                        // Simulate download
                        alert(`Descargando: ${procedure.title}`);
                      }}
                      className="p-2 rounded hover:bg-green-50 transition-colors"
                      title="Descargar"
                    >
                      <MdDownload className="w-5 h-5" style={{ color: "#16a34a" }} />
                    </button>
                    <button
                      onClick={() => handleDelete(procedure.id)}
                      className="p-2 rounded hover:bg-red-50 transition-colors"
                      title="Eliminar"
                    >
                      <MdDelete className="w-5 h-5" style={{ color: "#ef4444" }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProcedures.map((procedure) => (
            <div
              key={procedure.id}
              className="bg-white border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
              style={{ borderColor: "var(--color-brand-line)" }}
              onClick={() => setPreviewProcedure(procedure)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  {getFileIcon(procedure.type)}
                </div>
                <span className="chip text-xs" style={{ background: "#e0e7ff", color: "#6366f1", border: "1px solid #c7d2fe" }}>
                  {procedure.version}
                </span>
              </div>
              <h3 className="text-base font-bold ink mb-2 line-clamp-2">{procedure.title}</h3>
              {procedure.description && (
                <p className="text-xs muted mb-3 line-clamp-2">{procedure.description}</p>
              )}
              <div className="space-y-1 text-xs muted mb-3">
                <div className="flex items-center gap-1">
                  <MdCategory size={12} />
                  <span>{procedure.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdBook size={12} />
                  <span>{procedure.area}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdPerson size={12} />
                  <span>{procedure.uploadedBy}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t" style={{ borderColor: "var(--color-brand-line)" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewProcedure(procedure);
                  }}
                  className="flex-1 btn btn-outline text-xs py-1.5"
                >
                  <MdVisibility size={14} className="mr-1" />
                  Ver
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Descargando: ${procedure.title}`);
                  }}
                  className="flex-1 btn btn-primary text-xs py-1.5"
                >
                  <MdDownload size={14} className="mr-1" />
                  Descargar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <div>
                <h3 className="text-xl font-bold ink">Subir Nuevo Procedimiento</h3>
                <p className="text-xs text-muted mt-1">Completa la información del procedimiento</p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
                title="Cerrar"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold ink mb-2">
                  Título del Procedimiento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  placeholder="Ej: Procedimiento de Coordinación de Despachos"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold ink mb-2">
                    Área <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={uploadForm.area}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, area: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                  >
                    <option value="">Seleccionar área</option>
                    <option value="Área Logística">Área Logística</option>
                    <option value="Productos y Soportes">Productos y Soportes</option>
                    <option value="Análisis de Datos">Análisis de Datos</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold ink mb-2">
                    Categoría <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="Logística">Logística</option>
                    <option value="Calidad">Calidad</option>
                    <option value="Administración">Administración</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Planificación">Planificación</option>
                    <option value="Técnico">Técnico</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold ink mb-2">Versión</label>
                  <input
                    type="text"
                    value={uploadForm.version}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, version: e.target.value }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                    placeholder="v1.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold ink mb-2">
                    Archivo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setUploadForm(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                    className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                    style={{ borderColor: "var(--color-brand-line)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold ink mb-2">Descripción</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm resize-none"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  rows={3}
                  placeholder="Describe brevemente el contenido del procedimiento..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpload}
                  className="btn btn-primary flex-1"
                >
                  <MdUpload size={18} className="mr-2" />
                  Subir Procedimiento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewProcedure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getFileIcon(previewProcedure.type)}
                  <h3 className="text-xl font-bold ink">{previewProcedure.title}</h3>
                </div>
                <span className="chip text-xs" style={{ background: "#e0e7ff", color: "#6366f1", border: "1px solid #c7d2fe" }}>
                  {previewProcedure.version}
                </span>
              </div>
              <button
                onClick={() => setPreviewProcedure(null)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition-colors"
                title="Cerrar"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-4">
              {previewProcedure.description && (
                <div>
                  <h4 className="text-sm font-bold ink mb-2">Descripción</h4>
                  <p className="text-sm muted">{previewProcedure.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold ink mb-1">Área</h4>
                  <p className="text-sm muted">{previewProcedure.area}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold ink mb-1">Categoría</h4>
                  <p className="text-sm muted">{previewProcedure.category}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold ink mb-1">Fecha de subida</h4>
                  <p className="text-sm muted">
                    {new Date(previewProcedure.uploadDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold ink mb-1">Subido por</h4>
                  <p className="text-sm muted">{previewProcedure.uploadedBy}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex gap-3" style={{ borderColor: "var(--color-brand-line)" }}>
              <button
                onClick={() => {
                  alert(`Descargando: ${previewProcedure.title}`);
                }}
                className="btn btn-primary flex-1"
              >
                <MdDownload size={18} className="mr-2" />
                Descargar Procedimiento
              </button>
              <button
                onClick={() => setPreviewProcedure(null)}
                className="btn btn-outline"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

