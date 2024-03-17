import React from "react";
import ProductGrid from "../../components/Sales/ProductGrid";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: "url(../src/assets/mainbgw.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
        }}
      ></Box>
      <ProductGrid />
    </>
  );
};

export default HomePage;
