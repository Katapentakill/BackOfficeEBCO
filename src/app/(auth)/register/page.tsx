export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg-light">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-brand-red mb-6 text-center">
          Crear Cuenta
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Completa el formulario para registrarte
        </p>

        {/* Placeholder - implementar RegisterForm en modules/auth/components */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          Componente RegisterForm disponible en: src/modules/auth/components/RegisterForm.tsx
        </div>

        <p className="text-center text-sm mt-6 text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-brand-red font-semibold hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
