import './App.css'
import NavBar from './components/NavBar'
import "@fontsource/roboto/400.css";
import CssBaseline from "@mui/material/CssBaseline";
import ProductGrid from './components/ProductGrid';
import CustomerSignUp from './components/CustomerSignUp';
import CustomerSignIn from './components/CustomerSignIn';

function App() {

  return (
    <>
      <CssBaseline/>
      
      <CustomerSignIn/>
    </>
  )
}

export default App
