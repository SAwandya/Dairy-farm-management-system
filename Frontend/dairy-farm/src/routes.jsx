import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import CustomerSignUp from "./pages/CustomerSignUp";
import CustomerSignIn from "./pages/CustomerSignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./components/ProductDetails";
import CheckOut from "./components/CheckOut";
import ProductUpdate from "./pages/ProductUpdate";
import SalesDashboard from "./pages/SalesDashboard";
import VetDashboard from "./pages/Veterinary/AnimmalDash";
import AnimalRegistry from "./pages/Veterinary/AnimalReg";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/productdetails",
        element: (
          <ProtectedRoute>
            <ProductDetails/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckOut/>
          </ProtectedRoute>
        )
      }
    ],
  },
  {
    path: "/signup",
    element: <CustomerSignUp />,
  },
  {
    path: "/signin",
    element: <CustomerSignIn />,
  },
  {
    path: "/productupdate",
    element: <ProductUpdate/>
  },
  {
    path: "/salesdashboard",
    element: <SalesDashboard/>
  },
  {
    path:"/vetdashboard",
    element:<VetDashboard/>
  },
  {
    path:"/animalReg",
    element:<AnimalRegistry/>
  }
]);

export default router;
