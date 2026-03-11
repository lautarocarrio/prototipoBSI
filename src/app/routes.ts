import { createBrowserRouter } from "react-router";
import Layout from "./components/layout/Layout";
import Orders from "./components/orders/Orders";
import Calendar from "./components/calendar/Calendar";
import OrderDetail from "./components/orders/OrderDetail";
import Suppliers from "./components/suppliers/Suppliers";
import CreateOrder from "./components/orders/CreateOrder";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";


export const router = createBrowserRouter([
  {
    path: "/login",
    children:[
      {index:true, Component: Login}
    ]
  },
  {
    path:"/",
    Component: Layout,
    children:[{path:"/",Component: Orders}]
  },
  {
    path: "/pedidos",
    Component: Layout,
    children: [
      { index: true, Component: Orders },
      { path: "/pedidos/:id", Component: OrderDetail },
      { path: "/pedidos/nueva", Component: CreateOrder }
    ]
  },
  
  {
    path: "/calendario",
    Component: Layout,
    children: [
      { index: true, Component: Calendar },
      { path: "/calendario", Component: Calendar },
    ],
  },
  {
    path: "/proveedores",
    Component: Layout,
    children: [
      { index: true, Component: Suppliers },
      { path: "/proveedores", Component: Suppliers },
    ],
  },
  {
    path: "/reportes",
    Component: Layout,
    children: [
      {index:true, Component:Dashboard},
      {path:"/reportes", Component: Dashboard}
    ]
  }
]);