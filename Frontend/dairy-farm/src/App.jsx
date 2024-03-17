import "./App.css";
import NavBar from "./components/NavBar";
import "@fontsource/roboto/400.css";
import CssBaseline from "@mui/material/CssBaseline";
import ProductGrid from "./components/ProductGrid";
import CustomerSignUp from "./pages/CustomerSignUp";
import CustomerSignIn from "./pages/CustomerSignIn";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ProductDetails from "./components/ProductDetails";
import CheckOut from "./components/CheckOut";
import SalesDashboard from "./pages/SalesDashboard";
import MilkingDashboard from "./pages/Milking/MilkingDashboard";
import MilkingSessions from "./pages/Milking/MilkingSessions";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      {/* <AuthProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthProvider>
      <CssBaseline /> */}

      <MilkingSessions />

    </>
  );
}

export default App;
