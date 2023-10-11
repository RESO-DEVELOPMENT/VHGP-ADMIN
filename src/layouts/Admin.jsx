import React, { useContext } from 'react'
// react library for routing
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { CardBody, Spinner } from 'reactstrap'
import AdminNavbar from '../components/Navbars/AdminNavbar.js'
// core components
// import AdminFooter from "../components/Footers/AdminFooter.js";
import Sidebar from '../components/Sidebar/Sidebar.js'
import { AppContext } from '../context/AppProvider.jsx'
import BuildingManage from '../views/pages/areas/BuildingManage.jsx'
import { NewCategory } from '../views/pages/categories/NewCategory.jsx'
import { NewDriver } from '../views/pages/drivers/NewDriver.jsx'
import { NewMenu } from '../views/pages/menus/NewMenu.jsx'
import OrderDetail from '../views/pages/orders/OrderDetail.jsx'
import { NewStore } from '../views/pages/stores/NewStore.jsx'
// import AdminNavbar from "../components/Navbars/AdminNavbar";
import routes from './../routes.js'
import Lottie from 'react-lottie'
import animationData from '../assets/loading.json'
// import logo from "../../public/images/loading.gif";
function Admin() {
  const { isLoadingMain } = useContext(AppContext)
  const [sidenavOpen, setSidenavOpen] = React.useState(true)
  const location = useLocation()
  const mainContentRef = React.useRef(null)
  React.useEffect(() => {
    // document.documentElement.scrollTop = 0;
    // document.scrollingElement.scrollTop = 0;
    // mainContentRef.current.scrollTop = 0;
  }, [location])
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name
      }
    }
    return 'Brand'
  }
  // toggles collapse between mini sidenav and normal
  const toggleSidenav = (e) => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned')
      document.body.classList.add('g-sidenav-hidden')
    } else {
      document.body.classList.add('g-sidenav-pinned')
      document.body.classList.remove('g-sidenav-hidden')
    }
    setSidenavOpen(!sidenavOpen)
  }
  const getNavbarTheme = () => {
    return location.pathname.indexOf('admin/alternative-dashboard') === -1
      ? 'dark'
      : 'light'
  }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <>
      <Sidebar
        routes={routes}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
        logo={{
          innerLink: '/',
          imgSrc: '/images/logo_2.png',
          imgAlt: '...',
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar
          theme={getNavbarTheme()}
          toggleSidenav={toggleSidenav}
          sidenavOpen={sidenavOpen}
          brandText={getBrandText(location.pathname)}
        />
        {isLoadingMain && (
          <CardBody
            className="loading-wrapper center_flex"
            style={{
              position: 'absolute',
              zIndex: 99,
              background: 'rgb(250,250,250)',
              width: '100%',
              height: '95%',
              opacity: 0.8,
            }}
          >
            <Lottie options={defaultOptions} height={400} width={400} />
          </CardBody>
        )}
        <Switch>
          {getRoutes(routes)}
          <Route path="/admin/store" render={() => <NewStore />} />
          <Route path="/admin/category" render={() => <NewCategory />} />
          <Route path="/admin/menu" render={() => <NewMenu />} />
          <Route path="/admin/driver" render={() => <NewDriver />} />
          <Route
            path="/admin/area/:id/clusters/:id"
            render={() => <BuildingManage />}
          />
          <Route path="/admin/order/:id" render={() => <OrderDetail />} />
          <Redirect from="*" to="/admin/dashboard" />
        </Switch>
        {/* <AdminFooter /> */}
      </div>
      {sidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  )
}

export default Admin
