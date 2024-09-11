import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import SignInPage from './Components/Sign/SignInPage/SignInPage.jsx'
import SignUpPage from './Components/Sign/SignUpPage/SignUpPage.jsx'
import ForgotPswdPage from './Components/Sign/ForgotPswdPage/ForgotPswdPage.jsx'
import AddItemPage from './Components/AddItemPage/AddItemPage.jsx'
import ItemPreviewPage from './Components/ItemPreviewPage/ItemPreviewPage.jsx'

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import CategoryViewPage from './Components/CategoryViewPage/CategoryViewPage.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App/>, },
  { path: "/signin", element: <SignInPage/>, },
  { path: "/signup", element: <SignUpPage/>, },
  { path: "/forgotpswd", element: <ForgotPswdPage/>, },
  { path: "/additempage", element: <AddItemPage/>, },
  { path: "/ItemPreviewPage", element: <ItemPreviewPage/>, },
  { path: "/CategoryViewPage", element: <CategoryViewPage/>, },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
