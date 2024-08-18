import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import SignInPage from './Components/Sign/SignInPage/SignInPage.jsx'
import SignUpPage from './Components/Sign/SignUpPage/SignUpPage.jsx'
import ForgotPswdPage from './Components/Sign/ForgotPswdPage/ForgotPswdPage.jsx'

import {createBrowserRouter, RouterProvider,} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App/>, },
  { path: "/signin", element: <SignInPage/>, },
  { path: "/signup", element: <SignUpPage/>, },
  { path: "/forgotpswd", element: <ForgotPswdPage/>, },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
