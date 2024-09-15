import React from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import SignInPage from './Components/Sign/SignInPage/SignInPage.jsx'
import SignUpPage from './Components/Sign/SignUpPage/SignUpPage.jsx'
import BuyerPage from './Components/Buyer/BuyerPage/BuyerPage.jsx'
import ForgotPswdPage from './Components/Sign/ForgotPswdPage/ForgotPswdPage.jsx'
import AddItemPage from './Components/AddItemPage/AddItemPage.jsx'
import ItemPreviewPage from './Components/ItemPreviewPage/ItemPreviewPage.jsx'
import CategoryViewPage from './Components/CategoryViewPage/CategoryViewPage.jsx'
import ItemImageSlider from './Components/ItemImageSlider/ItemImageSlider.jsx'
import FeedBackShowingBox from './Components/FeedBackShowingBox/FeedBackShowingBox.jsx'
import PurchasePage from './Components/PurchasePage/PurchasePage.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App />, },
  { path: "/signin", element: <SignInPage />, },
  { path: "/signup", element: <SignUpPage />, },
  { path: "/forgotpswd", element: <ForgotPswdPage />, },
  { path: "/additempage", element: <AddItemPage />, },
  { path: "/ItemPreviewPage", element: <ItemPreviewPage />, },
  { path: "/CategoryViewPage", element: <CategoryViewPage />, },
  { path: "/ItemImageSlider", element: <ItemImageSlider />, },
  { path: "/FeedBackShowingBox", element: <FeedBackShowingBox />, },
  { path: "/PurchasePage", element: <PurchasePage />, },
  { path: "/buyer", element: <BuyerPage/>},

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
