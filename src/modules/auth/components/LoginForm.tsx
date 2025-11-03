"use client";

import { useState } from "react";

/**
 * Componente LoginForm
 *
 * Implementación completa disponible en FLUJO_DESARROLLO.md
 * en la sección "PASO 2.5: Crear componente"
 */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implementar lógica de login usando useLogin hook
      // Ver FLUJO_DESARROLLO.md para ejemplo completo
      console.log("Login:", { email, password });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
          placeholder="tu@email.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-red text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50 font-semibold transition-opacity"
      >
        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </button>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-700">
        <p className="font-semibold mb-1">⚠️ Implementación incompleta</p>
        <p>Ver FLUJO_DESARROLLO.md para la implementación completa con:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>useLogin hook</li>
          <li>authService</li>
          <li>AuthProvider</li>
          <li>Integración con backend</li>
        </ul>
      </div>
    </form>
  );
}

export default LoginForm;
