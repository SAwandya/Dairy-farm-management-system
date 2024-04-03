import React from "react";
import ProductGrid from "../../components/Sales/ProductGrid";
import { Box, Typography } from "@mui/material";

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
      <Typography sx={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center', marginTop: '40px', marginBottom:'20px' }}>
        PRODUCTS
      </Typography>
      <ProductGrid />
    </>
  );
};

export default HomePage;
