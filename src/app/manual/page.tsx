"use client";

import { MdLocalShipping, MdShoppingCart, MdAnalytics, MdDownload, MdBook, MdSearch } from "react-icons/md";
import InfoCard from "@/components/ui/InfoCard";
import ProcedureManager from "@/components/ui/ProcedureManager";

export default function ManualPage() {
  return (
    <div className="p-8">
      {/* Header Banner */}
      <div className="bg-brand-red text-brand-text-light py-8 px-8 rounded-lg mb-12">
        <h1 className="text-4xl font-bold">MANUAL DE SOPORTE</h1>
        <p className="text-lg mt-2 opacity-90">Documentación completa del Back Office</p>
      </div>

      {/* Introduction */}
      <section className="mb-12 bg-brand-bg-white p-8 rounded-lg shadow-md border" style={{ borderColor: "var(--color-brand-line)" }}>
        <h2 className="text-2xl font-bold text-brand-red mb-4">Bienvenida</h2>
        <p className="text-brand-text-dark leading-relaxed">
          Este manual de soporte contiene toda la información necesaria para entender la estructura,
          procesos y responsabilidades del Back Office. Cada sección detalla las funciones de las
          diferentes áreas, los entregables esperados y los procedimientos operacionales clave.
        </p>
      </section>

      {/* Procedure Manager */}
      <ProcedureManager title="Procedimientos Operacionales" />

      {/* Main Areas */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-brand-red mb-8">Áreas Principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<MdLocalShipping size={40} />}
            title="Área Logística"
            description="Gestión de materiales, arriendos de equipos y servicios externos para garantizar el abastecimiento oportuno."
            buttonText="Ir a Logística"
            buttonLink="/logistica"
          />
          <InfoCard
            icon={<MdShoppingCart size={40} />}
            title="Productos y Soportes"
            description="Administración de subcontratos y especificaciones técnicas de materiales para proyectos BETT."
            buttonText="Ir a Productos"
            buttonLink="/productos"
          />
          <InfoCard
            icon={<MdAnalytics size={40} />}
            title="Análisis de Datos"
            description="Seguimiento financiero, programación de trabajos y análisis de desempeño operacional."
            buttonText="Ir a Análisis"
            buttonLink="/analisis"
          />
        </div>
      </section>

      {/* Key Concepts */}
      <section className="mb-12 bg-brand-bg-white p-8 rounded-lg shadow-md border" style={{ borderColor: "var(--color-brand-line)" }}>
        <h2 className="text-2xl font-bold text-brand-red mb-6">Conceptos Clave</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-brand-red pl-4">
            <h3 className="font-bold text-brand-red mb-2">Organización</h3>
            <p className="text-sm text-brand-text-dark">
              El Back Office se estructura bajo un Coordinador con tres áreas estratégicas que
              trabajan de manera integrada para el éxito de los proyectos.
            </p>
          </div>
          <div className="border-l-4 border-brand-red pl-4">
            <h3 className="font-bold text-brand-red mb-2">Entregables</h3>
            <p className="text-sm text-brand-text-dark">
              Cada área produce entregables específicos con diferentes periodicidades: diarios,
              semanales, quincenales y mensuales.
            </p>
          </div>
          <div className="border-l-4 border-brand-red pl-4">
            <h3 className="font-bold text-brand-red mb-2">Eficiencia</h3>
            <p className="text-sm text-brand-text-dark">
              Todos los procesos están diseñados para maximizar la eficiencia operacional y
              minimizar riesgos en la ejecución de proyectos.
            </p>
          </div>
          <div className="border-l-4 border-brand-red pl-4">
            <h3 className="font-bold text-brand-red mb-2">Documentación</h3>
            <p className="text-sm text-brand-text-dark">
              La trazabilidad y documentación de todos los procesos es fundamental para garantizar
              calidad y cumplimiento contractual.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-brand-red mb-6">Acceso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/logistica"
            className="bg-brand-dark hover:bg-gray-800 text-brand-text-light p-4 rounded-lg transition-colors flex items-center space-x-3"
          >
            <MdLocalShipping size={24} className="text-brand-red" />
            <span className="font-semibold">Área Logística</span>
          </a>
          <a
            href="/productos"
            className="bg-brand-dark hover:bg-gray-800 text-brand-text-light p-4 rounded-lg transition-colors flex items-center space-x-3"
          >
            <MdShoppingCart size={24} className="text-brand-red" />
            <span className="font-semibold">Productos y Soportes</span>
          </a>
          <a
            href="/analisis"
            className="bg-brand-dark hover:bg-gray-800 text-brand-text-light p-4 rounded-lg transition-colors flex items-center space-x-3"
          >
            <MdAnalytics size={24} className="text-brand-red" />
            <span className="font-semibold">Análisis de Datos</span>
          </a>
          <a
            href="/organigrama"
            className="bg-brand-dark hover:bg-gray-800 text-brand-text-light p-4 rounded-lg transition-colors flex items-center space-x-3"
          >
            <MdAnalytics size={24} className="text-brand-red" />
            <span className="font-semibold">Organigrama</span>
          </a>
        </div>
      </section>

      {/* Download Section */}
      <section className="bg-brand-bg-light p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-brand-red mb-4">Descargar Manual Completo</h2>
        <p className="text-brand-text-dark mb-6">
          Obtén una versión PDF del manual para consulta offline
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="btn btn-primary">
            <span className="flex items-center gap-2"><span>Descargar PDF</span><MdDownload size={20} /></span>
          </button>
          <button className="btn btn-outline">Ver en línea</button>
        </div>
      </section>
    </div>
  );
}
