import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { ShoppingCart, Mail, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/pedidos");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Yellow panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-yellow-500 items-center justify-center p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-50 h-50 bg-red-600 rounded-full mb-6">
            <img src="/BSI.png"
            alt= "Logo"
            className="w-100 h-auto rounded"/>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Gestión de Compras
          </h1>
          <p className="text-xl text-gray-800">
            Administra tus pedidos y proveedores de forma eficiente
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 rounded-full mb-4">
              <ShoppingCart size={36} className="text-gray-900" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Sistema de Compras
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-red-600 mb-2">
              Iniciar Sesión
            </h2>
            <p className="text-gray-600">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-900">
                Contraseña
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="•••••���••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-6"
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Usuario de prueba: cualquier email y contraseña
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}