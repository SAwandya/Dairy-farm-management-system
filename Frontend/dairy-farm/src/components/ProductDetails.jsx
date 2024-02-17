import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Button from "@mui/material-next/Button";
import useGameQueryStore from "../store";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { Alert } from "@mui/material";
import purchaseService from "../services/purchaseService";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const selectedProduct = useGameQueryStore((s) => s.selectedProduct);

  const SetSelectedQuantity = useGameQueryStore((s) => s.SetSelectedQuantity);

  let navigate = useNavigate();

  const onSubmit = (data) => {

    SetSelectedQuantity(data);
    navigate("/checkout");

    
  };

  return (
    <>
      {!errors && <Navigate to="/checkout" replace={true} />}
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
              <Box
                sx={{ height: "380px", width: "400px" }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Typography sx={{ fontSize: "40px" }}>
                  {selectedProduct.name}
                </Typography>
                <InputField
                  id="quantity"
                  label="quantity"
                  type="number"
                  signup={{
                    ...register("quantity", {
                      required: true,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Please enter a whole number",
                      },
                    }),
                  }}
                  errors={errors.quantity}
                />
                {errors.quantity?.message && (
                  <Alert severity="warning">{errors.quantity.message}</Alert>
                )}
                  <Button type="submit" variant="outlined">
                    Buy
                  </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProductDetails;
