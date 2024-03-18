
import { createBrowserRouter } from "react-router-dom";
import VetDashboard from "./pages/Veterinary/AnimmalDash";
import AnimalRegistry from "./pages/Veterinary/AnimalReg";
import Layout from "./pages/Sales/Layout";
import HomePage from "./pages/Sales/HomePage";
import CustomerSignUp from "./pages/Sales/CustomerSignUp";
import CustomerSignIn from "./pages/Sales/CustomerSignIn";
import ProtectedRoute from "./components/Sales/ProtectedRoute";
import ProductDetails from "./components/Sales/ProductDetails";
import CheckOut from "./components/Sales/CheckOut";
import ProductUpdate from "./pages/Sales/ProductUpdate";
import SalesDashboard from "./pages/Sales/SalesDashboard";
import MilkingDashboard from "./pages/Milking/MilkingDashboard";
import MilkingSessionSchedule from "./pages/Milking/MilkingSessionSchedule";
import PasturePage from "./pages/Grazing/PasturePage";
import Session from "./pages/Grazing/GrazingSession";
import PastureInfo from "./pages/Grazing/PastureInfo";
import Employee from "./pages/Employees/Employee";
import CreateEmployee from "./pages/Employees/CreateEmployee";
import UpdateEmployee from "./pages/Employees/UpdateEmployee"
import SupplierDashbord from "./pages/Supplier/SupplierDashboard"
import FinanceMainDashboard from "./pages/Finance/FinanceMainDashboard"

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
    element: <SalesDashboard/>
  },
  {
    path:"/vetdashboard",
    element:<VetDashboard/>
  },
  {
    path:"/animalReg",
    element:<AnimalRegistry/>
  },
  {
    path: "/milkingdashboard",
    element: <MilkingDashboard/>,
  },

  {
    path: "/scheduleForm",
    element: <MilkingSessionSchedule/>
  },

  {
    path: "/pasture",
    element: <PasturePage />,
  },

  {
    path: "/grazingsession",
    element: <Session />,
  },

  {
    path: "/pastureinfo",
    element: <PastureInfo/>,
  },
 
  {
    path: "/employeedashboard",
    element: <Employee/>,
  },
  {
    path: "/createEmployee",
    element: <CreateEmployee/>,
  },
  {
    path: "/updateEmployee/:id",
    element: <UpdateEmployee/>,
  },
  
  {
    path: "/supplierdashboard/",
    element: <SupplierDashbord/>,
  },
  {
    path: "/financedashboard",
    element: <FinanceMainDashboard/>
  }

]);

export default router;