import "./App.css";
import NavBar from "./components/Sales/NavBar";
import "@fontsource/roboto/400.css";
import CssBaseline from "@mui/material/CssBaseline";
import ProductGrid from "./components/Sales/ProductGrid";
import CustomerSignUp from "./pages/Sales/CustomerSignUp";
import CustomerSignIn from "./pages/Sales/CustomerSignIn";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ProductDetails from "./components/Sales/ProductDetails";
import CheckOut from "./components/Sales/CheckOut";
import SalesDashboard from "./pages/Sales/SalesDashboard";
import MilkingDashboard from "./pages/Milking/MilkingDashboard";
import ProductList from "./components/Sales/ProductList";

function App() {
  return (
    <>
      <AuthProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthProvider>
      <CssBaseline />

      {/* <MilkingDashboard /> */}
    </>
  );
}

export default App;
