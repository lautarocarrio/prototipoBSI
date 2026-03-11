import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";

interface OrderItem {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
  precioUnitario?: number; // ahora opcional
  proveedor?: string;      // ahora opcional
}

export default function CreateOrder() {
  const navigate = useNavigate();
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombreOrden: "",
    solicitante: "",
    fechaEstimadaLlegada: "",
    obraDestino: "",
    proveedor: "",
    observaciones: "",
  });

  const [items, setItems] = useState<OrderItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<OrderItem>>({
    nombre: "",
    cantidad: 0,
    unidad: "",
  });

  // Manejar cambios en el formulario principal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Agregar item a la lista
  const handleAddItem = () => {
    // sólo compruebo los campos que quiero pedir
    if (newItem.nombre && newItem.cantidad! > 0 && newItem.unidad) {
      const item: OrderItem = {
        id: Date.now().toString(),
        nombre: newItem.nombre!,
        cantidad: newItem.cantidad!,
        unidad: newItem.unidad!,
        precioUnitario: newItem.precioUnitario, // puede ser undefined
        proveedor: newItem.proveedor,
      };
      setItems(prev => [...prev, item]);
      setNewItem({ nombre: "", cantidad: 0, unidad: "" });
    }
  };

  // Eliminar item de la lista
  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Calcular monto total
  const calcularTotal = () => {
    return items.reduce(
      (total, item) =>
        total + (item.precioUnitario ? item.cantidad * item.precioUnitario : 0),
      0
    );
  };

  // Guardar pedido
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombreOrden || !formData.solicitante || !formData.fechaEstimadaLlegada || 
        !formData.obraDestino || !formData.proveedor || items.length === 0) {
      alert("Por favor completa todos los campos obligatorios y agrega al menos un item");
      return;
    }

    // Aquí normalmente enviarías los datos a una API
    console.log("Pedido creado:", {
      ...formData,
      items,
      montoTotal: calcularTotal(),
      fechaCreacion: new Date().toISOString().split('T')[0],
      estado: "Pendiente"
    });

    alert("Pedido creado exitosamente");
    navigate("/");
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#64748b] hover:text-red-600 mb-4"
        >
          <ArrowLeft size={20} />
          Volver a pedidos
        </Link>
        <div>
          <h1 className="text-2xl mb-2 text-red-600">Nuevo Pedido</h1>
          <p className="text-[#64748b]">Completa la información para crear un nuevo pedido de compra</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Información General */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] p-6 mb-6">
          <h3 className="text-red-600 mb-6">Información General</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#64748b] mb-2">
                Nombre de Orden de Compra <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="nombreOrden"
                value={formData.nombreOrden}
                onChange={handleInputChange}
                placeholder="Ej: OC-2026-001 - Materiales Construcción"
                className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#64748b] mb-2">
                Solicitante <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="solicitante"
                value={formData.solicitante}
                onChange={handleInputChange}
                placeholder="Nombre del solicitante"
                className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#64748b] mb-2">
                Fecha Estimada de Llegada <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="fechaEstimadaLlegada"
                value={formData.fechaEstimadaLlegada}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#64748b] mb-2">
                Obra de Destino <span className="text-red-600">*</span>
              </label>
              <select
                name="obraDestino"
                value={formData.obraDestino}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona una obra</option>
                <option value="Edificio Residencial Norte">Edificio Residencial Norte</option>
                <option value="Centro Comercial Plaza Sur">Centro Comercial Plaza Sur</option>
                <option value="Puente Vial Este">Puente Vial Este</option>
                <option value="Hospital Regional">Hospital Regional</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items del Pedido */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] p-6 mb-6">
          <h3 className="text-red-600 mb-6">Items del Pedido</h3>
          
          {/* Formulario para agregar items */}
          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <h4 className="text-sm text-[#64748b] mb-4">Agregar Item</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={newItem.nombre}
                  onChange={e => setNewItem(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Nombre del producto"
                  className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={newItem.cantidad || ""}
                  onChange={e => setNewItem(prev => ({ ...prev, cantidad: Number(e.target.value) }))}
                  placeholder="Cantidad"
                  min="0"
                  className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newItem.unidad}
                  onChange={e => setNewItem(prev => ({ ...prev, unidad: e.target.value }))}
                  placeholder="Unidad"
                  className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="mt-4 flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <Plus size={20} />
              Agregar Item
            </button>
          </div>

          {/* Lista de items agregados */}
          {items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm text-[#64748b]">Producto</th>
                    <th className="px-6 py-3 text-left text-sm text-[#64748b]">Cantidad</th>
                    <th className="px-6 py-3 text-left text-sm text-[#64748b]">Unidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-yellow-50">
                      <td className="px-6 py-4">{item.nombre}</td>
                      <td className="px-6 py-4">{item.cantidad}</td>
                      <td className="px-6 py-4 text-[#64748b]">{item.unidad}</td>
                      <td className="px-6 py-4 text-yellow-600">
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-[#64748b]">
              No hay items agregados. Usa el formulario arriba para agregar productos.
            </div>
          )}
        </div>

        {/* Observaciones */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] p-6 mb-6">
          <h3 className="text-red-600 mb-4">Observaciones</h3>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleInputChange}
            placeholder="Instrucciones especiales, horarios de entrega, etc."
            rows={4}
            className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 justify-end">
          <Link
            to="/"
            className="px-6 py-2 border border-[#e2e8f0] rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Save size={20} />
            Guardar Pedido
          </button>
        </div>
      </form>
    </div>
  );
}
