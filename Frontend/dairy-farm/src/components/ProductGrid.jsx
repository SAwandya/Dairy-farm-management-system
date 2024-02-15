import React from "react";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";
import useProducts from "../hooks/useProducts";

const ProductGrid = () => {
  const { data, error, isLoading } = useProducts();

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid
          sx={{ padding: "30px" }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {data?.map((product) => (
            <Grid key={product._id} item xs={3}>
              <ProductCard 
                product={product}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProductGrid;
