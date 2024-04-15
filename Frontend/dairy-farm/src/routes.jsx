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
import Employee from "./pages/Employees/Employee";
import CreateEmployee from "./pages/Employees/CreateEmployee";
import UpdateEmployee from "./pages/Employees/UpdateEmployee"
import SupplierDashbord from "./pages/Supplier/SupplierDashboard"
import FinanceMainDashboard from "./pages/Finance/FinanceMainDashboard"

//Production Management - Pages
import ProductionDashboard from "./pages/Production/ProductionDashboard";
import ProcessPlanning from "./pages/Production/ProcessPlanning";
import StorageRoom from "./pages/Production/StorageRoom"
import ProductInventory from "./pages/Production/ProductInventory";

//Milking Management - Pages
import MilkingDashboard from "./pages/Milking/MilkingDashboard";
import MilkingSessions from './pages/Milking/MilkingSessions';
import MilkingSessionSchedule from './pages/Milking/MilkingSessionSchedule';
import MilkingData from './pages/Milking/MilkingData';
import MilkingStorage from "./pages/Milking/MilkingStorage";
import AddNewTank from "./pages/Milking/AddNewTank";
import DataForProduction from "./pages/Milking/DataForProduction";
import MilkingReport from "./pages/Milking/MilkingReport";
import MilkingProfile from "./pages/Milking/MilkingProfile";

import HomePageM from "./pages/HomeMain";
import FinanceTransactions from "./pages/Finance/FinanceTransactions";
import SupplierOrder from "./pages/Supplier/SupplierOrder";
import ItemDashboard from "./pages/Supplier/ItemDashboard";
import InventoryDashboard from "./pages/Supplier/InventoryDashboard";
//Veterinary
import VetDashboard from "./pages/Veterinary/AnimmalDash";
import AnimalRegistry from "./pages/Veterinary/AnimalReg";
import Health from "./pages/Veterinary/health";
import VaccineAnim from "./pages/Veterinary/vaccineAnim";
import BreedCard from "./pages/Veterinary/breedPage";
import AnimReport from "./pages/Veterinary/VetReport";
import VetProf from "./pages/Veterinary/vetPfofile";

import PastureInfo from "../../dairy-farm/src/pages/Grazing/PastureInfo";
import OrderPage from "./pages/Sales/OrderPage";

//Emlployee management
import Task from "./pages/Employees/Task"
import CreateTask from "./pages/Employees/CreateTask"
import UpdateTask from "./pages/Employees/UpdateTask"
import AllEmployee from "./pages/Employees/AllEmployee";
import AllTask from "./pages/Employees/AllTask";
import EmployeeReport from "./pages/Employees/Employee_report";
import EmployeeR from "./pages/Employees/EmployeeR";
import EProfile from "./pages/Employees/EProfile"
import LeaveForm from "./pages/Employees/LeaveForm"
import LeaveDetails from "./pages/Employees/LeaveDetails";


import PasturePage from "./pages/Grazing/PasturePage";
import SessionPage from "./pages/Grazing/SessionPage";
import Report from "./pages/Grazing/Report";
import EffluentPage from "./pages/Grazing/EffluentPage";
import { RemoveFromQueue } from "@mui/icons-material";
import GrazingDashboard from "./pages/Grazing/GrazingDashboard";
import CartPage from "./pages/Sales/CartPage";
import RotationInfo from "./pages/Grazing/RotationInfo";
import FinanceBudgets from "./pages/Finance/FinanceBudgets";
import OrdReportDisplay from "./pages/Supplier/OrdReportDisplay";

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
        path: "/salesorders",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/salescarts",
        element: (
          <ProtectedRoute>
            <CartPage/>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <CheckOut />
      </ProtectedRoute>
    ),
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

  //veterinary
  {
    path: "/vetdashboard",
    element: <VetDashboard />,
  },
  {
    path: "/VetReport",
    element: <AnimReport />,
  },
  {
    path: "/animalReg",
    element: <AnimalRegistry />,
  },
  {
    path: "/health",
    element: <Health />,
  },
  {
    path: "/vaccineAnim",
    element: <VaccineAnim />,
  },
  {
    path: "/breedAnim",
    element: <BreedCard />,
  },
  {
    path: "/vetProf",
    element: <VetProf />,
  },


  {
    path: "/milkingdashboard",
    element: <MilkingDashboard />,
  },
  {
    path: "/milkingData",
    element: <MilkingData />,
  },
  {
    path: "/milkingSessions",
    element: <MilkingSessions />,
  },
  {
    path: "/milkingStorage",
    element: <MilkingStorage />,
  },
  {
    path: "/addNewTank",
    element: <AddNewTank />,
  },
  {
    path: "/milkingSessions",
    element: <MilkingSessions />,
  },
  {
    path: "/dataForProduction",
    element: <DataForProduction />,
  },
  {
    path: "/milkingReport",
    element: <MilkingReport />,
  },
  {
    path: "/milkingProfile",
    element: <MilkingProfile />,
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
    path: "/item",
    element: <ItemDashboard />,
  },
  {
    path: "/inventory",
    element: <InventoryDashboard />,
  },
  {
    path: "/financedashboard",
    element: <FinanceMainDashboard />,
  },

  { path: "/homeM", element: <HomePageM />},

  //Production Management Paths
  { path: "/productiondashboard", element: <ProductionDashboard /> },
  { path: "/processplanning", element: <ProcessPlanning /> },
  { path: "/StorageRoom", element: <StorageRoom /> } ,  
  { path: "/ProductInventory", element: <ProductInventory/> },

  {
    path: "/financetrans",
    element: <FinanceTransactions />,
  },
  {
    path: "/financebud",
    element: <FinanceBudgets />,
  },
  {
    path: "/scheduleForm",
    element: <MilkingSessionSchedule />,
  },
//grazing management
  {
    path: "/pastureinfo",
    element: <PastureInfo />,
  },
  {
    path: "/pasture",
    element: <PasturePage />,
  },

  {
    path: "/session",
    element: <SessionPage />,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/waste",
    element: <EffluentPage />,
  },
  {
    path: "/dashboard",
    element: <GrazingDashboard />,
  },
  {
    path: "/rotation",
    element: <RotationInfo />,
  },

  {
    path: "/task",
    element: <Task />,
  },
  {
    path: "/createtask",
    element: <CreateTask />,
  },
  {
    path: "/updateTask/:id",
    element: <UpdateTask />,
  },
  {
    path: "/allEmployee",
    element: <AllEmployee />,
  },
  {
    path: "/allTask",
    element: <AllTask />,
  },
  {
    path: "/ereport",
    element: <EmployeeR />,
  },
  {
    path: "/empreport",
    element: <EmployeeReport />,
  },
  // {
  //   path: "/reportOrder",
  //   element: <OrdReportDisplay />,
  // },

  {
    path: "/eprofile",
    element: <EProfile />,
  },
  {
    path: "/leaveform",
    element: <LeaveForm />,
  },
  {
    path: "/leavedetails",
    element: <LeaveDetails />,
  },
]);

export default router;