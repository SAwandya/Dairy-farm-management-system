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
import ProductList from "./components/ProductList";
import VetDashboard from "./pages/Veterinary/AnimmalDash";
import AnimalRegistry from "./pages/Veterinary/AnimalReg";

function App() {
  return (
    <>
       <AuthProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthProvider>
      <CssBaseline /> 

      

    </>
  );
}

export default App;
