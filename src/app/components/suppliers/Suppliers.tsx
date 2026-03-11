import { useState } from "react";
import { Search, Plus, Mail, Phone, MapPin, Star, Filter } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  totalOrders: number;
  status: "Activo" | "Inactivo";
}

const suppliers: Supplier[] = [
  {
    id: "SUP-001",
    name: "Proveedor ABC",
    category: "Materiales de Construcción",
    contact: "Juan Pérez",
    email: "juan@proveedorabc.com",
    phone: "+34 123 456 789",
    address: "Calle Principal 123, Madrid",
    rating: 4.5,
    totalOrders: 45,
    status: "Activo"
  },
  {
    id: "SUP-002",
    name: "Materiales XYZ",
    category: "Suministros Industriales",
    contact: "María García",
    email: "maria@materialesxyz.com",
    phone: "+34 234 567 890",
    address: "Av. Industria 456, Barcelona",
    rating: 4.8,
    totalOrders: 68,
    status: "Activo"
  },
  {
    id: "SUP-003",
    name: "Suministros Global",
    category: "Equipamiento",
    contact: "Carlos Rodríguez",
    email: "carlos@sumglobal.com",
    phone: "+34 345 678 901",
    address: "Plaza Central 789, Valencia",
    rating: 4.2,
    totalOrders: 32,
    status: "Activo"
  },
  {
    id: "SUP-004",
    name: "Tech Solutions",
    category: "Tecnología",
    contact: "Ana Martínez",
    email: "ana@techsolutions.com",
    phone: "+34 456 789 012",
    address: "Polígono Industrial 321, Sevilla",
    rating: 4.9,
    totalOrders: 89,
    status: "Activo"
  },
  {
    id: "SUP-005",
    name: "Office Supplies",
    category: "Papelería",
    contact: "Luis Fernández",
    email: "luis@officesupplies.com",
    phone: "+34 567 890 123",
    address: "Calle Comercio 654, Bilbao",
    rating: 4.3,
    totalOrders: 23,
    status: "Activo"
  },
  {
    id: "SUP-006",
    name: "Industrial Parts",
    category: "Repuestos",
    contact: "Elena Sánchez",
    email: "elena@industrialparts.com",
    phone: "+34 678 901 234",
    address: "Av. Industrial 987, Zaragoza",
    rating: 4.0,
    totalOrders: 15,
    status: "Inactivo"
  }
];

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", ...Array.from(new Set(suppliers.map(s => s.category)))];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || supplier.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 bg-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl mb-2 text-red-600">Proveedores</h1>
          <p className="text-[#64748b]">Gestiona tu lista de proveedores</p>
        </div>
        <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
          <Plus size={20} />
          Nuevo Proveedor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Total Proveedores</p>
          <p className="text-2xl text-red-600">{suppliers.length}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Activos</p>
          <p className="text-2xl text-red-600">{suppliers.filter(s => s.status === "Activo").length}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Categorías</p>
          <p className="text-2xl text-red-600">{categories.length - 1}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Rating Promedio</p>
          <p className="text-2xl text-red-600">4.5</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-[#e2e8f0]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" size={20} />
            <input
              type="text"
              placeholder="Buscar proveedor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-[#64748b]" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map(supplier => (
          <div key={supplier.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-[#e2e8f0]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="mb-1 text-red-600">{supplier.name}</h3>
                <p className="text-sm text-[#64748b]">{supplier.id}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                supplier.status === "Activo" 
                  ? "bg-red-100 text-red-800" 
                  : "bg-gray-100 text-gray-800"
              }`}>
                {supplier.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
                  <Mail size={14} className="text-yellow-600" />
                </div>
                <span className="text-[#64748b] truncate">{supplier.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
                  <Phone size={14} className="text-yellow-600" />
                </div>
                <span className="text-[#64748b]">{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
                  <MapPin size={14} className="text-yellow-600" />
                </div>
                <span className="text-[#64748b] truncate">{supplier.address}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm">{supplier.rating}</span>
              </div>
              <span className="text-sm text-[#64748b]">{supplier.totalOrders} órdenes</span>
            </div>

            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs border border-yellow-200">
                {supplier.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}