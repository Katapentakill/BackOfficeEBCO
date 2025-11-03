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
  MdPictureAsPdf
} from "react-icons/md";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
  size: string;
  status: "Aprobado" | "Pendiente" | "Rechazado";
  uploadedBy: string;
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
      uploadDate: "2025-01-15",
      size: "2.4 MB",
      status: "Aprobado",
      uploadedBy: "M. Pérez"
    },
    {
      id: "2",
      name: "Control Hormigones - Semana 2.xlsx",
      type: "excel",
      category: "Hormigones",
      uploadDate: "2025-01-18",
      size: "856 KB",
      status: "Pendiente",
      uploadedBy: "C. González"
    },
    {
      id: "3",
      name: "Contrato HES - DS-49.pdf",
      type: "pdf",
      category: "Contratos",
      uploadDate: "2025-01-10",
      size: "1.8 MB",
      status: "Aprobado",
      uploadedBy: "J. Ramírez"
    },
    {
      id: "4",
      name: "Fotografías Obra - Torre Central.zip",
      type: "archive",
      category: "Evidencias",
      uploadDate: "2025-01-20",
      size: "45.2 MB",
      status: "Aprobado",
      uploadedBy: "A. Silva"
    },
    {
      id: "5",
      name: "Control Pérdida Hormigones - Enero.xlsx",
      type: "excel",
      category: "Hormigones",
      uploadDate: "2025-01-22",
      size: "1.1 MB",
      status: "Rechazado",
      uploadedBy: "M. Pérez"
    },
    {
      id: "6",
      name: "Planos Estructurales - Revisión.pdf",
      type: "pdf",
      category: "Planos",
      uploadDate: "2025-01-12",
      size: "12.5 MB",
      status: "Pendiente",
      uploadedBy: "L. Torres"
    }
  ]);

  const [filteredDocs, setFilteredDocs] = useState(documents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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

    if (filterCategory !== "all") {
      filtered = filtered.filter(doc => doc.category === filterCategory);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(doc => doc.status === filterStatus);
    }

    setFilteredDocs(filtered);
  }, [searchTerm, filterCategory, filterStatus, documents]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterCategory("all");
    setFilterStatus("all");
    setFilteredDocs(documents);
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <MdPictureAsPdf className="w-5 h-5 text-red-600" />;
      case "excel":
        return <MdDescription className="w-5 h-5 text-green-600" />;
      case "archive":
        return <MdImage className="w-5 h-5 text-blue-600" />;
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
      {/* Header Section with Upload Button */}
      <div className="bg-white border rounded-lg p-6 mb-6" style={{ borderColor: "var(--color-brand-line)" }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold ink mb-1">{title}</h2>
            <p className="text-sm text-muted">Gestiona y organiza todos los documentos del área</p>
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="btn btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <MdUpload size={20} />
            <span>Subir Documento</span>
          </button>
        </div>

          <div className="flex flex-col md:flex-row gap-3">
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

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'btn-primary' : 'btn-outline'} flex items-center justify-center gap-2 whitespace-nowrap`}
          >
            <MdFilterList size={18} />
            <span>Filtros</span>
          </button>

          {/* Reset */}
          {(searchTerm || filterCategory !== "all" || filterStatus !== "all") && (
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
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4" style={{ borderColor: "var(--color-brand-line)" }}>
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

      {/* Documents Table */}
      <div className="bg-white border rounded-lg overflow-hidden" style={{ borderColor: "var(--color-brand-line)" }}>
        <table className="w-full">
          <thead>
            <tr className="bg-[#fafafa] border-b" style={{ borderColor: "var(--color-brand-line)" }}>
              <th className="text-left px-4 py-3 text-sm font-semibold ink">Documento</th>
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
                <td colSpan={7} className="px-4 py-8 text-center text-sm muted">
                  No se encontraron documentos con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              filteredDocs.map((doc) => {
                const statusStyle = getStatusColor(doc.status);
                return (
                  <tr
                    key={doc.id}
                    className="border-b hover:bg-[#fcfcfc] transition-colors"
                    style={{ borderColor: "var(--color-brand-line)" }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getFileIcon(doc.type)}
                        <span className="text-sm ink font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="chip" style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #e2e8f0" }}>
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm muted">{doc.size}</td>
                    <td className="px-4 py-3 text-sm muted">{doc.uploadDate}</td>
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
                        <button className="p-2 rounded hover:bg-[#f1f5f9]" title="Ver">
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
                <label className="block text-sm font-semibold ink mb-2">Categoría</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  style={{ borderColor: "var(--color-brand-line)" }}
                >
                  <option>Despachos</option>
                  <option>Hormigones</option>
                  <option>Contratos</option>
                  <option>Evidencias</option>
                  <option>Planos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold ink mb-2">Descripción (opcional)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  style={{ borderColor: "var(--color-brand-line)" }}
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

