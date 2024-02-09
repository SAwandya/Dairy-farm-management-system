import './App.css'
import NavBar from './components/NavBar'
import "@fontsource/roboto/400.css";
import CssBaseline from "@mui/material/CssBaseline";
import ProductGrid from './components/ProductGrid';

function App() {

  return (
    <>
      <CssBaseline/>
      <NavBar/>
      <ProductGrid/>
    </>
  )
}

export default App
