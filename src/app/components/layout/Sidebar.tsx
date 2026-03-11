import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { CalendarDays, LayoutDashboard, ShoppingCart, Store, LogOut } from "lucide-react";
import { Button } from "../ui/button"

const menuItems = [
  { path: "/pedidos", label: "Pedidos", icon: ShoppingCart },
  { path: "/proveedores", label: "Proveedores", icon: Store },
  { path: "/calendario", label: "Calendario", icon:CalendarDays },
  { path: "/reportes", label: "Reportes", icon:LayoutDashboard },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const {logout}= useAuth();

  const handleLogout = ()=>{
    logout();
    navigate("/");
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/pedidos");
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-yellow-500 text-gray-900 flex flex-col h-screen">
      <div className="p-6 border-b border-yellow-600">
        <div className="flex justify-center">
          <img src="/BSI.png"
           alt= "Logo"
           className="w-25 h-auto rounded"/>
        </div>
        <h1 className="font-semibold text-gray-900">Sistema de Compras</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? "bg-red-600 text-white"
                      : "text-gray-900 hover:bg-yellow-600 hover:text-gray-900"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-yellow-600">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
            <span className="text-sm text-white">AD</span>
          </div>
          <div>
            
            <p className="text-sm text-gray-900">Admin</p>
            <p className="text-xs text-gray-800">Administrador</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-900 hover:bg-yellow-600 hover:text-gray-900"
        >
          <LogOut size={20} className="mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
}