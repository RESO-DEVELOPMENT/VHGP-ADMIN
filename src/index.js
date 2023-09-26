import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './assets/scss/argon-dashboard-pro-react.scss'
// import "./assets/vendor/nucleo/css/nucleo.css";
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datetime/css/react-datetime.css'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './context/AppProvider'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <AppProvider>
      <ToastContainer />
      <App />
    </AppProvider>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
