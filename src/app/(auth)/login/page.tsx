import { LoginForm } from "@/modules/auth/components";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg-light">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-brand-red mb-6 text-center">
          Back Office EBCO
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Inicia sesión para continuar
        </p>

        <LoginForm />

        <p className="text-center text-sm mt-6 text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-brand-red font-semibold hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
