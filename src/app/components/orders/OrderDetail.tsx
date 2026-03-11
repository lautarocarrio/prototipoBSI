import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, User, MapPin, Package, Clock, FileText, Upload, CheckCircle2 } from "lucide-react";

// Datos de ejemplo (en una app real vendrían de una API)
const orderDetails = {
  "1": {
    id: "1",
    nombreOrden: "OC-2026-001 - Materiales Construcción",
    fechaCreacion: "2026-03-01",
    solicitante: "Juan Pérez",
    fechaEstimadaLlegada: "2026-03-15",
    obraDestino: "Edificio Residencial Norte",
    estado: "Aprobado",
    proveedor: "Materiales ABC S.A.",
    montoTotal: "$45,320",
    items: [
      { nombre: "Cemento Portland 50kg", cantidad: 200, unidad: "sacos", precioUnitario: "$12.50" },
      { nombre: "Varilla corrugada 1/2\"", cantidad: 150, unidad: "pzas", precioUnitario: "$85.00" },
      { nombre: "Arena de río", cantidad: 10, unidad: "m³", precioUnitario: "$350.00" },
      { nombre: "Grava", cantidad: 15, unidad: "m³", precioUnitario: "$280.00" }
    ],
    observaciones: "Material requerido para cimentación de la torre B. Coordinar entrega en horario de 8:00 AM a 12:00 PM."
  },
  "2": {
    id: "2",
    nombreOrden: "OC-2026-002 - Equipos Eléctricos",
    fechaCreacion: "2026-03-02",
    solicitante: "María García",
    fechaEstimadaLlegada: "2026-03-18",
    obraDestino: "Centro Comercial Plaza Sur",
    estado: "En Tránsito",
    proveedor: "Electro Suministros XYZ",
    montoTotal: "$28,750",
    items: [
      { nombre: "Tablero eléctrico 24 circuitos", cantidad: 5, unidad: "pzas", precioUnitario: "$1,200.00" },
      { nombre: "Cable THW calibre 12", cantidad: 500, unidad: "metros", precioUnitario: "$8.50" },
      { nombre: "Contactos dobles", cantidad: 150, unidad: "pzas", precioUnitario: "$15.00" },
      { nombre: "Interruptores sencillos", cantidad: 100, unidad: "pzas", precioUnitario: "$12.00" }
    ],
    observaciones: "Equipos para instalación eléctrica de planta baja. Verificar certificaciones."
  }
};

// Lista de proveedores disponibles
const proveedores = [
  "Materiales ABC S.A.",
  "Electro Suministros XYZ",
  "Construcciones DEF",
  "Ferretería GHI",
  "Suministros JKL"
];

// Estados posibles para el pedido
const estadosPedido = ["Pendiente", "Aprobado", "En Tránsito", "Entregado", "Finalizado"];

export default function OrderDetail() {
  const { id } = useParams();
  const order = orderDetails[id as keyof typeof orderDetails];

  // Estados para gestionar cambios
  const [estadoPedido, setEstadoPedido] = useState(order?.estado || "Pendiente");
  const [itemsData, setItemsData] = useState(
    order?.items.map(() => ({
      proveedor: "",
      pdfCertificacion: null as File | null,
      recibido: false
    })) || []
  );

  if (!order) {
    return (
      <div className="p-8 bg-white">
        <div className="text-center">
          <h2 className="text-2xl text-red-600 mb-4">Pedido no encontrado</h2>
          <Link to="/" className="text-yellow-600 hover:text-yellow-700">
            Volver a pedidos
          </Link>
        </div>
      </div>
    );
  }

  const handleProveedorChange = (index: number, proveedor: string) => {
    const newItemsData = [...itemsData];
    newItemsData[index].proveedor = proveedor;
    setItemsData(newItemsData);
  };

  const handlePdfUpload = (index: number, file: File | null) => {
    const newItemsData = [...itemsData];
    newItemsData[index].pdfCertificacion = file;
    setItemsData(newItemsData);
  };

  const handleRecibidoChange = (index: number, recibido: boolean) => {
    const newItemsData = [...itemsData];
    newItemsData[index].recibido = recibido;
    setItemsData(newItemsData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprobado": return "bg-red-100 text-red-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "En Tránsito": return "bg-yellow-100 text-yellow-800";
      case "Entregado": return "bg-gray-100 text-gray-800";
      case "Finalizado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 bg-white">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#64748b] hover:text-red-600 mb-4"
        >
          <ArrowLeft size={20} />
          Volver a pedidos
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl mb-2 text-red-600">{order.nombreOrden}</h1>
            <p className="text-[#64748b]">Detalles completos del pedido</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <label className="text-sm text-[#64748b]">Estado del Pedido:</label>
            <select
              value={estadoPedido}
              onChange={(e) => setEstadoPedido(e.target.value)}
              className={`px-4 py-2 rounded-full text-sm border-2 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${getStatusColor(estadoPedido)}`}
            >
              {estadosPedido.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Info General */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <h3 className="text-red-600 mb-4">Información General</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748b]">Fecha de Creación</p>
                <p className="font-medium">{order.fechaCreacion}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748b]">Fecha Estimada de Llegada</p>
                <p className="font-medium">{order.fechaEstimadaLlegada}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748b]">Solicitante</p>
                <p className="font-medium">{order.solicitante}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748b]">Obra de Destino</p>
                <p className="font-medium">{order.obraDestino}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <h3 className="text-red-600 mb-4">Información de Compra</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748b]">Proveedor</p>
                <p className="font-medium">{order.proveedor}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748b]">Monto Total</p>
                <p className="text-xl font-medium text-red-600">{order.montoTotal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items del Pedido */}
      <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] mb-8">
        <div className="p-6 border-b border-[#e2e8f0]">
          <h3 className="text-red-600">Items del Pedido</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Producto</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Cantidad</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Unidad</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Precio Unitario</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Proveedor</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Cert. Calidad</th>
                <th className="px-6 py-3 text-center text-sm text-[#64748b]">Recibido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {order.items.map((item, index) => (
                <tr key={index} className="hover:bg-yellow-50">
                  <td className="px-6 py-4">{item.nombre}</td>
                  <td className="px-6 py-4">{item.cantidad}</td>
                  <td className="px-6 py-4 text-[#64748b]">{item.unidad}</td>
                  <td className="px-6 py-4 text-yellow-600">{item.precioUnitario}</td>
                  <td className="px-6 py-4">
                    <select
                      value={itemsData[index].proveedor}
                      onChange={(e) => handleProveedorChange(index, e.target.value)}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                    >
                      <option value="">Seleccionar...</option>
                      {proveedores.map((proveedor) => (
                        <option key={proveedor} value={proveedor}>
                          {proveedor}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <label className="relative cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePdfUpload(index, e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition-colors">
                          <Upload size={16} className="text-yellow-600" />
                          <span className="text-sm text-yellow-600">
                            {itemsData[index].pdfCertificacion ? "Cambiar" : "Subir"}
                          </span>
                        </div>
                      </label>
                      {itemsData[index].pdfCertificacion && (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle2 size={14} />
                          {itemsData[index].pdfCertificacion?.name}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={itemsData[index].recibido}
                        onChange={(e) => handleRecibidoChange(index, e.target.checked)}
                        className="w-5 h-5 text-yellow-600 border-[#e2e8f0] rounded focus:ring-yellow-500 focus:ring-2 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Observaciones */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0] mb-6">
        <h3 className="text-red-600 mb-4">Observaciones</h3>
        <p className="text-[#64748b]">{order.observaciones}</p>
      </div>

      {/* Botón Guardar Cambios */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            // Aquí se guardarían los cambios (API call en app real)
            alert(`Cambios guardados:\nEstado: ${estadoPedido}\nItems actualizados: ${itemsData.filter(item => item.proveedor || item.pdfCertificacion || item.recibido).length}`);
          }}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <CheckCircle2 size={20} />
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
