import React from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import SignInPage from './Components/Sign/SignInPage/SignInPage.jsx'
import SignUpPage from './Components/Sign/SignUpPage/SignUpPage.jsx'
import ForgotPswdPage from './Components/Sign/ForgotPswdPage/ForgotPswdPage.jsx'
import AddItemPage from './Components/AddItemPage/AddItemPage.jsx'
import ItemPreviewPage from './Components/ItemPreviewPage/ItemPreviewPage.jsx'
import CategoryViewPage from './Components/CategoryViewPage/CategoryViewPage.jsx'
import ItemImageSlider from './Components/ItemImageSlider/ItemImageSlider.jsx'
import FeedBackShowingBox from './Components/FeedBackShowingBox/FeedBackShowingBox.jsx'
import PurchasePage from './Components/PurchasePage/PurchasePage.jsx'
import BuyerPage from './Components/User/BuyerPage/BuyerPage.jsx'
import SellerPage from './Components/User/SellerPage/SellerPage.jsx'
import BuyerTrackingPage from './Components/Tracking/BuyerTrackingPage/BuyerTrackingPage.jsx';
import SellerTrackingPage from './Components/Tracking/SellerTrackingPage/SellerTrackingPage.jsx';
import AdminPanelHomePage from './Components/AdminPanel/AdminPanelHomePage/AdminPanelHomePage.jsx';
import AdminPanelUserApprovalPage from './Components/AdminPanel/AdminPanelUserApprovalPage/AdminPanelUserApprovalPage.jsx';
import AdminPanelItemApprovalPage from './Components/AdminPanel/AdminPanelItemApprovalPage/AdminPanelItemApprovalPage.jsx'
import AdminPanelUserCasePage from './Components/AdminPanel/AdminPanelUserCasePage/AdminPanelUserCasePage.jsx'
import AdminPanelItemCasePage from './Components/AdminPanel/AdminPanelItemCasePage/AdminPanelItemCasePage.jsx'
import OrderPage from './Components/OrdersBuyer/OrderPage/OrderPage.jsx'
import Footer from './Components/Footer/Footer.jsx';

import { DailyCallBack } from './Components/DailyCallBack/DailyCallBack.jsx';
import { OrderReturnTimeCheck } from './Components/OrderReturnTimeCheck/OrderReturnTimeCheck.jsx';


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
  { path: "/BuyerPage", element: <BuyerPage />, },
  { path: "/SellerPage", element: <SellerPage />, },
  { path: "/BuyerTrackingPage", element: <BuyerTrackingPage />, },
  { path: "/SellerTrackingPage", element: <SellerTrackingPage />, },
  { path: "/AdminPanelHomePage", element: <AdminPanelHomePage />, },
  { path: "/AdminPanelUserApprovalPage", element: <AdminPanelUserApprovalPage />, },
  { path: "/AdminPanelItemApprovalPage", element: <AdminPanelItemApprovalPage />, },
  { path: "/AdminPanelUserCasePage", element: <AdminPanelUserCasePage />, },
  { path: "/AdminPanelItemCasePage", element: <AdminPanelItemCasePage />, },
  { path: "/Orderpage", element: <OrderPage/>},
  { path: "/Footer", element: <Footer/>},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <OrderReturnTimeCheck>
    <DailyCallBack>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
    </DailyCallBack>
  </OrderReturnTimeCheck>
  
)
