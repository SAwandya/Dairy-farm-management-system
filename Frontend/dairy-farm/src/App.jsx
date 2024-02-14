import './App.css'
import NavBar from './components/NavBar'
import "@fontsource/roboto/400.css";
import CssBaseline from "@mui/material/CssBaseline";
import ProductGrid from './components/ProductGrid';
import CustomerSignUp from './components/CustomerSignUp';
import CustomerSignIn from './components/CustomerSignIn';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
