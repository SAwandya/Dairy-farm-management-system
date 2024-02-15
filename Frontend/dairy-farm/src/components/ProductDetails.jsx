import React from 'react'
import { Box, Card, CardMedia, Container, Grid, Typography } from '@mui/material';
import Button from "@mui/material-next/Button";
import useGameQueryStore from '../store';

const ProductDetails = () => {

  const selectedProduct = useGameQueryStore((s) => s.selectedProduct);


  console.log(selectedProduct);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box>
          <Grid container spacing={3}>
            <Grid item lg={6}>
              <Card sx={{ height: "380px", width: "400px" }}>
                <CardMedia
                  component="img"
                  sx={{ height: "400px", width: "auto" }}
                  image="../src/assets/cheese.png"
                  alt="Paella dish"
                />
              </Card>
            </Grid>
            <Grid item lg={6}>
              {" "}
              <Box sx={{ height: "380px", width: "400px" }}>
                <Typography sx={{ fontSize: "40px" }}>
                  { selectedProduct.name }
                </Typography>
                <Button variant="outlined">Buy</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default ProductDetails