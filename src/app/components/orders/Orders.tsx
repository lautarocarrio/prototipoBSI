import { useState } from "react";
import { Search, Plus, Filter, ExternalLink } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router";

interface Order {
  id: string;
  nombreOrden: string;
  fechaCreacion: string;
  solicitante: string;
  fechaEstimadaLlegada: string;
  obraDestino: string;
  estado: "Pendiente" | "Aprobada" | "En Tránsito" | "Recibida" | "Finalizada";
}

const orders: Order[] = [
  {
    id: "1",
    nombreOrden: "OC-2026-001 - Materiales Construcción",
    fechaCreacion: "2026-03-01",
    solicitante: "Juan Pérez",
    fechaEstimadaLlegada: "2026-03-15",
    obraDestino: "Edificio Residencial Norte",
    estado: "Aprobada"
  },
  {
    id: "2",
    nombreOrden: "OC-2026-002 - Equipos Eléctricos",
    fechaCreacion: "2026-03-02",
    solicitante: "María García",
    fechaEstimadaLlegada: "2026-03-18",
    obraDestino: "Centro Comercial Plaza Sur",
    estado: "En Tránsito"
  },
  {
    id: "3",
    nombreOrden: "OC-2026-003 - Herramientas Especializadas",
    fechaCreacion: "2026-02-28",
    solicitante: "Carlos López",
    fechaEstimadaLlegada: "2026-03-10",
    obraDestino: "Puente Vial Este",
    estado: "Recibida"
  },
  {
    id: "4",
    nombreOrden: "OC-2026-004 - Materiales de Acabado",
    fechaCreacion: "2026-03-03",
    solicitante: "Ana Martínez",
    fechaEstimadaLlegada: "2026-03-20",
    obraDestino: "Edificio Residencial Norte",
    estado: "Pendiente"
  },
  {
    id: "5",
    nombreOrden: "OC-2026-005 - Equipos de Seguridad",
    fechaCreacion: "2026-02-25",
    solicitante: "Luis Fernández",
    fechaEstimadaLlegada: "2026-03-08",
    obraDestino: "Hospital Regional",
    estado: "Recibida"
  },
  {
    id: "6",
    nombreOrden: "OC-2026-006 - Cemento y Agregados",
    fechaCreacion: "2026-03-01",
    solicitante: "Elena Sánchez",
    fechaEstimadaLlegada: "2026-03-12",
    obraDestino: "Puente Vial Este",
    estado: "En Tránsito"
  },
  {
    id: "7",
    nombreOrden: "OC-2026-007 - Maquinaria Pesada",
    fechaCreacion: "2026-02-27",
    solicitante: "Roberto Díaz",
    fechaEstimadaLlegada: "2026-03-25",
    obraDestino: "Centro Comercial Plaza Sur",
    estado: "Aprobada"
  },
  {
    id: "8",
    nombreOrden: "OC-2026-008 - Materiales de Fontanería",
    fechaCreacion: "2026-03-02",
    solicitante: "Patricia Ruiz",
    fechaEstimadaLlegada: "2026-03-16",
    obraDestino: "Hospital Regional",
    estado: "Pendiente"
  }
];

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const statuses = ["Todos", "Pendiente", "Aprobada", "En Tránsito", "Recibida", "Finalizada"];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.nombreOrden.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.solicitante.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.obraDestino.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "Todos" || order.estado === selectedStatus;
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
  const navegate=useNavigate()
  const crateOrder=()=>{
    navegate("/pedidos/nueva")
  }

  return (
    <div className="p-8 bg-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl mb-2 text-red-600">Ordenes de Compra</h1>
          <p className="text-[#64748b]">Gestiona todas las ordenes de compra</p>
        </div>
        <button onClick={crateOrder} className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
          <Plus size={20} />
          Nueva Orden de compra
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Total Pedidos</p>
          <p className="text-2xl text-red-600">{filteredOrders.length}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Pendientes</p>
          <p className="text-2xl text-yellow-600">
            {filteredOrders.filter(o => o.estado === "Pendiente").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Aprobadas</p>
          <p className="text-2xl text-red-600">
            {filteredOrders.filter(o => o.estado === "Aprobada").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">En Tránsito</p>
          <p className="text-2xl text-yellow-600">
            {filteredOrders.filter(o => o.estado === "En Tránsito").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <p className="text-[#64748b] text-sm mb-1">Recibidas</p>
          <p className="text-2xl text-gray-600">
            {filteredOrders.filter(o => o.estado === "Recibida").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-[#e2e8f0]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" size={20} />
            <input
              type="text"
              placeholder="Buscar pedido..."
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
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Nombre Orden de Compra</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Fecha Creación</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Solicitante</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Fecha Est. Llegada</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Obra de Destino</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Estado</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-yellow-50">
                  <td className="px-6 py-4">
                    <span className="text-yellow-600">{order.nombreOrden}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#64748b]">{order.fechaCreacion}</td>
                  <td className="px-6 py-4">{order.solicitante}</td>
                  <td className="px-6 py-4 text-sm text-[#64748b]">{order.fechaEstimadaLlegada}</td>
                  <td className="px-6 py-4">{order.obraDestino}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${getStatusColor(order.estado)}`}>
                      {order.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/pedidos/${order.id}`}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                    >
                      Ver detalles
                      <ExternalLink size={16} />
                    </Link>
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
