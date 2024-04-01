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
import Employee from "./pages/Employees/Employee";
import CreateEmployee from "./pages/Employees/CreateEmployee";
import UpdateEmployee from "./pages/Employees/UpdateEmployee"
import SupplierDashbord from "./pages/Supplier/SupplierDashboard"
import FinanceMainDashboard from "./pages/Finance/FinanceMainDashboard"
import ProductionDashboard from "./pages/Production/ProductionDashboard";
import ProcessPlanning from "./pages/Production/ProcessPlanning";
import MilkingSessions from './pages/Milking/MilkingSessions';
import MilkingSessionSchedule from './pages/Milking/MilkingSessionSchedule';
import HomePageM from "./pages/HomeMain";
import FinanceTransactions from "./pages/Finance/FinanceTransactions";
import SupplierOrder from "./pages/Supplier/SupplierOrder";
import Health from "./pages/Veterinary/health";
import VaccineAnim from "./pages/Veterinary/vaccineAnim";
import BreedCard from "./pages/Veterinary/breedPage";
import PastureInfo from "../../dairy-farm/src/pages/Grazing/PastureInfo";


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
  {
    path: "/vetdashboard",
    element: <VetDashboard />,
  },
  {
    path: "/animalReg",
    element: <AnimalRegistry />,
  },
  {
    path:"/health",
    element:<Health/>
  },
  {
    path:"/vaccineAnim",
    element:<VaccineAnim/>
  },
  {
    path:"/breedAnim",
    element:<BreedCard/>
  },
  {
    path: "/milkingdashboard",
    element: <MilkingDashboard />,
  },
  {
    path: "/employeedashboard",
    element: <Employee />,
  },
  {
    path: "/createEmployee",
    element: <CreateEmployee />,
  },
  {
    path: "/updateEmployee/:id",
    element: <UpdateEmployee />,
  },

  {
    path: "/supplierdashboard/",
    element: <SupplierDashbord />,
  },
  {
    path: "/order",
    element: <SupplierOrder />,
  },
  {
    path: "/financedashboard",
    element: <FinanceMainDashboard />,
  },
  {
    path: "/milkingSessions",
    element: <MilkingSessions />,
  },

  {
    path: "/homeM",
    element: <HomePageM />,
  },

  { path: "/productiondashboard", element: <ProductionDashboard /> },

  { path: "/processplanning", element: <ProcessPlanning /> },

  {
    path: "/financetrans",
    element: <FinanceTransactions />,
  },
  {
    path: "/scheduleForm",
    element: <MilkingSessionSchedule />,
  },
  {
    path: "/milkingSessions",
    element: <MilkingSessions />,
  },

  {
    path: "/pastureinfo",
    element: <PastureInfo />,
  },
]);

export default router;