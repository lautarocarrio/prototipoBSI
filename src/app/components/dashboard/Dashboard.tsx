import { TrendingUp, TrendingDown, Package, DollarSign, ShoppingCart, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const stats = [
  {
    title: "Total Órdenes",
    value: "248",
    change: "+12%",
    trend: "up",
    icon: ShoppingCart,
    color: "bg-yellow-500"
  },
  {
    title: "Gasto Total",
    value: "$125,430",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    color: "bg-red-500"
  },
  {
    title: "Proveedores Activos",
    value: "42",
    change: "+3",
    trend: "up",
    icon: Package,
    color: "bg-yellow-600"
  },
  {
    title: "Órdenes Pendientes",
    value: "18",
    change: "-5%",
    trend: "down",
    icon: AlertCircle,
    color: "bg-red-600"
  },
];

const monthlyData = [
  { name: "Ene", gasto: 45000 },
  { name: "Feb", gasto: 52000 },
  { name: "Mar", gasto: 48000 },
  { name: "Abr", gasto: 61000 },
  { name: "May", gasto: 55000 },
  { name: "Jun", gasto: 67000 },
];

const ordersData = [
  { name: "Ene", ordenes: 38 },
  { name: "Feb", ordenes: 42 },
  { name: "Mar", ordenes: 35 },
  { name: "Abr", ordenes: 48 },
  { name: "May", ordenes: 45 },
  { name: "Jun", ordenes: 52 },
];

const recentOrders = [
  { id: "OC-001", supplier: "Proveedor ABC", amount: "$5,430", status: "Aprobada", date: "2026-03-01" },
  { id: "OC-002", supplier: "Materiales XYZ", amount: "$8,920", status: "Pendiente", date: "2026-03-01" },
  { id: "OC-003", supplier: "Suministros Global", amount: "$3,250", status: "En Proceso", date: "2026-02-28" },
  { id: "OC-004", supplier: "Tech Solutions", amount: "$12,100", status: "Aprobada", date: "2026-02-28" },
  { id: "OC-005", supplier: "Office Supplies", amount: "$1,890", status: "Completada", date: "2026-02-27" },
];

export default function Dashboard() {
  return (
    <div className="p-8 bg-white">
      <div className="mb-8">
        <h1 className="text-2xl mb-2 text-red-600">Dashboard</h1>
        <p className="text-[#64748b]">Resumen general de compras y órdenes</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          
          return (
            <div key={stat.title} className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-red-600" : "text-red-800"}`}>
                  <TrendIcon size={16} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-[#64748b] text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <h3 className="mb-6 text-red-600">Gasto Mensual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                formatter={(value) => `$${(value as number).toLocaleString()}`}
              />
              <Bar dataKey="gasto" fill="#eab308" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e8f0]">
          <h3 className="mb-6 text-red-600">Órdenes por Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
              />
              <Line type="monotone" dataKey="ordenes" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0]">
        <div className="p-6 border-b border-[#e2e8f0]">
          <h3 className="text-red-600">Órdenes Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#fef9c3]">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">ID</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Proveedor</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Monto</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Estado</th>
                <th className="px-6 py-3 text-left text-sm text-[#64748b]">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#fef9c3]">
                  <td className="px-6 py-4">
                    <span className="text-yellow-600">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">{order.supplier}</td>
                  <td className="px-6 py-4">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                      order.status === "Aprobada" ? "bg-red-100 text-red-800" :
                      order.status === "Pendiente" ? "bg-yellow-100 text-yellow-800" :
                      order.status === "En Proceso" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#64748b]">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}