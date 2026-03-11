import { useState } from "react";
import { Search, Plus, FileText, Download, Filter, Eye } from "lucide-react";

interface Order {
  id: string;
  supplier: string;
  description: string;
  amount: number;
  status: "Pendiente" | "Aprobada" | "En Transito" | "Recibida" | "Finalizada";
  date: string;
  deliveryDate: string;
  items: number;
  createdBy: string;
}

const orders: Order[] = [
  {
    id: "OC-001",
    supplier: "Proveedor ABC",
    description: "Materiales de construcción para proyecto A",
    amount: 5430,
    status: "Aprobada",
    date: "2026-03-01",
    deliveryDate: "2026-03-10",
    items: 15,
    createdBy: "Juan Pérez"
  },
  {
    id: "OC-002",
    supplier: "Materiales XYZ",
    description: "Suministros industriales varios",
    amount: 8920,
    status: "Pendiente",
    date: "2026-03-01",
    deliveryDate: "2026-03-12",
    items: 8,
    createdBy: "María García"
  },
  {
    id: "OC-003",
    supplier: "Suministros Global",
    description: "Equipamiento de oficina",
    amount: 3250,
    status: "En Transito",
    date: "2026-02-28",
    deliveryDate: "2026-03-08",
    items: 22,
    createdBy: "Carlos López"
  },
  {
    id: "OC-004",
    supplier: "Tech Solutions",
    description: "Equipos informáticos y software",
    amount: 12100,
    status: "Aprobada",
    date: "2026-02-28",
    deliveryDate: "2026-03-15",
    items: 5,
    createdBy: "Ana Martínez"
  },
  {
    id: "OC-005",
    supplier: "Office Supplies",
    description: "Material de papelería",
    amount: 1890,
    status: "Finalizada",
    date: "2026-02-27",
    deliveryDate: "2026-03-05",
    items: 45,
    createdBy: "Luis Fernández"
  },
  {
    id: "OC-006",
    supplier: "Industrial Parts",
    description: "Repuestos maquinaria",
    amount: 7650,
    status: "En Transito",
    date: "2026-02-26",
    deliveryDate: "2026-03-18",
    items: 12,
    createdBy: "Elena Sánchez"
  },
  {
    id: "OC-007",
    supplier: "Proveedor ABC",
    description: "Cemento y áridos",
    amount: 4320,
    status: "Aprobada",
    date: "2026-02-25",
    deliveryDate: "2026-03-07",
    items: 6,
    createdBy: "Juan Pérez"
  },
  {
    id: "OC-008",
    supplier: "Tech Solutions",
    description: "Licencias software empresarial",
    amount: 15800,
    status: "Pendiente",
    date: "2026-02-24",
    deliveryDate: "2026-03-20",
    items: 3,
    createdBy: "Ana Martínez"
  }
];

export default function PurchaseOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const statuses = ["Todos", "Pendiente", "Aprobada", "En Transito", "Finalizada", "Cancelada"];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "Todos" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente": return "bg-red-100 text-yellow-800";
      case "Aprobada": return "bg-yellow-100 text-yellow-800";
      case "En Transito": return "bg-yellow-100 text-yellow-800";
      case "Recibida": return "bg-orange-100 text-gray-800";
      case "Finalizada": return "bg-green-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalAmount = filteredOrders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="p-8 bg-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl mb-2 text-red-600">Órdenes de Compra</h1>
          <p className="text-[#64748b]">Gestiona todas las órdenes de compra</p>
        </div>
        <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
          <Plus size={20} />
          Nueva Orden
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Total Órdenes</p>
          <p className="text-2xl text-red-600">{filteredOrders.length}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Pendientes</p>
          <p className="text-2xl text-yellow-600">
            {filteredOrders.filter(o => o.status === "Pendiente").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">En Transito</p>
          <p className="text-2xl text-yellow-600">
            {filteredOrders.filter(o => o.status === "En Transito").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Finalizadas</p>
          <p className="text-2xl text-red-600">
            {filteredOrders.filter(o => o.status === "Finalizada").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Monto Total</p>
          <p className="text-2xl text-red-600">${totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-[#e2e8f0]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" size={20} />
            <input
              type="text"
              placeholder="Buscar orden..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-[#64748b]" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-[#e2e8f0]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">ID Orden</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Proveedor</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Descripción</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Monto</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Items</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Estado</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Fecha</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Entrega</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-yellow-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-[#64748b]" />
                      <span className="text-yellow-600">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{order.supplier}</td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="truncate text-sm">{order.description}</p>
                  </td>
                  <td className="px-6 py-4">${order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-[#64748b]">{order.items}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#64748b] text-sm">{order.date}</td>
                  <td className="px-6 py-4 text-[#64748b] text-sm">{order.deliveryDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-yellow-50 rounded transition-colors" title="Ver detalles">
                        <Eye size={18} className="text-red-600" />
                      </button>
                      <button className="p-1 hover:bg-yellow-50 rounded transition-colors" title="Descargar PDF">
                        <Download size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}