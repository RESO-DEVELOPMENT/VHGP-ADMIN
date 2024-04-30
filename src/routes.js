/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import CreateOrder from './views/CreateOrder.jsx'
import AreaManage from './views/pages/areas/AreaManage.jsx'
import BrandManage from './views/pages/brands/BrandManage.jsx'
import CategoryManage from './views/pages/categories/CategoryManage.jsx'
import Dashboard from './views/pages/dashboards/Dashboard.jsx'
import DriverManage from './views/pages/drivers/DriverManage.jsx'
import HubManage from './views/pages/hubs/HubManage.jsx'
import { ShipperLocation } from './views/pages/map/ShipperLocation.jsx'
import { Menus } from './views/pages/menus/Menu.jsx'
import { Order } from './views/pages/orders/Order.jsx'
import StoreCategoryManage from './views/pages/store-category/StoreCategoryManage.jsx'
import { StoreManage } from './views/pages/stores/StoreManage.jsx'

const routes = [
  {
    collapse: false,
    path: '/dashboard',
    name: 'Bảng điều khiển',
    icon: 'fa-solid fa-gauge',
    state: 'dashboardsCollapse',
    component: Dashboard,
    layout: '/admin',
    type: 1,
  },
  {
    collapse: false,
    path: '/menus',
    name: 'Thực Đơn',
    component: Menus,
    icon: 'fa-solid fa-bowl-food',
    state: 'tablesCollapse',
    layout: '/admin',
    miniName: 'T',
  },
  {
    path: '/stores',
    name: 'Cửa Hàng',
    icon: 'fa-solid fa-store',
    component: StoreManage,
    layout: '/admin',
  },
  {
    path: '/orders',
    name: 'Đơn Hàng',
    icon: 'fa-solid fa-box',
    component: Order,
    layout: '/admin',
    type: 2,
  },

  // {
  //     path: "/orderstest",
  //     name: "Đơn Hàng test",
  //     icon: "fa-solid fa-box",
  //     component: OrderTest,
  //     layout: "/admin",
  //     type: 2,
  // },
  {
    path: '/drivers',
    name: 'Tài Xế',
    icon: 'fa-solid fa-user-tie',
    component: DriverManage,
    layout: '/admin',
  },
  {
    path: '/create-order',
    name: 'Tạo Vận Đơn',
    icon: 'fa-solid fa-pencil',
    component: CreateOrder,
    layout: '/admin',
  },
  {
    path: '/categories',
    name: 'Danh Mục',
    icon: 'fa-solid fa-grip',
    component: CategoryManage,
    layout: '/admin',
    type: 3,
  },
  {
    path: '/categorieStore',
    name: 'Loại Cửa Hàng',
    icon: 'fa-solid fa-tags',
    component: StoreCategoryManage,
    layout: '/admin',
  },
  {
    path: '/brands',
    name: 'Thương hiệu',
    icon: 'fa-solid fa-copyright',
    component: BrandManage,
    layout: '/admin',
  },
  {
    path: '/areas',
    name: 'Khu vực',
    icon: 'fa-solid fa-city',
    component: AreaManage,
    layout: '/admin',
  },
  {
    path: '/hubs',
    name: 'Hub',
    icon: 'fa-solid fa-warehouse',
    component: HubManage,
    layout: '/admin',
  },
  {
    path: '/map',
    name: 'Vị trí shipper',
    icon: 'fa-solid fa-map',
    component: ShipperLocation,
    layout: '/admin',
  },
]

export default routes
