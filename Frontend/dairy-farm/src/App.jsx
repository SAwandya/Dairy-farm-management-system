import './App.css'
import NavBar from './components/NavBar'
import "@fontsource/roboto/400.css";
import CssBaseline from "@mui/material/CssBaseline";
import ProductCard from './components/ProductCard';

function App() {

  return (
    <>
      <CssBaseline/>
      <NavBar/>
      <ProductCard/>
    </>
  )
}

export default App
