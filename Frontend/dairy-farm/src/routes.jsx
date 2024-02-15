import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import CustomerSignUp from "./pages/CustomerSignUp";
import CustomerSignIn from "./pages/CustomerSignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./components/ProductDetails";

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
]);

export default router;
