import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Sales/Layout";
import HomePage from "./pages/Sales/HomePage";
import CustomerSignUp from "./pages/Sales/CustomerSignUp";
import CustomerSignIn from "./pages/Sales/CustomerSignIn";
import ProtectedRoute from "./components/Sales/ProtectedRoute";
import ProductDetails from "./components/Sales/ProductDetails";
import CheckOut from "./components/Sales/CheckOut";
import ProductUpdate from "./pages/Sales/ProductUpdate";
import SalesDashboard from "./pages/Sales/SalesDashboard";

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
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
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
    element: <ProductUpdate />,
  },
  {
    path: "/salesdashboard",
    element: <SalesDashboard />,
  },
]);

export default router;
