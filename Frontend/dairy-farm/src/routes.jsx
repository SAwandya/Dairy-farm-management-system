import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import CustomerSignUp from "./components/CustomerSignUp";
import CustomerSignIn from "./components/CustomerSignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <CustomerSignUp/>
  },
  {
    path: "/signin",
    element: <CustomerSignIn/>
  }
]);

export default router;