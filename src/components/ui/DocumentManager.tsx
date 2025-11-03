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
  MdImage,
  MdPictureAsPdf,
  MdViewList,
  MdViewModule,
  MdOutlineTableChart,
  MdOutlineFolderZip,
  MdClose,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdPerson,
  MdCheckCircle,
  MdWarning,
  MdSchedule
} from "react-icons/md";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  project: string;
  uploadDate: string;
  size: string;
  status: "Aprobado" | "Pendiente" | "Rechazado";
  uploadedBy: string;
  signatures?: {
    required: string[];
    completed: string[];
  };
  previewUrl?: string;
}

interface DocumentManagerProps {
  title?: string;
}

export default function DocumentManager({ title = "Gestión de Documentos" }: DocumentManagerProps) {
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Coordinación Despachos - Enero 2025.pdf",
      type: "pdf",
      category: "Despachos",
      project: "DS-49 Santa Marta",
      uploadDate: "2025-01-15",
      size: "2.4 MB",
      status: "Aprobado",
      uploadedBy: "M. Pérez",
      signatures: {
        required: ["Jefe de Logística", "Coordinador de Obra", "Contador"],
        completed: ["Jefe de Logística", "Coordinador de Obra"]
      }
    },
    {
      id: "2",
      name: "Control Hormigones - Semana 2.xlsx",
      type: "excel",
      category: "Hormigones",
      project: "Torre Central",
      uploadDate: "2025-01-18",
      size: "856 KB",
      status: "Pendiente",
      uploadedBy: "C. González",
      signatures: {
        required: ["Supervisor de Obra", "Jefe de Logística"],
        completed: ["Supervisor de Obra"]
      }
    },
    {
      id: "3",
      name: "Contrato HES - DS-49.pdf",
      type: "pdf",
      category: "Contratos",
      project: "DS-49 Santa Marta",
      uploadDate: "2025-01-10",
      size: "1.8 MB",
      status: "Aprobado",
      uploadedBy: "J. Ramírez",
      signatures: {
        required: ["Gerente General", "Jefe Legal", "Contador"],
        completed: ["Gerente General", "Jefe Legal", "Contador"]
      }
    },
    {
      id: "4",
      name: "Fotografías Obra - Torre Central.zip",
      type: "archive",
      category: "Evidencias",
      project: "Torre Central",
      uploadDate: "2025-01-20",
      size: "45.2 MB",
      status: "Aprobado",
      uploadedBy: "A. Silva",
      signatures: {
        required: ["Supervisor de Obra"],
        completed: ["Supervisor de Obra"]
      }
    },
    {
      id: "5",
      name: "Control Pérdida Hormigones - Enero.xlsx",
      type: "excel",
      category: "Hormigones",
      project: "Conjunto Las Palmas",
      uploadDate: "2025-01-22",
      size: "1.1 MB",
      status: "Rechazado",
      uploadedBy: "M. Pérez",
      signatures: {
        required: ["Jefe de Logística", "Supervisor de Calidad"],
        completed: []
      }
    },
    {
      id: "6",
      name: "Planos Estructurales - Revisión.pdf",
      type: "pdf",
      category: "Planos",
      project: "Residencial Norte",
      uploadDate: "2025-01-12",
      size: "12.5 MB",
      status: "Pendiente",
      uploadedBy: "L. Torres",
      signatures: {
        required: ["Ingeniero Proyectista", "Jefe de Obra", "Director de Proyecto"],
        completed: ["Ingeniero Proyectista"]
      }
    },
    {
      id: "7",
      name: "Reporte Materiales - Semana 3.xlsx",
      type: "excel",
      category: "Despachos",
      project: "Torre Central",
      uploadDate: "2025-01-25",
      size: "2.1 MB",
      status: "Aprobado",
      uploadedBy: "M. Pérez",
      signatures: {
        required: ["Jefe de Logística"],
        completed: ["Jefe de Logística"]
      }
    },
    {
      id: "8",
      name: "Contrato Arriendo - Moldajes.pdf",
      type: "pdf",
      category: "Contratos",
      project: "DS-49 Santa Marta",
      uploadDate: "2025-01-28",
      size: "3.2 MB",
      status: "Pendiente",
      uploadedBy: "J. Ramírez",
      signatures: {
        required: ["Gerente de Proyecto", "Jefe Legal", "Contador"],
        completed: ["Gerente de Proyecto"]
      }
    }
  ]);

  const [filteredDocs, setFilteredDocs] = useState(documents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProject, setFilterProject] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);

  const projects = ["all", ...Array.from(new Set(documents.map(doc => doc.project)))];
  const categories = ["all", ...Array.from(new Set(documents.map(doc => doc.category)))];
  const statuses = ["all", "Aprobado", "Pendiente", "Rechazado"];

  useEffect(() => {
    let filtered = documents;

    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterProject !== "all") {
      filtered = filtered.filter(doc => doc.project === filterProject);
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(doc => doc.category === filterCategory);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(doc => doc.status === filterStatus);
    }

    setFilteredDocs(filtered);
    // Clear selection when filters change
    setSelectedDocs(new Set());
  }, [searchTerm, filterProject, filterCategory, filterStatus, documents]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterProject("all");
    setFilterCategory("all");
    setFilterStatus("all");
    setFilteredDocs(documents);
  };

  // Selection handlers
  const toggleSelectDoc = (docId: string) => {
    setSelectedDocs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(docId)) {
        newSet.delete(docId);
      } else {
        newSet.add(docId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedDocs.size === filteredDocs.length && filteredDocs.length > 0) {
      setSelectedDocs(new Set());
    } else {
      setSelectedDocs(new Set(filteredDocs.map(doc => doc.id)));
    }
  };

  const handleBatchDownload = () => {
    if (selectedDocs.size === 0) return;
    // Simulate batch download
    const selectedNames = Array.from(selectedDocs).map(id => 
      documents.find(d => d.id === id)?.name
    ).filter(Boolean);
    alert(`Descargando ${selectedDocs.size} documento(s) como ZIP:\n${selectedNames.join('\n')}`);
    // In real app, this would trigger a download
  };

  const handleBatchDelete = () => {
    if (selectedDocs.size === 0) return;
    const count = selectedDocs.size;
    if (confirm(`¿Estás seguro de eliminar ${count} documento(s) seleccionado(s)?`)) {
      // In real app, this would delete the documents
      setSelectedDocs(new Set());
      alert(`${count} documento(s) eliminado(s)`);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <MdPictureAsPdf className="w-5 h-5 text-red-600" />;
      case "excel":
        return <MdOutlineTableChart className="w-5 h-5 text-green-600" />;
      case "archive":
        return <MdOutlineFolderZip className="w-5 h-5 text-purple-600" />;
      default:
        return <MdDescription className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprobado":
        return { bg: "#dcfce7", color: "#16a34a", border: "#bbf7d0" };
      case "Pendiente":
        return { bg: "#fef3c7", color: "#f59e0b", border: "#fde68a" };
      case "Rechazado":
        return { bg: "#fee2e2", color: "#ef4444", border: "#fecaca" };
      default:
        return { bg: "#f1f5f9", color: "#64748b", border: "#e2e8f0" };
    }
  };

  return (
    <div className="mb-12">
      {/* Header Section */}
      <div className="bg-white border rounded-lg p-6 mb-6" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="mb-4">
          <h2 className="text-2xl font-bold ink mb-1">{title}</h2>
          <p className="text-sm text-muted">Gestiona y organiza todos los documentos del área</p>
        </div>

        {/* Filters and Actions Bar */}
        <div className="border-t pt-4" style={{ borderColor: "var(--color-brand-line)" }}>
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nombre o usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                style={{ borderColor: "var(--color-brand-line)" }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--color-brand-red)";
                  e.target.style.boxShadow = "0 0 0 4px rgba(227,6,19,.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--color-brand-line)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 border rounded-lg p-1" style={{ borderColor: "var(--color-brand-line)" }}>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "table"
                    ? "bg-brand text-white"
                    : "hover:bg-brand-bg-light"
                }`}
                title="Vista de tabla"
              >
                <MdViewList size={20} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "grid"
                    ? "bg-brand text-white"
                    : "hover:bg-brand-bg-light"
                }`}
                title="Vista de cuadrícula"
              >
                <MdViewModule size={20} />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn ${showFilters ? 'btn-primary' : 'btn-outline'} flex items-center justify-center gap-2 whitespace-nowrap`}
            >
              <MdFilterList size={18} />
              <span>Filtros</span>
            </button>

            {/* Upload Button */}
            <button 
              onClick={() => setShowUploadModal(true)}
              className="btn btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <MdUpload size={18} />
              <span>Subir Documento</span>
            </button>

            {/* Reset */}
            {(searchTerm || filterProject !== "all" || filterCategory !== "all" || filterStatus !== "all") && (
              <button
                onClick={resetFilters}
                className="btn btn-outline whitespace-nowrap"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4" style={{ borderColor: "var(--color-brand-line)" }}>
              {/* Project Filter - First */}
              <div>
                <label className="block text-sm font-semibold ink mb-2">Proyecto</label>
                <select
                  value={filterProject}
                  onChange={(e) => setFilterProject(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand-red)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(227,6,19,.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--color-brand-line)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {projects.map(project => (
                    <option key={project} value={project}>
                      {project === "all" ? "Todos los proyectos" : project}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold ink mb-2">Categoría</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand-red)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(227,6,19,.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--color-brand-line)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "Todas las categorías" : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold ink mb-2">Estado</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand-red)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(227,6,19,.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--color-brand-line)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === "all" ? "Todos los estados" : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Batch Actions Bar */}
      {selectedDocs.size > 0 && (
        <div className="bg-brand-red text-white rounded-lg p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold">
              {selectedDocs.size} documento{selectedDocs.size !== 1 ? 's' : ''} seleccionado{selectedDocs.size !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBatchDownload}
              className="btn bg-white text-brand-red hover:bg-gray-100 flex items-center gap-2"
            >
              <MdOutlineFolderZip size={18} />
              <span>Descargar seleccionados (.zip)</span>
            </button>
            <button
              onClick={handleBatchDelete}
              className="btn bg-white text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <MdDelete size={18} />
              <span>Eliminar seleccionados</span>
            </button>
            <button
              onClick={() => setSelectedDocs(new Set())}
              className="btn bg-white text-gray-600 hover:bg-gray-100 flex items-center gap-2"
            >
              <MdClose size={18} />
              <span>Cancelar</span>
            </button>
          </div>
        </div>
      )}

      {/* Documents View */}
      {viewMode === "table" ? (
        /* Table View */
        <div className="bg-white border rounded-lg overflow-hidden" style={{ borderColor: "var(--color-brand-line)" }}>
          <table className="w-full">
            <thead>
              <tr className="bg-[#fafafa] border-b" style={{ borderColor: "var(--color-brand-line)" }}>
                <th className="text-center px-4 py-3 text-sm font-semibold ink w-12">
                  <button
                    onClick={toggleSelectAll}
                    className="p-1 rounded hover:bg-gray-200 transition-colors"
                    title={selectedDocs.size === filteredDocs.length && filteredDocs.length > 0 ? "Deseleccionar todos" : "Seleccionar todos"}
                  >
                    {selectedDocs.size === filteredDocs.length && filteredDocs.length > 0 ? (
                      <MdCheckBox className="w-5 h-5" style={{ color: "var(--color-brand-red)" }} />
                    ) : (
                      <MdCheckBoxOutlineBlank className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Documento</th>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Proyecto</th>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Categoría</th>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Tamaño</th>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Fecha</th>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Estado</th>
                <th className="text-left px-4 py-3 text-sm font-semibold ink">Subido por</th>
                <th className="text-center px-4 py-3 text-sm font-semibold ink">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-sm muted">
                    No se encontraron documentos con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => {
                  const statusStyle = getStatusColor(doc.status);
                  const isSelected = selectedDocs.has(doc.id);
                  return (
                    <tr
                      key={doc.id}
                      className={`border-b hover:bg-[#fcfcfc] transition-colors ${isSelected ? 'bg-blue-50' : ''}`}
                      style={{ borderColor: "var(--color-brand-line)" }}
                    >
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleSelectDoc(doc.id)}
                          className="p-1 rounded hover:bg-gray-200 transition-colors"
                          title={isSelected ? "Deseleccionar" : "Seleccionar"}
                        >
                          {isSelected ? (
                            <MdCheckBox className="w-5 h-5" style={{ color: "var(--color-brand-red)" }} />
                          ) : (
                            <MdCheckBoxOutlineBlank className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {getFileIcon(doc.type)}
                          <span className="text-sm ink font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="chip" style={{ background: "#e0e7ff", color: "#6366f1", border: "1px solid #c7d2fe" }}>
                          {doc.project}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="chip" style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #e2e8f0" }}>
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm muted">{doc.size}</td>
                      <td className="px-4 py-3 text-sm muted">{new Date(doc.uploadDate).toLocaleDateString('es-ES')}</td>
                      <td className="px-4 py-3">
                        <span
                          className="chip"
                          style={{
                            background: statusStyle.bg,
                            color: statusStyle.color,
                            border: `1px solid ${statusStyle.border}`
                          }}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm muted">{doc.uploadedBy}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => setPreviewDoc(doc)}
                            className="p-2 rounded hover:bg-[#f1f5f9]" 
                            title="Ver vista previa"
                          >
                            <MdVisibility className="w-5 h-5" style={{ color: "#3b82f6" }} />
                          </button>
                          <button className="p-2 rounded hover:bg-[#f0fdf4]" title="Descargar">
                            <MdDownload className="w-5 h-5" style={{ color: "#16a34a" }} />
                          </button>
                          <button className="p-2 rounded hover:bg-[#fef2f2]" title="Eliminar">
                            <MdDelete className="w-5 h-5" style={{ color: "#ef4444" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="bg-white border rounded-lg p-6" style={{ borderColor: "var(--color-brand-line)" }}>
          {filteredDocs.length === 0 ? (
            <div className="text-center py-12">
              <MdDescription className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-sm muted">No se encontraron documentos con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocs.map((doc) => {
                const statusStyle = getStatusColor(doc.status);
                const isSelected = selectedDocs.has(doc.id);
                return (
                  <div
                    key={doc.id}
                    className={`border rounded-lg p-4 hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer ${
                      isSelected ? 'ring-2 ring-brand-red bg-blue-50' : ''
                    }`}
                    style={{ borderColor: "var(--color-brand-line)" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 flex-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelectDoc(doc.id);
                          }}
                          className="p-1 rounded hover:bg-gray-200 transition-colors flex-shrink-0"
                          title={isSelected ? "Deseleccionar" : "Seleccionar"}
                        >
                          {isSelected ? (
                            <MdCheckBox className="w-5 h-5" style={{ color: "var(--color-brand-red)" }} />
                          ) : (
                            <MdCheckBoxOutlineBlank className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <div className="flex-1">
                          {getFileIcon(doc.type)}
                        </div>
                      </div>
                      <span
                        className="chip text-xs"
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: `1px solid ${statusStyle.border}`
                        }}
                      >
                        {doc.status}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-semibold ink mb-2 line-clamp-2">{doc.name}</h4>
                    
                    <div className="space-y-2 mb-3">
                      <div>
                        <span className="text-xs muted">Proyecto:</span>
                        <span className="chip text-xs ml-1" style={{ background: "#e0e7ff", color: "#6366f1", border: "1px solid #c7d2fe" }}>
                          {doc.project}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs muted">Categoría:</span>
                        <span className="chip text-xs ml-1" style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #e2e8f0" }}>
                          {doc.category}
                        </span>
                      </div>
                      <div className="text-xs muted">
                        📅 {new Date(doc.uploadDate).toLocaleDateString('es-ES')}
                      </div>
                      <div className="text-xs muted">
                        📏 {doc.size}
                      </div>
                      <div className="text-xs muted">
                        👤 {doc.uploadedBy}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-3 border-t" style={{ borderColor: "var(--color-brand-line)" }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewDoc(doc);
                        }}
                        className="p-2 rounded hover:bg-[#f1f5f9]" 
                        title="Ver vista previa"
                      >
                        <MdVisibility className="w-4 h-4" style={{ color: "#3b82f6" }} />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded hover:bg-[#f0fdf4]" 
                        title="Descargar"
                      >
                        <MdDownload className="w-4 h-4" style={{ color: "#16a34a" }} />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded hover:bg-[#fef2f2]" 
                        title="Eliminar"
                      >
                        <MdDelete className="w-4 h-4" style={{ color: "#ef4444" }} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Preview Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <div className="flex items-center gap-3 flex-1">
                {getFileIcon(previewDoc.type)}
                <div className="flex-1">
                  <h3 className="text-lg font-bold ink">{previewDoc.name}</h3>
                  <p className="text-sm muted mt-1">
                    {previewDoc.project} • {previewDoc.category} • {previewDoc.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    // Download action
                    alert(`Descargando: ${previewDoc.name}`);
                  }}
                  className="btn btn-outline flex items-center gap-2"
                >
                  <MdDownload size={18} />
                  <span>Descargar</span>
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition-colors"
                  title="Cerrar"
                >
                  <MdClose size={24} />
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto p-6 bg-gray-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Document Preview Section */}
                <div className="bg-white rounded-lg border p-6" style={{ borderColor: "var(--color-brand-line)" }}>
                  <h4 className="text-sm font-bold ink mb-4">Vista Previa del Documento</h4>
                  {previewDoc.type.toLowerCase() === "pdf" ? (
                    <div className="text-center">
                      <div className="bg-red-50 rounded-lg p-8 mb-4">
                        <MdPictureAsPdf className="w-16 h-16 mx-auto mb-3 text-red-600" />
                        <p className="text-sm font-semibold ink mb-1">Documento PDF</p>
                        <p className="text-xs muted">{previewDoc.size}</p>
                      </div>
                      <p className="text-xs muted mb-4">Vista previa de PDF disponible (en producción se mostraría el documento)</p>
                      <button className="btn btn-outline w-full text-sm">
                        Ver Documento Completo
                      </button>
                    </div>
                  ) : previewDoc.type.toLowerCase() === "excel" ? (
                    <div className="text-center">
                      <div className="bg-green-50 rounded-lg p-8 mb-4">
                        <MdOutlineTableChart className="w-16 h-16 mx-auto mb-3 text-green-600" />
                        <p className="text-sm font-semibold ink mb-1">Archivo Excel</p>
                        <p className="text-xs muted">{previewDoc.size}</p>
                      </div>
                      <p className="text-xs muted mb-4">Vista previa de Excel disponible (en producción se mostraría la hoja de cálculo)</p>
                      <button className="btn btn-outline w-full text-sm">
                        Ver Hoja de Cálculo
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="bg-purple-50 rounded-lg p-8 mb-4">
                        <MdOutlineFolderZip className="w-16 h-16 mx-auto mb-3 text-purple-600" />
                        <p className="text-sm font-semibold ink mb-1">Archivo Comprimido</p>
                        <p className="text-xs muted">{previewDoc.size}</p>
                      </div>
                      <p className="text-xs muted mb-4">Vista previa no disponible para archivos comprimidos</p>
                      <button className="btn btn-outline w-full text-sm">
                        Descargar para Ver Contenido
                      </button>
                    </div>
                  )}
                </div>

                {/* Document Info & Signatures Section */}
                <div className="space-y-4">
                  {/* Document Information */}
                  <div className="bg-white rounded-lg border p-4" style={{ borderColor: "var(--color-brand-line)" }}>
                    <h4 className="text-sm font-bold ink mb-3">Información del Documento</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
                        <span className="font-semibold ink">Proyecto:</span>
                        <span className="chip text-xs" style={{ background: "#e0e7ff", color: "#6366f1", border: "1px solid #c7d2fe" }}>
                          {previewDoc.project}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
                        <span className="font-semibold ink">Categoría:</span>
                        <span className="chip text-xs" style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #e2e8f0" }}>
                          {previewDoc.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
                        <span className="font-semibold ink">Estado:</span>
                        <span
                          className="chip text-xs"
                          style={{
                            background: getStatusColor(previewDoc.status).bg,
                            color: getStatusColor(previewDoc.status).color,
                            border: `1px solid ${getStatusColor(previewDoc.status).border}`
                          }}
                        >
                          {previewDoc.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
                        <span className="font-semibold ink">Subido por:</span>
                        <span className="muted">{previewDoc.uploadedBy}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="font-semibold ink">Fecha de carga:</span>
                        <span className="muted">{new Date(previewDoc.uploadDate).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Signatures Section */}
                  {previewDoc.signatures && (
                    <div className="bg-white rounded-lg border p-4" style={{ borderColor: "var(--color-brand-line)" }}>
                      <h4 className="text-sm font-bold ink mb-3 flex items-center gap-2">
                        <MdPerson className="w-4 h-4" />
                        Estado de Firmas
                      </h4>
                      
                      {(() => {
                        const missingSignatures = previewDoc.signatures!.required.filter(
                          sig => !previewDoc.signatures!.completed.includes(sig)
                        );
                        const allCompleted = missingSignatures.length === 0;
                        
                        return (
                          <div className="space-y-3">
                            {/* Status */}
                            <div className={`p-3 rounded-lg ${allCompleted ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                              <div className="flex items-center gap-2 mb-2">
                                {allCompleted ? (
                                  <MdCheckCircle className="w-5 h-5 text-green-600" />
                                ) : (
                                  <MdWarning className="w-5 h-5 text-yellow-600" />
                                )}
                                <span className={`text-sm font-semibold ${allCompleted ? 'text-green-700' : 'text-yellow-700'}`}>
                                  {allCompleted 
                                    ? "Todas las firmas completadas" 
                                    : `Faltan ${missingSignatures.length} firma${missingSignatures.length !== 1 ? 's' : ''}`}
                                </span>
                              </div>
                              <p className="text-xs muted">
                                {previewDoc.signatures.completed.length} de {previewDoc.signatures.required.length} firmas recibidas
                              </p>
                            </div>

                            {/* Completed Signatures */}
                            {previewDoc.signatures.completed.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold ink mb-2">Firmas Completadas:</p>
                                <div className="space-y-1">
                                  {previewDoc.signatures.completed.map((sig, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                                      <MdCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                      <span className="text-xs text-green-700">{sig}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Missing Signatures */}
                            {missingSignatures.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold ink mb-2">Firmas Pendientes:</p>
                                <div className="space-y-1">
                                  {missingSignatures.map((sig, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-2 bg-red-50 rounded border border-red-200">
                                      <MdSchedule className="w-4 h-4 text-red-600 flex-shrink-0" />
                                      <span className="text-xs text-red-700 font-medium">{sig}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <div>
                <h3 className="text-xl font-bold ink">Subir Documento</h3>
                <p className="text-xs text-muted mt-1">Completa la información del documento</p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
                title="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold ink mb-3">Seleccionar archivo</label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center transition-colors hover:bg-brand-bg-light cursor-pointer" style={{ borderColor: "var(--color-brand-line)" }}>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-brand-bg-light flex items-center justify-center mb-3">
                      <MdUpload className="w-8 h-8" style={{ color: "var(--color-brand-red)" }} />
                    </div>
                    <p className="text-sm font-medium ink mb-1">Arrastra y suelta archivos aquí</p>
                    <p className="text-xs text-muted mb-3">o</p>
                    <button className="btn btn-outline text-sm">
                      Buscar archivo
                    </button>
                    <p className="text-xs text-muted mt-4">Formatos: PDF, Excel, Imágenes (max 50MB)</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold ink mb-2">Proyecto</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand-red)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(227,6,19,.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--color-brand-line)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="">Selecciona un proyecto</option>
                  {projects.filter(p => p !== "all").map(project => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold ink mb-2">Categoría</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand-red)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(227,6,19,.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--color-brand-line)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.filter(cat => cat !== "all").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold ink mb-2">Descripción (opcional)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  style={{ borderColor: "var(--color-brand-line)" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand-red)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(227,6,19,.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--color-brand-line)";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Agrega una descripción del documento..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="btn btn-primary flex-1"
                >
                  Subir
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
